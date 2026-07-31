/**
 * User Factory — generates test user data.
 *
 * Used to create users for test scenarios that require specific personas.
 */

import { faker } from '@faker-js/faker';
import { TestUser, UserRole } from '../../models/user.model';
import { env } from '../../config/env';

export class UserFactory {
  /**
   * Create a random test user with a given role.
   */
  static create(role: UserRole = 'user', overrides: Partial<TestUser> = {}): TestUser {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      username: faker.internet.username({ firstName, lastName }).toLowerCase(),
      password: faker.internet.password({ length: 12, memorable: true }),
      email: faker.internet.email({ firstName, lastName }),
      firstName,
      lastName,
      role,
      ...overrides,
    };
  }

  /**
   * Return the admin user from environment configuration.
   * Use this when you need a guaranteed valid admin user.
   */
  static admin(): TestUser {
    return {
      username: env.adminUsername,
      password: env.adminPassword,
      role: 'admin',
    };
  }

  /**
   * Return the admin user for the WEB APP UI (automationintesting.online).
   * The web app uses a different default password ('password') than the
   * legacy Restful Booker API ('password123'). UI login tests must use
   * this, otherwise the app rejects the credentials.
   */
  static uiAdmin(): TestUser {
    return {
      username: env.adminUsername,
      password: env.uiAdminPassword,
      role: 'admin',
    };
  }

  /**
   * Create a guest user (no authentication required).
   */
  static guest(): TestUser {
    return this.create('guest');
  }

  /**
   * Create multiple users of the same role.
   */
  static createMany(count: number, role: UserRole = 'user'): TestUser[] {
    return Array.from({ length: count }, () => this.create(role));
  }
}
