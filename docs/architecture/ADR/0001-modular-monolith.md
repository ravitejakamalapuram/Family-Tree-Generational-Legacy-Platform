# ADR-0001: Modular Monolith

- Status: Accepted
- Date: 2026-10-30

## Context
The product has multiple domains but is at definition/initial build stage. Distributed services add deployment, observability and consistency overhead before scale/team boundaries are known.

## Decision
Use a TypeScript modular monolith with explicit domain modules/interfaces. Run async jobs in a worker sharing domain/application packages and database.

## Consequences
Simple deployment, transactions and local development. Enforce module boundaries. Revisit only when independent scaling/team ownership/reliability evidence warrants extraction.
