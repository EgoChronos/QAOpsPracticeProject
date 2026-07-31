/**
 * Auth Service — orchestration layer for authentication.
 *
 * The Service Layer sits above API clients and provides higher-level
 * operations that tests actually need. Services can combine multiple
 * client calls, handle retries, and cache state.
 *
 * This separation means tests import from services (not clients directly),
 * keeping tests readable and hiding HTTP plumbing.
 */

import { AuthClient } from '../clients/auth.client';
import { UiAuthClient } from '../clients/ui-auth.client';
import { AuthCredentials, AuthToken, StoredAuthState } from '../../models/auth.model';
import { env } from '../../config/env';
import { logger } from '../../utils/logger';

export class AuthService {
  private readonly client: AuthClient;
  private readonly uiClient: UiAuthClient;
  private cachedToken: string | null = null;
  private tokenExpiry: number | null = null;

  constructor() {
    this.client = new AuthClient();
    this.uiClient = new UiAuthClient();
  }

  /**
   * Get an authentication token.
   * Returns cached token if still valid, otherwise fetches a new one.
   */
  async getToken(credentials?: AuthCredentials): Promise<string> {
    // Use cached token if available and not expired
    if (this.cachedToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      logger.debug('Using cached auth token');
      return this.cachedToken;
    }

    const creds = credentials ?? {
      username: env.adminUsername,
      password: env.adminPassword,
    };

    logger.info(`Fetching auth token for user: ${creds.username}`);
    const token = await this.client.getToken(creds);

    // Cache for 15 minutes (Restful Booker tokens are long-lived)
    this.cachedToken = token;
    this.tokenExpiry = Date.now() + 15 * 60 * 1000;

    return token;
  }

  /**
   * Get admin token using credentials from environment config.
   * NOTE: this targets the LEGACY Restful Booker API (env.apiUrl).
   */
  async getAdminToken(): Promise<string> {
    return this.getToken({
      username: env.adminUsername,
      password: env.adminPassword,
    });
  }

  /**
   * Get a session token for the WEB APP admin panel (env.baseUrl).
   * The web app (automationintesting.online) uses a different login
   * endpoint (POST /api/auth/login) and a different default password
   * than the legacy API. UI tests MUST use this token for the session
   * cookie — a token from the legacy API will NOT authenticate the app.
   */
  async getUiAdminToken(): Promise<string> {
    const creds = {
      username: env.adminUsername,
      password: env.uiAdminPassword,
    };
    logger.info(`Fetching UI auth token for user: ${creds.username}`);
    return this.uiClient.getToken(creds);
  }

  /**
   * Attempt login and return the raw API response.
   * Useful for testing both success and failure scenarios.
   */
  async login(credentials: AuthCredentials): Promise<AuthToken> {
    const response = await this.client.createToken(credentials);
    return response.data;
  }

  /**
   * Verify that credentials are valid by attempting token creation.
   * Returns true if successful, false if rejected.
   */
  async verifyCredentials(credentials: AuthCredentials): Promise<boolean> {
    try {
      await this.client.getToken(credentials);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Build a StoredAuthState object for persistence to disk.
   * Uses the WEB APP session token — the stored state represents an
   * authenticated UI session (consumed by authenticated fixtures).
   */
  async buildStoredState(credentials?: AuthCredentials): Promise<StoredAuthState> {
    const creds = credentials ?? {
      username: env.adminUsername,
      password: env.uiAdminPassword,
    };
    const token = await this.uiClient.getToken(creds);
    return {
      token,
      username: creds.username,
      expiresAt: Date.now() + 15 * 60 * 1000,
    };
  }

  /** Clear cached token (force re-authentication on next call) */
  invalidateCache(): void {
    this.cachedToken = null;
    this.tokenExpiry = null;
  }
}
