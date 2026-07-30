/**
 * Base Axios client factory.
 *
 * Creates a pre-configured Axios instance with:
 * - Typed base URL
 * - Default headers
 * - Request/response interceptors for logging and error normalisation
 *
 * All resource-specific API clients extend this base.
 *
 * Design pattern: Factory function (not singleton) — each test can
 * create its own client instance, making tests independent and
 * allowing different auth tokens per test.
 */

import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { Timeouts } from '../../config/timeouts';
import { logger } from '../../utils/logger';

export interface BaseClientOptions {
  baseURL: string;
  token?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ApiError {
  status: number;
  statusText: string;
  data: unknown;
  url: string | undefined;
  method: string | undefined;
}

/**
 * Creates a pre-configured Axios instance for a specific API base URL.
 * Attaches request/response interceptors for consistent logging and error handling.
 */
export function createHttpClient(options: BaseClientOptions): AxiosInstance {
  const instance = axios.create({
    baseURL: options.baseURL,
    timeout: options.timeout ?? Timeouts.API_REQUEST,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // Auth cookie pattern used by Restful Booker
      ...(options.token ? { Cookie: `token=${options.token}` } : {}),
      ...options.headers,
    },
  });

  // -------------------------------------------------------------------------
  // Request interceptor — log outgoing requests
  // -------------------------------------------------------------------------
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      logger.debug(`→ ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, {
        params: config.params,
        data: config.data,
      });
      return config;
    },
    (error: AxiosError) => {
      logger.error('Request error', error.message);
      return Promise.reject(error);
    },
  );

  // -------------------------------------------------------------------------
  // Response interceptor — log responses and normalise errors
  // -------------------------------------------------------------------------
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      logger.debug(
        `← ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
      );
      return response;
    },
    (error: AxiosError) => {
      const apiError: ApiError = {
        status: error.response?.status ?? 0,
        statusText: error.response?.statusText ?? 'Unknown',
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
      };
      logger.error(`API Error ${apiError.status}`, apiError);
      // Re-throw a plain error with useful context
      return Promise.reject(apiError);
    },
  );

  return instance;
}

/**
 * Helper to extract response data with proper typing.
 */
export function extractData<T>(response: AxiosResponse<T>): T {
  return response.data;
}
