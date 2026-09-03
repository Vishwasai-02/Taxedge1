/**
 * RESTORED — non-negotiable per spec §23.
 *
 * Listens to domain events across all modules (login, document access,
 * status change). Write-only from other modules' side — audit is never
 * queried by them; it only consumes events they publish.
 */
package com.taxedge.audit;
