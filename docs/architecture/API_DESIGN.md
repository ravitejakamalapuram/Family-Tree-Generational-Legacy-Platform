# API Design

Base: /api/v1. REST/JSON, UUIDs, cursor pagination, request IDs, standardized errors, OpenAPI. ETags/version fields for concurrency; idempotency keys for retryable writes; short-lived signed media URLs. Every family endpoint authorizes membership, role, record and access channel.

## Auth
POST /auth/register, /login, /logout, /refresh, /verify-email, /forgot-password; GET /auth/me.

## Families
POST/GET /families; GET/PATCH /families/{familyId}; GET /families/{familyId}/dashboard; GET /families/{familyId}/members; POST /families/{familyId}/invitations; PATCH/DELETE /families/{familyId}/members/{membershipId}.

## People
POST/GET /families/{fid}/people; GET/PATCH /families/{fid}/people/{familyPersonId}; POST/GET /families/{fid}/people/{familyPersonId}/facts; GET /families/{fid}/people/{familyPersonId}/profile; GET /families/{fid}/people/{familyPersonId}/relationships; GET /families/{fid}/people/{familyPersonId}/memories; POST /families/{fid}/people/{familyPersonId}/merge-suggestions.

## Relationships/tree
POST /families/{fid}/relationships; PATCH/DELETE /families/{fid}/relationships/{id}; GET /families/{fid}/tree?focusPersonId=&mode=&generations=&cursor=; GET /families/{fid}/tree/ancestors/{id}; GET /families/{fid}/tree/descendants/{id}; GET /families/{fid}/tree/branches; GET /families/{fid}/relationship-path?from=&to=; GET /families/{fid}/tree/search?q=. Return bounded nodes/edges/hasMore/nextCursor/generation metadata.

## Media/stories
POST /families/{fid}/media/upload-url; POST /families/{fid}/media/complete; GET /families/{fid}/media; GET/PATCH/DELETE /families/{fid}/media/{id}; POST /families/{fid}/media/{id}/tags; POST/GET /families/{fid}/stories; POST /families/{fid}/stories/{id}/transcribe.

## Events/places
GET/POST /families/{fid}/events; GET/PATCH/DELETE /families/{fid}/events/{id}; POST /families/{fid}/events/{id}/participants; GET/POST /families/{fid}/places; GET/PATCH /families/{fid}/places/{id}.

## Collaboration
GET/POST /families/{fid}/contributions; GET /families/{fid}/contributions/{id}; POST approve/reject; GET activity/notifications; PATCH /notifications/{id}/read.

## AI
POST /families/{fid}/historian/query, /biography, /transcribe, /translate, /suggest-tags; GET /families/{fid}/historian/jobs/{jobId}. AI returns claims, sources, language, limitations and draft status.

## Public
GET /public/families/{slug}; /tree; /people/{publicId}; /stories. PATCH /families/{fid}/public-settings; POST /publications; DELETE /publications/{publicationId}.

Success: {"data":{},"meta":{"requestId":"uuid"}}
Error: {"error":{"code":"RELATIONSHIP_CONFLICT","message":"Relationship conflicts with existing record","details":{},"requestId":"uuid"}}
Codes: AUTH_REQUIRED, ACCESS_DENIED, RESOURCE_NOT_FOUND, VALIDATION_ERROR, RELATIONSHIP_CONFLICT, DUPLICATE_PERSON_SUGGESTED, CONTRIBUTION_PENDING, MEDIA_UPLOAD_INVALID, PUBLICATION_RESTRICTED.

Never treat UUID/family ID as authorization. Public APIs use published projection only.
