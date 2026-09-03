/**
 * case_management (v1) / BaseApplication (v2), merged.
 *
 * This is a READ / ORCHESTRATION layer only. It never owns filing logic —
 * gst / itr / loan own their own status internally and publish domain
 * events here. This prevents the dual-source-of-truth risk flagged in
 * ADR 0003.
 */
package com.taxedge.applicationtracking;
