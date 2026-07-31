/**
 * UI Authentication API Client.
 *
 * Authenticates against the WEB APP's own backend (same origin as the UI).
 * The app (automationintesting.online / restful-booker v2.2) exposes
 * POST /api/auth/login and returns a token that is stored in a `token`
 * cookie to keep the admin session alive. This is DIFFERENT from the
 * legacy Restful Booker API (restful-booker.herokuapp.com) which uses
 * POST /auth with a `Cookie: token=...` header.
 *
 * The token obtained here is the one that must be injected into the
 * browser context for authenticated UI tests.
 */

import { AxiosResponse } from 'axios';
import { createHttpClient, extractData } from './base.client';
import { AuthCredentials, AuthToken } from '../../models/auth.model';
import { env } from '../../config/env';

export class UiAuthClient {
  private readonly http = createHttpClient({ baseURL: env.baseUrl });

  /**
   * POST /api/auth/login
   * Creates a session token for the web app.
   * Returns { token: string } on success, or { reason: 'Invalid credentials' } on failure.
   */
  async createToken(credentials: AuthCredentials): Promise<AxiosResponse<AuthToken>> {
    return this.http.post<AuthToken>('/api/auth/login', credentials);
  }

  /**
   * Create token and return just the token string.
   * Throws if credentials are invalid.
   */
  async getToken(credentials: AuthCredentials): Promise<string> {
    const response = await this.createToken(credentials);
    const data = extractData(response);

    if (!data.token) {
      throw new Error(
        `UI authentication failed for user "${credentials.username}". ` +
          `Response: ${JSON.stringify(data)}`,
      );
    }

    return data.token;
  }

  /**
   * Authenticate using admin credentials from environment config.
   */
  async getAdminToken(): Promise<string> {
    return this.getToken({
      username: env.adminUsername,
      password: env.uiAdminPassword,
    });
  }
}
