/**
 * User domain models.
 */

export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface TestUser extends User {
  role: UserRole;
}

/** Represents a user that has been created and needs cleanup after the test */
export interface CreatedUser extends TestUser {
  id?: string | number;
  createdAt?: string;
}
