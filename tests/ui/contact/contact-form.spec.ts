/**
 * UI Tests — Contact Form
 *
 * Tests the hotel contact form — both success and validation error scenarios.
 *
 * This suite demonstrates:
 * - Form interaction testing
 * - Validation error assertion
 * - Success state verification
 * - Faker for generating realistic test data
 *
 * Tags: @regression @contact
 */

import { test, expect } from '../../../src/fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { randomPhone } from '../../../src/utils/string.utils';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ contactPage }) => {
    await contactPage.scrollToContactForm();
  });

  // ---------------------------------------------------------------------------
  // Happy path
  // ---------------------------------------------------------------------------

  test('should successfully submit a valid contact form @regression @contact', async ({
    contactPage,
  }) => {
    const contactData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: randomPhone(11),
      subject: faker.lorem.words(5),
      message: faker.lorem.sentences(3),
    };

    await contactPage.fillForm(contactData);
    await contactPage.submit();

    // Expect the success confirmation to appear
    await contactPage.expectSuccessMessageVisible();
  });

  test('should show submitter name in success confirmation @regression @contact', async ({
    contactPage,
  }) => {
    const name = faker.person.fullName();

    await contactPage.fillForm({
      name,
      email: faker.internet.email(),
      phone: randomPhone(11),
      subject: faker.lorem.words(5),
      message: faker.lorem.sentences(3),
    });
    await contactPage.submit();

    await contactPage.expectSuccessWithName(name);
  });

  // ---------------------------------------------------------------------------
  // Validation errors
  // ---------------------------------------------------------------------------

  test('should show error when form is submitted empty @regression @contact', async ({
    contactPage,
  }) => {
    await contactPage.submit();
    await contactPage.expectValidationErrors();
  });

  test('should show error when name is missing @regression @contact', async ({ contactPage }) => {
    await contactPage.fillForm({
      name: '',
      email: faker.internet.email(),
      phone: randomPhone(11),
      subject: faker.lorem.words(5),
      message: faker.lorem.sentences(3),
    });
    await contactPage.submit();
    await contactPage.expectValidationErrors();
  });

  test('should show error when email is missing @regression @contact', async ({ contactPage }) => {
    await contactPage.fillForm({
      name: faker.person.fullName(),
      email: '',
      phone: randomPhone(11),
      subject: faker.lorem.words(5),
      message: faker.lorem.sentences(3),
    });
    await contactPage.submit();
    await contactPage.expectValidationErrors();
  });

  test('should show error when phone is too short @regression @contact', async ({
    contactPage,
  }) => {
    await contactPage.fillForm({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: '12345', // Too short (< 11 chars)
      subject: faker.lorem.words(5),
      message: faker.lorem.sentences(3),
    });
    await contactPage.submit();
    await contactPage.expectValidationErrors();
  });

  test('should show error when subject is too short @regression @contact', async ({
    contactPage,
  }) => {
    await contactPage.fillForm({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: randomPhone(11),
      subject: 'ab', // Too short (< 5 chars)
      message: faker.lorem.sentences(3),
    });
    await contactPage.submit();
    await contactPage.expectValidationErrors();
  });

  test('should show error when message is too short @regression @contact', async ({
    contactPage,
  }) => {
    await contactPage.fillForm({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: randomPhone(11),
      subject: faker.lorem.words(5),
      message: 'Short msg', // Too short (< 20 chars)
    });
    await contactPage.submit();
    await contactPage.expectValidationErrors();
  });

  // ---------------------------------------------------------------------------
  // Field interactions
  // ---------------------------------------------------------------------------

  test('should allow filling all form fields @regression @contact', async ({ contactPage }) => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const phone = randomPhone(11);

    await contactPage.fillForm({
      name,
      email,
      phone,
      subject: faker.lorem.words(5),
      message: faker.lorem.sentences(3),
    });

    // Assert values are filled
    await expect(contactPage.nameInput).toHaveValue(name);
    await expect(contactPage.emailInput).toHaveValue(email);
    await expect(contactPage.phoneInput).toHaveValue(phone);
  });
});
