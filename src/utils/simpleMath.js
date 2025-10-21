/**
 * Simple math utilities - lightweight replacements for over-engineered mathCache
 * Modern browsers handle these operations efficiently without complex caching
 */

// Simple math functions using native JavaScript (plenty fast for 200 particles)
export const fastSin = Math.sin;
export const fastCos = Math.cos;
export const fastSqrt = Math.sqrt;

// Simple distance calculation
export const fastDistance = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

// Distance squared for comparisons (avoids sqrt when not needed)
export const distanceSquared = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
};
