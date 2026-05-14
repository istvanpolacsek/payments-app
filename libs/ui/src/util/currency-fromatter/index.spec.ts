import { describe, expect, it } from 'vitest';
import getCurrencyFormatter from './index';

describe('getCurrencyFormatter', () => {
  it('returns a formatter for the provided locale and currency', () => {
    const format = getCurrencyFormatter('en-US', 'USD');

    expect(format(1234.5)).toBe('$1,234.50');
  });

  it('formats values using the locale-specific separators', () => {
    const format = getCurrencyFormatter('de-DE', 'EUR');

    expect(format(1234.5)).toBe('1.234,50 €');
  });

  it('limits the output to two fraction digits', () => {
    const format = getCurrencyFormatter('en-US', 'USD');

    expect(format(12.345)).toBe('$12.35');
  });
});
