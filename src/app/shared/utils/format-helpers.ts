/**
 * Format a number as a currency with the specified currency symbol
 */
export function formatCurrency(value: number, currency: string = 'SAR', locale: string = 'ar-SA'): string {
  return new Intl.NumberFormat(locale, { 
    style: 'currency', 
    currency,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Format a number as a percentage
 */
export function formatPercentage(value: number, locale: string = 'ar-SA'): string {
  return new Intl.NumberFormat(locale, { 
    style: 'percent', 
    maximumFractionDigits: 1 
  }).format(value / 100);
}

/**
 * Format a date according to the specified locale
 */
export function formatDate(date: Date, locale: string = 'ar-SA'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
} 