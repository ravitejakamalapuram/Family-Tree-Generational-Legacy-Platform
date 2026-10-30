# ADR-0001: Modular Monolith

- Status: Accepted
- Date: 2026-10-30

## Context
Multiple domains exist, but the product is at definition/initial build stage. Distributed services add operational, deployment and consistency overhead before scale or team boundaries are known.

## Decision
Use a TypeScript modular monolith with explicit domain modules/interfaces. Run async jobs in a worker sharing domain/application packages and database.

## Consequences
Simple deployment, transactions and local development. Enforce module boundaries. Revisit only when independent scaling/team ownership/reliability evidence warrants extraction.
