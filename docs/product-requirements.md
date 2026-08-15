# Product Requirements

## Goal
Build a USA-focused job application preparation platform that turns a verified candidate profile and a selected employer job description into a tailored resume, cover letter, and explainable ATS-style analysis.

## Candidate onboarding

Required: account email/password or supported OAuth identity, name, contact information, location, work authorization, target job titles, education, skills, certifications.

Experience must initially collect only:
- Company name
- Start date
- End date or present
- Position/title

Optional factual notes may be added. The AI must not create unsupported experience bullets or metrics.

## Company and job discovery

When a user enters a company name, resolve it to a Company record. The resolver should use a maintained company directory plus domain/career URL discovery. Every source gets an adapter type and status.

The job pipeline should:
1. Fetch permitted public jobs.
2. Normalize titles, locations, remote type, employment type, dates, URLs, and descriptions.
3. Deduplicate using external ID and canonical URL/hash.
4. Restrict results to USA jobs or jobs marked remote/US eligible.
5. Cache results and refresh on a schedule.
6. Preserve source URL and discovery timestamp.

## Tailoring

For a selected job, create a versioned job-description snapshot. Extract:
- Required skills
- Preferred skills
- Responsibilities
- Title/seniority
- Education/certification requirements
- Years of experience
- Location/work model
- Work authorization requirements
- Domain keywords

Then generate documents from only candidate evidence that is present in the profile. The system can reorder, summarize, and phrase facts to match the JD but must never fabricate.

## ATS-style analysis

Perform deterministic normalization in addition to optional LLM semantic analysis. Return:
- Overall 0–100 match estimate
- Skills match
- Responsibilities match
- Title/seniority match
- Experience match
- Education/certification match
- Formatting/readability checks
- Matched keywords
- Missing keywords
- Required requirements not evidenced
- Potential unsupported claims

Display the score as an estimate and explain the calculation.

## Subscription

Usage should be quota-based. Examples: number of job refreshes, resume generations, cover-letter generations, ATS analyses, saved documents. Enforce quotas in API middleware/service layer. Stripe webhooks update subscription state; never trust client-side subscription values.

## Admin

Admins can:
- Search/deactivate users
- View subscription state and usage
- Create/update plans
- Add/edit/disable career sources
- Configure adapter metadata
- Trigger source refresh
- View failed ingestion jobs
- Review generation/ATS aggregate metrics
- View audit logs

## Non-goals for MVP

- Automatic application submission to arbitrary employer websites
- CAPTCHA or anti-bot bypass
- Fabricated work history
- Guaranteeing interview outcomes
- Claiming an exact employer ATS score
