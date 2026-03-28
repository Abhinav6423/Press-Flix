export const getRatio = (a, b) =>
  b && b > 0 ? ((a / b) * 100).toFixed(1) : "0.0";