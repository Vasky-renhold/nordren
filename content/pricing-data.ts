// Owner-supplied rates shared by both languages. Keep bands explicit; do not interpolate.
export const pricingRates = {
  homeHourly: 499,
  windowHourly: 500,
  moveOut: [
    { min: null, max: 35, price: 3000 },
    { min: 36, max: 45, price: 3700 },
    { min: 46, max: 55, price: 4400 },
    { min: 56, max: 65, price: 5100 },
    { min: 66, max: 75, price: 5800 },
    { min: 76, max: 90, price: 6500 },
    { min: 91, max: 105, price: 7200 },
    { min: 106, max: 120, price: 7900 },
    { min: 121, max: 140, price: 8600 },
    { min: 141, max: 160, price: 9300 },
    { min: 161, max: 180, price: 10000 },
    { min: 181, max: 200, price: 11000 },
  ],
  extras: [
    { id: "appliances", price: 550, unit: "each" },
    { id: "balcony", price: 60, unit: "squareMetre" },
    { id: "storage", price: 40, unit: "squareMetre" },
    { id: "doubleWindows", price: 50, unit: "window" },
    { id: "blinds", price: 350, unit: "each" },
    { id: "fireplace", price: 400, unit: "each" },
  ],
  furnishedPercent: 50,
} as const;
