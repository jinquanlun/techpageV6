/**
 * Simple object management - lightweight replacement for over-engineered objectPool
 * For small-scale applications (200 particles), simple object creation is more efficient
 * than complex pooling systems with their associated overhead
 */

// Simple connection object factory
export const createConnection = () => ({
  x1: 0, y1: 0, x2: 0, y2: 0,
  opacity: 0, lineWidth: 0, active: false
});

// Simple connection management (no pooling needed for this scale)
export const acquireConnection = createConnection;
export const releaseConnection = () => {
  // No-op: let garbage collection handle cleanup naturally
  // For 200 objects, this is more efficient than pooling overhead
};

// No-op initialization (was causing massive memory pre-allocation)
export const initializeCommonPools = () => {
  // Modern garbage collectors handle small object creation efficiently
  // No pre-allocation needed for this scale
};