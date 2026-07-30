/**
 * Health Check API Client.
 *
 * @see https://restful-booker.herokuapp.com/apidoc/#api-Ping
 */

import { AxiosResponse } from 'axios';
import { createHttpClient } from './base.client';
import { env } from '../../config/env';
import { ApiEndpoints } from '../../config/urls';

export class HealthClient {
  private readonly http = createHttpClient({ baseURL: env.apiUrl });

  /**
   * GET /ping
   * Returns 201 if the API is healthy.
   * Used to verify the API is reachable before running test suites.
   */
  async ping(): Promise<AxiosResponse<string>> {
    return this.http.get<string>(ApiEndpoints.ping);
  }

  /**
   * Convenience: returns true if the API responds with 201.
   */
  async isHealthy(): Promise<boolean> {
    try {
      const response = await this.ping();
      return response.status === 201;
    } catch {
      return false;
    }
  }
}
