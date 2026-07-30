# QAOps Playwright Learning Framework

A **production-quality Playwright + TypeScript automation framework** designed for learning modern QAOps practices. 
This project tests the [Restful Booker Platform](https://automationintesting.online/), a realistic demo application featuring both a web UI and a REST API.

## 🎯 Project Goals

This is not a toy project. It is structured exactly how a mid-to-large software company structures their automation repositories. It demonstrates:
- **Playwright + TypeScript** for robust, typed automation
- **API + UI Testing Integration** (using APIs to set up test data for UI tests)
- **Design Patterns**: Page Object Model (POM), Component Objects, Service Layer, Factory, Fixtures
- **Reporting**: Allure Reports with failure categorisation
- **CI/CD Readiness**: GitHub Actions and Docker support

---

## 🏗️ Architecture

The framework is divided into clear layers of responsibility:

```text
src/
├── api/             # API interaction layer
│   ├── clients/     # Typed Axios HTTP wrappers per resource
│   ├── schemas/     # Zod schemas for runtime response validation
│   └── services/    # Orchestration layer (combines API calls, tracks cleanup)
├── components/      # Reusable UI component objects (Navbar, DatePicker)
├── config/          # Environment configuration and named timeouts
├── data/            # Test data generation
│   ├── constants/   # Enums and string constants (Endpoints, Messages)
│   └── factories/   # Faker-backed Test Data Builders
├── fixtures/        # Playwright custom fixtures (Dependency Injection)
├── helpers/         # High-level test helpers (e.g., createAndVerifyBooking)
├── hooks/           # Global setup/teardown (Auth caching)
├── models/          # TypeScript domain interfaces (Booking, User)
├── pages/           # Page Object Model classes
└── utils/           # Generic utilities (Dates, Strings, Logger)

tests/
├── api/             # Headless API test suites (CRUD, Auth, Negative, Health)
└── ui/              # Browser UI test suites
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 18.0.0)
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npm run install:browsers
   ```
4. Setup environment variables:
   ```bash
   cp .env.example .env
   ```
   *(The default `.env` is already configured to point to the public demo application.)*

---

## 🏃 Running Tests

The framework includes multiple npm scripts for different execution strategies:

| Command | Description |
|---|---|
| `npm test` | Run all tests headlessly |
| `npm run headed` | Run all tests with browser visible |
| `npm run ui` | Run only UI tests |
| `npm run api` | Run only API tests |
| `npm run smoke` | Run critical smoke tests (`@smoke` tag) |
| `npm run regression` | Run the full regression suite (`@regression` tag) |
| `npm run debug` | Open Playwright UI mode for interactive debugging |
| `npm run report` | Open the built-in Playwright HTML report |
| `npm run allure` | Generate and open the rich Allure HTML report |

---

## 🔧 Environment Configuration

The framework supports multiple environments via `.env`.

**Supported environments (`TEST_ENV`):** `local`, `dev`, `staging`, `production`

**Key variables:**
- `BASE_URL`: Web application URL
- `API_URL`: REST API URL
- `CI`: Set to `true` in CI pipelines to adjust timeouts and retry logic

*(See `.env.example` for the full list of configurable options.)*

---

## 💡 Key Design Patterns Demonstrated

### 1. API-Driven Test Data (The Service Layer)
Instead of driving the UI to create a booking before testing a deletion, tests use the `BookingService` to create data instantly via the API.
```typescript
// Test setup: create booking via API
const created = await bookingService.createBooking(BookingFactory.create());

// Test execution: delete via UI
await adminPage.deleteBooking(created.bookingid);
```

### 2. Automatic State Cleanup
The `BookingService` tracks every resource it creates. The Playwright custom fixture calls `bookingService.cleanup()` automatically in the `afterEach` hook, ensuring tests never leave garbage data behind.

### 3. Factory Pattern (Faker + Builder)
Data is generated dynamically, ensuring tests don't share mutable state.
```typescript
// Completely random valid booking
const booking1 = BookingFactory.create();

// Random booking, but with a specific first name
const booking2 = BookingFactory.create({ firstname: 'Alice' });
```

### 4. Custom Fixtures (Dependency Injection)
Tests don't instantiate page objects or services manually. Playwright fixtures inject them, handling all setup and teardown automatically.
```typescript
test('book a room', async ({ homePage, bookingService }) => {
  // homePage and bookingService are ready to use immediately
});
```

### 5. Pre-Authenticated Browser Contexts
The `auth.fixture.ts` logs in via the API during setup and injects the session cookies directly into the browser context. UI tests that require authentication start already logged in, saving significant execution time.

---

## 📊 Reporting

The framework uses dual reporters:
1. **Playwright HTML** (`npm run report`): Fast, zero-dependency local report.
2. **Allure** (`npm run allure`): Enterprise-grade reporting with history, trends, and custom failure categorisation (configured in `reporting/categories.json`).

---

## 🐳 Docker Integration

Run tests in an isolated, identical environment using Docker Compose:

```bash
# Run all tests in Docker
docker-compose -f docker/docker-compose.yml --profile all up

# Run only API tests in Docker
docker-compose -f docker/docker-compose.yml --profile api up
```
*(Test results and Allure data are mounted back to your host machine.)*

---

## 🛠️ Code Quality

- **TypeScript**: Strict mode enabled.
- **ESLint**: Configured with Playwright-specific rules (`plugin:playwright/recommended`).
- **Prettier**: Enforces consistent code formatting.
- **Zod**: Used for runtime validation of API responses to ensure the backend honors its contract.

Run checks:
```bash
npm run lint
npm run format
npm run type-check
```
