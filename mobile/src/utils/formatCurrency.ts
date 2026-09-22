/**
 * Format a number as Indian Rupee currency.
 */
export const formatCurrency = (amount: number): string => {
  return `₹ ${amount.toLocaleString('en-IN')}`;
};

/**
 * Format a number as compact currency (e.g., ₹1,500).
 */
export const formatCurrencyCompact = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

/**
 * Format amount with rupee symbol for rewards display.
 */
export const formatRewardAmount = (amount: number): string => {
  return `₹ ${amount}`;
};
