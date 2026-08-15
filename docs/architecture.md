# System Architecture

## Monorepo

```text
apps/web       Next.js UI
apps/api       FastAPI API
packages/shared shared API contracts/types
infra/docker   local infrastructure
```

## Backend modules

```text
api/
  auth/
  users/
  profiles/
  companies/
  jobs/
  sources/
  generation/
  documents/
  ats/
  subscriptions/
  admin/
  audit/
```

## Domain boundaries

**Profile service** owns candidate facts and experience.

**Company service** owns employer identity and career source configuration.

**Job service** owns normalized job records and source snapshots.

**Generation service** owns JD parsing, evidence selection, resume/cover-letter generation, and document versions.

**ATS service** owns deterministic matching and score explanations.

**Subscription service** owns plans, quotas, Stripe state, and usage accounting.

**Admin service** owns administrative operations and audit events.

## Background workers

- Career source refresh
- Company resolution enrichment
- Job normalization/deduplication
- JD extraction
- Resume generation
- Cover-letter generation
- ATS analysis
- Document rendering
- Usage aggregation
- Cleanup/retention jobs

Long-running work should never block the request/response path.

## AI guardrails

Prompts receive a structured candidate evidence set and structured JD requirements. Generation output should be validated against the evidence set. Unsupported claims should be rejected or flagged for user confirmation.

Recommended generation stages:

1. Extract JD.
2. Build evidence map from candidate profile.
3. Select relevant evidence.
4. Generate structured document JSON.
5. Validate facts and required fields.
6. Render DOCX/PDF.
7. Analyze against JD.

## Source adapter contract

Every career source adapter should implement conceptual methods:

```text
resolve(company) -> source configuration
list_jobs(source, filters) -> raw jobs
normalize(raw job) -> normalized Job
health_check(source) -> status
```

Adapters must enforce timeouts, rate limits, retries with backoff, source attribution, and disablement on repeated failures.

## Database ownership

All user-owned tables include `user_id` or a relationship that allows strict tenant scoping. Admin access is role-protected and audited.

## Observability

Use structured JSON logs with request IDs, job IDs, source IDs, generation IDs, and error categories. Do not log passwords, access tokens, full resume content, or unnecessary personal information.
