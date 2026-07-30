/**
 * Framework Logger.
 *
 * A lightweight, levelled logger for the test framework.
 *
 * Design decisions:
 * - Respects TEST_ENV — more verbose in local/dev, quieter in CI
 * - Uses consistent timestamp format
 * - Console output only (not file-based) — Allure and Playwright handle
 *   structured log capture for reports
 * - NOT a replacement for Playwright's built-in step/trace capture;
 *   this is for debugging the framework infrastructure itself
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function getConfiguredLevel(): LogLevel {
  const env = process.env.TEST_ENV ?? 'local';
  const logLevel = process.env.LOG_LEVEL;
  if (logLevel && logLevel in LOG_LEVELS) return logLevel as LogLevel;
  // In CI, suppress debug logs
  if (process.env.CI === 'true') return 'info';
  // Locally, show everything
  return env === 'production' ? 'warn' : 'debug';
}

class Logger {
  private readonly level: number;

  constructor() {
    this.level = LOG_LEVELS[getConfiguredLevel()];
  }

  private log(level: LogLevel, message: string, data?: unknown): void {
    if (LOG_LEVELS[level] < this.level) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase().padEnd(5)}]`;
    const formattedMessage = `${prefix} ${message}`;

    switch (level) {
      case 'debug':
        // eslint-disable-next-line no-console
        console.debug(formattedMessage, data !== undefined ? data : '');
        break;
      case 'info':
        // eslint-disable-next-line no-console
        console.info(formattedMessage, data !== undefined ? data : '');
        break;
      case 'warn':
        // eslint-disable-next-line no-console
        console.warn(formattedMessage, data !== undefined ? data : '');
        break;
      case 'error':
        // eslint-disable-next-line no-console
        console.error(formattedMessage, data !== undefined ? data : '');
        break;
    }
  }

  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }
}

// Export a singleton logger instance
export const logger = new Logger();
