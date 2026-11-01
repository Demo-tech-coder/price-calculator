// Basket pricing: subtotal, discount codes and VAT.
// All amounts are in pounds and rounded to the nearest penny.

export const DISCOUNT_CODES = {
  WELCOME10: 10, // percent off
  VIP15: 15,
  SPRING20: 20,
};

export const VAT_RATE = 0.2;

const round = (n) => Math.round(n * 100) / 100;

export function subtotal(items) {
  return round(items.reduce((sum, item) => sum + item.price * item.qty, 0));
}

export function applyDiscount(amount, code) {
  if (!code) return amount;
  const percent = DISCOUNT_CODES[code];
  if (percent === undefined) throw new Error(`Unknown discount code: ${code}`);
  return round(amount - percent);
}

export function addVat(amount) {
  return round(amount * (1 + VAT_RATE));
}

export function orderTotal(items, code) {
  return addVat(applyDiscount(subtotal(items), code));
}
