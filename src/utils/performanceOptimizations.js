/**
 * Memory leak fixes for particle animations
 * Eliminates object creation in RAF loops without changing visual behavior
 */

// Pre-allocated color cache to eliminate string creation in RAF loops
const COLOR_CACHE = new Map();
const MAX_CACHE_SIZE = 1000;

// Create pre-calculated color strings to eliminate runtime string generation
export const getCachedColor = (opacity) => {
  // Round opacity to reduce cache size
  const roundedOpacity = Math.round(opacity * 100) / 100;

  if (COLOR_CACHE.has(roundedOpacity)) {
    return COLOR_CACHE.get(roundedOpacity);
  }

  // Only generate new color strings when absolutely necessary
  const colorStr = `rgba(255, 255, 255, ${roundedOpacity})`;

  // Prevent cache from growing too large
  if (COLOR_CACHE.size >= MAX_CACHE_SIZE) {
    const firstKey = COLOR_CACHE.keys().next().value;
    COLOR_CACHE.delete(firstKey);
  }

  COLOR_CACHE.set(roundedOpacity, colorStr);
  return colorStr;
};

// Pre-allocated random values to eliminate Math.random() calls in RAF
const RANDOM_POOL_SIZE = 10000;
const randomPool = new Float32Array(RANDOM_POOL_SIZE);
let randomIndex = 0;

// Pre-fill random pool
for (let i = 0; i < RANDOM_POOL_SIZE; i++) {
  randomPool[i] = Math.random();
}

export const getPooledRandom = () => {
  const value = randomPool[randomIndex];
  randomIndex = (randomIndex + 1) % RANDOM_POOL_SIZE;
  return value;
};

// Time-based optimization to reduce Date.now() calls
let cachedTime = Date.now();
let lastTimeUpdate = performance.now();

export const getCachedTime = () => {
  const now = performance.now();
  // Only update time every 16ms (60fps)
  if (now - lastTimeUpdate > 16) {
    cachedTime = Date.now();
    lastTimeUpdate = now;
  }
  return cachedTime;
};

// Optimized color generation for particle effects
const PARTICLE_COLORS = [];
for (let i = 0; i <= 100; i++) {
  const brightness = 255 - (i * 255 / 200); // Pre-calculate brightness variations
  PARTICLE_COLORS.push(`rgba(${brightness}, 255, 255`);
}

export const getParticleColor = (opacity, variation = 0) => {
  const index = Math.min(99, Math.floor(variation * 100));
  return `${PARTICLE_COLORS[index]}, ${opacity})`;
};

// Pre-calculated wave lookup table to eliminate Math.sin/cos calls in RAF
const WAVE_TABLE_SIZE = 3600; // 360 * 10 for high precision
const waveTableSin = new Float32Array(WAVE_TABLE_SIZE);
const waveTableCos = new Float32Array(WAVE_TABLE_SIZE);

// Pre-fill wave tables
for (let i = 0; i < WAVE_TABLE_SIZE; i++) {
  const angle = (i / WAVE_TABLE_SIZE) * Math.PI * 2;
  waveTableSin[i] = Math.sin(angle);
  waveTableCos[i] = Math.cos(angle);
}

export const fastSinCached = (angle) => {
  const normalizedAngle = ((angle % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2);
  const index = Math.floor((normalizedAngle / (Math.PI * 2)) * WAVE_TABLE_SIZE);
  return waveTableSin[index] || 0;
};

export const fastCosCached = (angle) => {
  const normalizedAngle = ((angle % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2);
  const index = Math.floor((normalizedAngle / (Math.PI * 2)) * WAVE_TABLE_SIZE);
  return waveTableCos[index] || 0;
};