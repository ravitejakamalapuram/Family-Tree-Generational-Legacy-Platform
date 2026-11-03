export type FamilyRole =
  | 'owner'
  | 'admin'
  | 'branch_manager'
  | 'contributor'
  | 'reviewer'
  | 'viewer';

export interface FamilySummary {
  id: string;
  name: string;
  role: FamilyRole;
}
