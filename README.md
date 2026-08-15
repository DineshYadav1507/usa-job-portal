# USA Job Portal — AI Job Application Automation

Automation-first US job search platform for profile-driven, job-specific resume and cover-letter generation.

## Vision

Users create one factual profile, add their employment history using company, dates, and position, then search an employer by name. The platform resolves the employer's permitted career source, shows recent US jobs, and generates a tailored resume and cover letter for each selected job. An explainable ATS-style analysis shows a 0–100 match estimate, matched requirements, missing keywords, and formatting warnings.

## User flow

1. Sign up / log in.
2. Complete profile setup.
3. Add experience: company name, start date, end date, position/title. Optional factual notes can be added later.
4. Add target company.
5. Resolve company to a supported career page/source.
6. Fetch and normalize recent US jobs from permitted public feeds/APIs/career pages.
7. Select a job.
8. Store a job-description snapshot.
9. Generate a fact-based, JD-tailored resume.
10. Generate a JD-tailored cover letter.
11. Run transparent ATS-style analysis.
12. Save documents, scores, and versions.

## Admin flow

Admins manage users, subscriptions, quotas, companies, career-source adapters, job ingestion health, generation usage, ATS analytics, and audit logs.

## Core principles

- **Facts first:** AI must never invent employers, dates, titles, education, certifications, skills, metrics, or achievements.
- **JD-specific:** every document is tied to a job ID and JD snapshot.
- **Career-site first:** use permitted employer feeds/APIs and source adapters; respect terms, robots.txt, rate limits, and anti-bot controls.
- **Explainable ATS:** the score is an internal matching estimate, never a promise of an employer ATS result.
- **USA focused:** US location, remote/hybrid/on-site status, and authorization-related fields are modeled explicitly.
- **Safe automation:** do not bypass employer controls or submit applications automatically unless an authorized application API explicitly supports it.

## Architecture

```text
Next.js Web
  ├─ Auth / Profile / Jobs / Documents / ATS / Billing
  └─ Admin
        │ HTTPS
        ▼
FastAPI API
  ├─ Auth + Profile
  ├─ Company + Job Service
  ├─ AI Generation Service
  ├─ ATS Service
  ├─ Subscription Service
  └─ Admin Service
        │
        ├── PostgreSQL
        ├── Redis + background workers
        ├── Object Storage (DOCX/PDF)
        ├── LLM provider abstraction
        └── Career source adapters
                ├─ Workday adapters
                ├─ Greenhouse adapters
                ├─ Lever adapters
                └─ Manual/link-only sources
```

## Suggested stack

- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: Python + FastAPI + Pydantic
- Database: PostgreSQL
- Queue/cache: Redis + Celery/RQ
- Documents: DOCX templates + PDF renderer
- AI: provider abstraction, with OpenAI-compatible implementation
- Billing: Stripe Billing
- Storage: S3-compatible object storage
- Deployment: Docker; production AWS ECS/EKS or managed containers
- Observability: structured logs, metrics, error tracking

## Data model

### User
`id, email, password_hash/auth_provider_id, role, subscription_status, created_at`

### CandidateProfile
`user_id, name, contact, location, work_authorization, target_roles, education, skills, certifications, preferences`

### Experience
`user_id, company_name, start_date, end_date, position_title, factual_notes`

### Company
`name, domain, career_url, adapter_type, enabled, last_sync_at`

### Job
`company_id, external_id, title, location, remote_type, employment_type, canonical_url, description, posted_at, discovered_at, raw_source_hash, active`

### JobDocument
`user_id, job_id, document_type, content_version, storage_key, generation_status, created_at`

### ATSAnalysis
`user_id, job_id, document_id, overall_score, keyword_score, skills_score, title_score, experience_score, education_score, formatting_score, missing_keywords, warnings, created_at`

### SubscriptionPlan
`name, stripe_price_id, monthly_job_limit, monthly_generation_limit, ats_limit, active`

## Automation pipeline

```text
Company name
  -> company resolver
  -> permitted career source adapter
  -> fetch jobs
  -> normalize + deduplicate
  -> US/user-preference filtering
  -> save job + JD snapshot
  -> user selects job
  -> extract JD requirements
  -> build candidate evidence set
  -> generate tailored resume
  -> generate tailored cover letter
  -> deterministic ATS analysis
  -> documents + score + gaps
```

## ATS scoring

Initial explainable weighting:

- 30% hard skills/tools
- 20% responsibilities/competencies
- 15% title/seniority
- 15% experience alignment
- 10% education/certification
- 10% document quality/formatting

Return score 0–100 plus matched keywords, missing keywords, required-vs-preferred requirements, unsupported-claim warnings, and formatting warnings. The product must call this an **ATS-style match estimate**, not an official ATS score.

## Admin panel

- `/admin/dashboard`
- `/admin/users`
- `/admin/subscriptions`
- `/admin/companies`
- `/admin/job-sources`
- `/admin/jobs`
- `/admin/generation-usage`
- `/admin/ats-analytics`
- `/admin/audit-log`

## Repository structure

```text
usa-job-portal/
├── apps/
│   ├── web/                 # Next.js frontend
│   └── api/                 # FastAPI backend
├── packages/
│   └── shared/              # shared contracts/types
├── infra/
│   └── docker/
├── docs/
│   ├── architecture.md
│   └── product-requirements.md
├── .env.example
├── docker-compose.yml
└── README.md
```

## MVP phases

### Phase 1 — Foundation
- Authentication
- Next.js shell
- FastAPI service
- PostgreSQL schema
- Docker local environment

### Phase 2 — Profile
- Profile wizard
- Experience CRUD
- Candidate evidence/profile snapshot

### Phase 3 — Job discovery
- Company resolver
- Career-source adapter interface
- First permitted adapters
- Normalization/deduplication
- Recent-job dashboard

### Phase 4 — Documents
- JD parser
- Evidence-based resume tailoring
- Cover letter generation
- DOCX/PDF export
- Version history

### Phase 5 — ATS
- Explainable deterministic scoring
- Keyword/entity extraction
- Formatting checks
- Score dashboard

### Phase 6 — Monetization/admin
- Stripe subscriptions
- Server-side quotas
- Admin career-site management
- Usage analytics
- Audit logs

### Phase 7 — Production
- Tests
- CI/CD
- Monitoring
- Rate limiting
- Backup/restore
- Privacy/terms/legal review

## Security

Use secure password hashing, HTTP-only Secure SameSite sessions/cookies where appropriate, encryption in transit/at rest, secrets management, tenant isolation, audit logs, rate limits, user data deletion, and documented retention policies. Never commit API keys or payment secrets.

## Important production note

Job discovery must only use sources and access methods permitted by the employer/site. The system should not bypass CAPTCHA, bot protection, login walls, or other access controls. Application submission should remain user-controlled unless an employer provides an authorized API.
