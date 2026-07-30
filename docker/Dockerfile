# Use the official Playwright image which includes all required browsers and OS dependencies
# We use the focal tag (Ubuntu 20.04) or jammy (Ubuntu 22.04) based on Playwright version
FROM mcr.microsoft.com/playwright:v1.49.1-jammy

# Set working directory
WORKDIR /app

# Copy package management files first to leverage Docker layer caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Set default environment variables (can be overridden at runtime)
ENV CI=true
ENV TEST_ENV=staging
ENV ALLURE_RESULTS_DIR=reporting/allure-results

# The default command runs all tests
# Override this in docker-compose or docker run to execute specific suites
CMD ["npm", "run", "ci"]
