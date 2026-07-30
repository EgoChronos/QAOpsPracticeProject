/**
 * Authentication domain models.
 */

// ---------------------------------------------------------------------------
// Auth request/response
// ---------------------------------------------------------------------------

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthToken {
  token: string;
}

export interface AuthHeaders {
  Cookie: string; // e.g. "token=abc123"
  Authorization?: string; // Bearer token variant
}

// ---------------------------------------------------------------------------
// Session state (stored to disk by global-setup)
// ---------------------------------------------------------------------------

export interface StoredAuthState {
  token: string;
  username: string;
  expiresAt?: number; // Unix timestamp
}
