import { test } from "node:test";
import assert from "node:assert/strict";
import { subtotal, applyDiscount, addVat, orderTotal } from "../src/pricing.js";

const basket = [
  { name: "Notebook", price: 12.5, qty: 2 },
  { name: "Pen", price: 2.5, qty: 10 },
];

test("subtotal adds up price × quantity", () => {
  assert.equal(subtotal(basket), 50);
});

test("subtotal of an empty basket is 0", () => {
  assert.equal(subtotal([]), 0);
});

test("subtotal rounds to the nearest penny", () => {
  assert.equal(subtotal([{ price: 0.333, qty: 3 }]), 1);
});

test("no discount code leaves the amount unchanged", () => {
  assert.equal(applyDiscount(50, undefined), 50);
});

test("WELCOME10 takes 10% off", () => {
  assert.equal(applyDiscount(50, "WELCOME10"), 45);
});

test("VIP15 takes 15% off", () => {
  assert.equal(applyDiscount(200, "VIP15"), 170);
});

test("an unknown discount code is rejected", () => {
  assert.throws(() => applyDiscount(50, "FREESTUFF"), /Unknown discount code/);
});

test("VAT adds 20%", () => {
  assert.equal(addVat(100), 120);
});

test("order total applies the discount before VAT", () => {
  assert.equal(orderTotal(basket, "WELCOME10"), 54);
});

test("order total without a code is subtotal plus VAT", () => {
  assert.equal(orderTotal(basket), 60);
});
