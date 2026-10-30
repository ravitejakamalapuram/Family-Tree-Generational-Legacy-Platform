# Project Charter — Family Legacy

**Status:** Approved product direction | **Date:** 2026-10-30

## Vision
Create a trusted digital home for every family: connect generations, document ancestry, preserve stories and evidence, coordinate family life, and pass family knowledge to future generations. The tree is the primary organizing interface; the durable asset is the family knowledge archive linked to people, relationships, places, events, and sources.

## Problem
Family knowledge is fragmented across elders' memories, photographs, certificates, messages, albums, and relatives. It can disappear as people pass away or records deteriorate. Basic tree visualization is insufficient; contribution must be easy and preserve context, provenance, privacy and portability.

## Target users
Family historians; elders; parents; younger generations; family administrators/branch coordinators; relatives contributing stories, photos, documents and corrections.

## Approved decisions
| Area | Decision |
|---|---|
| Platform | Responsive web first |
| Visibility | Mixed; private by default, optional explicitly published public pages |
| Identity | One real-world person may appear in multiple family spaces |
| Business | Free initially |
| Languages | English, Telugu, Tamil, Kannada, Hindi launch target |
| Architecture | Modular monolith |
| Frontend | React + TypeScript + Vite |
| Backend | Node.js + TypeScript; NestJS preferred |
| Database | PostgreSQL |
| Tree UI | XYFlow with custom genealogy layout |
| Storage | S3-compatible object storage |
| Portability | GEDCOM + complete archive export |

## Product pillars
1. Family Tree — people, ancestry, descendants, branches and relationships.
2. Legacy Vault — photos, video, audio, documents, stories, traditions, recipes, achievements and heirlooms.
3. Collaboration — invitations, roles, branch managers, proposals, review and history.
4. Family Life — birthdays, anniversaries, reunions, milestones, invitations, RSVP and calendar.
5. AI Family Historian — authorized source-grounded Q&A, transcription, translation, biography drafts and discovery suggestions.
6. Generational Preservation — GEDCOM, complete exports, family books, succession, backup, recovery and integrity checks.

## Principles
Correctness over visual polish. Person profiles are gateways into life stories. Shared identity does not imply shared access. Historical claims need provenance or uncertainty. AI never invents facts or silently modifies accepted records. Preserve originals and original-language content. Private by default; public disclosure requires explicit approval. Core data remains portable. Design for elders and non-technical contributors.

## Success metric
Active family archives: spaces with meaningful, maintained information across multiple generations. Supporting measures: people/generations; active contributors; invitation acceptance; memories/sources per profile; stories preserved; provenance coverage; successful export/restore.

## Initial non-goals
Historical-record subscription marketplace, DNA matching, automatic cross-family identity resolution, public social network, native apps, microservices/graph infrastructure, AI historical assertions without human review.

## Risks
Single-contributor adoption; privacy leakage; duplicates; incorrect relationships; AI hallucination; free-tier media/AI cost; historical uncertainty; storage lock-in; succession.
