/**
 * 粒子系统配置
 * 可以在这里切换渲染引擎：'canvas' 或 'pixi'
 */

export const PARTICLE_CONFIG = {
  // 渲染引擎选择：'canvas' 或 'pixi'
  // canvas: 原生Canvas 2D（已优化，兼容性好）
  // pixi: PixiJS GPU加速（性能更高，但包体积增加140KB）
  renderer: 'canvas', // 默认使用Canvas，确保稳定性
  
  // 是否启用性能监控
  enablePerformanceMonitoring: true,
  
  // 是否在控制台输出性能数据
  logPerformance: false
};

// 运行时切换渲染器（用于测试）
export const setRenderer = (type) => {
  if (type === 'canvas' || type === 'pixi') {
    PARTICLE_CONFIG.renderer = type;
    console.log(`[Particle Config] 切换到 ${type.toUpperCase()} 渲染器`);
    return true;
  }
  console.warn(`[Particle Config] 无效的渲染器类型: ${type}`);
  return false;
};

