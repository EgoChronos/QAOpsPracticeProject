# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/auth/auth.spec.ts >> Auth API >> POST /auth >> should return a token for admin user @regression @api @auth
- Location: tests/api/auth/auth.spec.ts:98:9

# Error details

```
Error: Authentication failed for user "admin". Response: {"reason":"Bad credentials"}
```

# Test source

```ts
  1  | /**
  2  |  * Authentication API Client.
  3  |  *
  4  |  * Wraps the /auth endpoint with typed request/response interfaces.
  5  |  * Returns a token that other clients use for authenticated requests.
  6  |  *
  7  |  * @see https://restful-booker.herokuapp.com/apidoc/#api-Auth
  8  |  */
  9  | 
  10 | import { AxiosResponse } from 'axios';
  11 | import { createHttpClient, extractData } from './base.client';
  12 | import { AuthCredentials, AuthToken } from '../../models/auth.model';
  13 | import { env } from '../../config/env';
  14 | import { ApiEndpoints } from '../../config/urls';
  15 | 
  16 | export class AuthClient {
  17 |   private readonly http = createHttpClient({ baseURL: env.apiUrl });
  18 | 
  19 |   /**
  20 |    * POST /auth
  21 |    * Creates a new auth token for the given credentials.
  22 |    * Returns { token: string } on success, or { reason: 'Bad credentials' } on failure.
  23 |    */
  24 |   async createToken(credentials: AuthCredentials): Promise<AxiosResponse<AuthToken>> {
  25 |     return this.http.post<AuthToken>(ApiEndpoints.auth, credentials);
  26 |   }
  27 | 
  28 |   /**
  29 |    * Convenience: create token and return just the token string.
  30 |    * Throws if credentials are invalid.
  31 |    */
  32 |   async getToken(credentials: AuthCredentials): Promise<string> {
  33 |     const response = await this.createToken(credentials);
  34 |     const data = extractData(response);
  35 | 
  36 |     // Restful Booker returns { reason: 'Bad credentials' } on 200 with wrong creds
  37 |     if (!data.token || (data as unknown as { reason: string }).reason) {
> 38 |       throw new Error(
     |             ^ Error: Authentication failed for user "admin". Response: {"reason":"Bad credentials"}
  39 |         `Authentication failed for user "${credentials.username}". ` +
  40 |           `Response: ${JSON.stringify(data)}`,
  41 |       );
  42 |     }
  43 | 
  44 |     return data.token;
  45 |   }
  46 | 
  47 |   /**
  48 |    * Authenticate using admin credentials from environment config.
  49 |    */
  50 |   async getAdminToken(): Promise<string> {
  51 |     return this.getToken({
  52 |       username: env.adminUsername,
  53 |       password: env.adminPassword,
  54 |     });
  55 |   }
  56 | }
  57 | 
```