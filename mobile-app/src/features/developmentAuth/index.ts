/**
 * ============================================================================
 * TEMPORARY DEVELOPMENT AUTHENTICATION MODULE
 * ============================================================================
 * IMPORTANT:
 * This module is a temporary frontend-only development authentication system
 * designed to enable local development and testing across team members without
 * backend integration or hardcoded test credentials.
 *
 * REMOVE THIS MODULE AND RECONNECT authService TO THE REAL API WHEN BACKEND
 * AUTHENTICATION IS INTEGRATED.
 * ============================================================================
 */

export * from "./devAuthTypes";
export * from "./devAuthStorage";
export * from "./devAuthSession";
export * from "./devAuthService";
