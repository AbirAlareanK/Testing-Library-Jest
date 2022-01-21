/**
 * @function formatCurrency
 * 
 * @param {number} amount
 * @returns {string} number formatted as curency
 * 
 * @example 
 * formatCurrency(0)
 * => $0.00
 * 
 *  **/

// format number as currency
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
}