# ADR-0001: Modular Monolith
- Status: Accepted
- Date: 2026-10-30

## Context
Multiple domains exist, but the product is at definition/initial build stage. Distributed services add operational and consistency overhead before boundaries or scale are known.

## Decision
Use a TypeScript modular monolith with explicit domain modules/interfaces. Run async jobs in a worker sharing domain/application packages and database.

## Consequences
Simple deployment, transactions and local development. Enforce module boundaries. Revisit only when independent scaling, team ownership or reliability evidence warrants extraction.
