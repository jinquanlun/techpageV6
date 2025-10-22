# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- **Start development server**: `npm run dev` (runs on port 3000)
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview` (runs on port 4173)
- **Analyze bundle size**: `npm run analyze` (generates dist/stats.html)

### Dependencies
- **Install dependencies**: `npm install`

## Architecture Overview

### Technology Stack
- **Frontend**: React 18 with Vite 5.x build system
- **Routing**: React Router DOM 6.x with lazy loading
- **Particle System**: Dual-engine support (Canvas 2D/PixiJS 8.x)
- **Performance**: Custom optimization utilities for high-performance particle animations

### Project Structure
```
src/
├── components/
│   ├── common/           # Reusable components (OptimizedImage)
│   └── particles/        # Particle system components (PixiParticleSystem)
├── config/              # Configuration files
│   ├── techCategories.js # HPH/PEF technology data
│   └── particleConfig.js # Particle renderer selection ('canvas'/'pixi')
├── pages/               # Route components with lazy loading
│   ├── HomePage.jsx     # Main tech showcase (contains TechSection)
│   ├── HPHDetailPage.jsx
│   └── PEFDetailPage.jsx
├── utils/               # Performance optimization utilities
│   ├── simpleMath.js    # Cached trigonometric functions
│   ├── simplePool.js    # Lightweight object management
│   └── performanceOptimizations.js # Various performance helpers
└── styles/              # CSS organized by pages/globals
```

### Key Architecture Patterns

#### Dual Particle Rendering System
The app supports two particle engines configured in `src/config/particleConfig.js`:
- **Canvas 2D** (default): Stable, smaller bundle, broad compatibility
- **PixiJS**: GPU-accelerated, higher performance, +140KB bundle size

Switch engines by modifying `PARTICLE_CONFIG.renderer` or using `setRenderer('canvas'|'pixi')`.

#### Performance Optimization System
Four-layer optimization approach:
1. **Math caching** (`simpleMath.js`): Pre-computed trigonometric lookup tables
2. **Object pooling** (`simplePool.js`): Lightweight object management for particles
3. **Rendering optimizations** (`performanceOptimizations.js`): Color caching, frame management
4. **Smart loading**: Route-level lazy loading with error boundaries

#### Route Navigation Flow
- Routes use lazy loading with suspense boundaries
- Navigation state management for smooth transitions between detail pages and main showcase
- Error boundary with user-friendly fallback UI

#### Responsive Particle Configuration
Adaptive particle counts based on device:
- Mobile: 8-25 particles
- Desktop: 15-45 particles
- Connection distance: 180-300px

## Important Technical Considerations

### Bundle Optimization
- Vite config includes manual chunking for vendors, pages, and utils
- Terser minification with console removal in production
- Asset optimization with hash-based naming

### Performance Monitoring
- FPS tracking and adaptive quality control built into particle systems
- Performance monitoring can be enabled via `PARTICLE_CONFIG.enablePerformanceMonitoring`

### Development Workflow
When adding new pages:
1. Create component in `src/pages/`
2. Add route in `src/App.jsx` with lazy loading
3. Add corresponding styles in `src/styles/pages/`

### Technology Focus
This is a showcase platform for HPH (High Pressure Homogenization) and PEF (Pulsed Electric Field) food processing technologies. The particle animations are designed to represent these industrial processes visually.