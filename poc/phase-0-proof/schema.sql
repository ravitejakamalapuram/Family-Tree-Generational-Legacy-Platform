-- SQL is authoritative. This file is intentionally rerunnable in an ephemeral CI database.
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_runtime') THEN
    CREATE ROLE app_runtime LOGIN PASSWORD 'poc-runtime-password' NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS;
  END IF;
END $$;
ALTER ROLE app_runtime NOSUPERUSER NOBYPASSRLS;

CREATE TABLE family_spaces (
  id uuid PRIMARY KEY,
  name text NOT NULL
);
CREATE TABLE persons (
  id uuid PRIMARY KEY
);
CREATE TABLE family_people (
  id uuid PRIMARY KEY,
  family_id uuid NOT NULL REFERENCES family_spaces(id),
  person_id uuid NOT NULL UNIQUE REFERENCES persons(id),
  display_name text NOT NULL,
  UNIQUE (family_id, id)
);
CREATE TABLE relationships (
  id uuid PRIMARY KEY,
  family_id uuid NOT NULL REFERENCES family_spaces(id),
  parent_id uuid NOT NULL,
  child_id uuid NOT NULL,
  CHECK (parent_id <> child_id),
  FOREIGN KEY (family_id, parent_id) REFERENCES family_people(family_id, id),
  FOREIGN KEY (family_id, child_id) REFERENCES family_people(family_id, id),
  UNIQUE (family_id, id),
  UNIQUE (family_id, parent_id, child_id)
);

ALTER TABLE family_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_spaces FORCE ROW LEVEL SECURITY;
ALTER TABLE family_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_people FORCE ROW LEVEL SECURITY;
ALTER TABLE relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationships FORCE ROW LEVEL SECURITY;

CREATE POLICY family_spaces_tenant ON family_spaces
  USING (id = NULLIF(current_setting('app.family_id', true), '')::uuid)
  WITH CHECK (id = NULLIF(current_setting('app.family_id', true), '')::uuid);
CREATE POLICY family_people_tenant ON family_people
  USING (family_id = NULLIF(current_setting('app.family_id', true), '')::uuid)
  WITH CHECK (family_id = NULLIF(current_setting('app.family_id', true), '')::uuid);
CREATE POLICY relationships_tenant ON relationships
  USING (family_id = NULLIF(current_setting('app.family_id', true), '')::uuid)
  WITH CHECK (family_id = NULLIF(current_setting('app.family_id', true), '')::uuid);

CREATE FUNCTION add_parent_edge(p_family uuid, p_parent uuid, p_child uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  v_cycle boolean;
BEGIN
  IF p_parent = p_child THEN
    RAISE EXCEPTION 'self parentage is not allowed' USING ERRCODE = '23514';
  END IF;

  -- Serialize graph writes within a family. The lock is transaction-scoped.
  PERFORM pg_advisory_xact_lock(hashtextextended(p_family::text, 0));

  IF p_family <> NULLIF(current_setting('app.family_id', true), '')::uuid THEN
    RAISE EXCEPTION 'tenant context mismatch' USING ERRCODE = '42501';
  END IF;

  WITH RECURSIVE descendants(id) AS (
    SELECT p_child
    UNION
    SELECT r.child_id
    FROM relationships r
    JOIN descendants d ON r.parent_id = d.id
    WHERE r.family_id = p_family
  )
  SELECT EXISTS (SELECT 1 FROM descendants WHERE id = p_parent) INTO v_cycle;

  IF v_cycle THEN
    RAISE EXCEPTION 'parentage cycle detected' USING ERRCODE = '23514';
  END IF;

  INSERT INTO relationships(id, family_id, parent_id, child_id)
  VALUES (gen_random_uuid(), p_family, p_parent, p_child);
END;
$$;

GRANT SELECT ON family_spaces, family_people, relationships TO app_runtime;
GRANT INSERT, UPDATE, DELETE ON family_spaces, family_people, relationships TO app_runtime;
GRANT EXECUTE ON FUNCTION add_parent_edge(uuid, uuid, uuid) TO app_runtime;

-- Test fixture setup is performed by the privileged test harness after this schema is installed.
