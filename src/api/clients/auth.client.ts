/**
 * Authentication API Client.
 *
 * Wraps the /auth endpoint with typed request/response interfaces.
 * Returns a token that other clients use for authenticated requests.
 *
 * @see https://restful-booker.herokuapp.com/apidoc/#api-Auth
 */

import { AxiosResponse } from 'axios';
import { createHttpClient, extractData } from './base.client';
import { AuthCredentials, AuthToken } from '../../models/auth.model';
import { env } from '../../config/env';
import { ApiEndpoints } from '../../config/urls';

export class AuthClient {
  private readonly http = createHttpClient({ baseURL: env.apiUrl });

  /**
   * POST /auth
   * Creates a new auth token for the given credentials.
   * Returns { token: string } on success, or { reason: 'Bad credentials' } on failure.
   */
  async createToken(credentials: AuthCredentials): Promise<AxiosResponse<AuthToken>> {
    return this.http.post<AuthToken>(ApiEndpoints.auth, credentials);
  }

  /**
   * Convenience: create token and return just the token string.
   * Throws if credentials are invalid.
   */
  async getToken(credentials: AuthCredentials): Promise<string> {
    const response = await this.createToken(credentials);
    const data = extractData(response);

    // Restful Booker returns { reason: 'Bad credentials' } on 200 with wrong creds
    if (!data.token || (data as unknown as { reason: string }).reason) {
      throw new Error(
        `Authentication failed for user "${credentials.username}". ` +
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
      password: env.adminPassword,
    });
  }
}
