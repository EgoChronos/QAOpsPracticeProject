/**
 * Zod schemas for Auth API response validation.
 */

import { z } from 'zod';

export const AuthTokenSchema = z.object({
  token: z.string().min(1, 'Token must not be empty'),
});

export const AuthErrorSchema = z.object({
  reason: z.string(),
});

// Union: auth response is either a token or an error
export const AuthResponseSchema = z.union([AuthTokenSchema, AuthErrorSchema]);

export type ValidatedAuthToken = z.infer<typeof AuthTokenSchema>;
export type ValidatedAuthError = z.infer<typeof AuthErrorSchema>;
export type ValidatedAuthResponse = z.infer<typeof AuthResponseSchema>;

/** Type guard: checks if auth response contains a valid token */
export function isAuthToken(response: ValidatedAuthResponse): response is ValidatedAuthToken {
  return 'token' in response && typeof response.token === 'string';
}
