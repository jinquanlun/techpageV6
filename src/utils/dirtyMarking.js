/**
 * 高性能脏标记系统
 * 智能追踪状态变化，只在必要时触发重新渲染
 */

class DirtyRegion {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dirty = false;
  }

  /**
   * 检查点是否在区域内
   */
  contains(x, y) {
    return x >= this.x && x <= this.x + this.width &&
           y >= this.y && y <= this.y + this.height;
  }

  /**
   * 标记区域为脏
   */
  markDirty() {
    this.dirty = true;
  }

  /**
   * 清理脏标记
   */
  clean() {
    this.dirty = false;
  }

  /**
   * 扩展区域以包含指定点
   */
  expand(x, y, radius = 0) {
    const minX = Math.min(this.x, x - radius);
    const minY = Math.min(this.y, y - radius);
    const maxX = Math.max(this.x + this.width, x + radius);
    const maxY = Math.max(this.y + this.height, y + radius);

    this.x = minX;
    this.y = minY;
    this.width = maxX - minX;
    this.height = maxY - minY;
  }
}

class ParticleDirtyTracker {
  constructor(particles, movementThreshold = 2.0) {
    this.particles = particles;
    this.movementThreshold = movementThreshold;
    this.lastPositions = new Map();
    this.dirtyParticles = new Set();
    this.connectionsDirty = false;
    this.globalDirty = false;

    // 初始化上一帧位置
    this.initializePositions();
  }

  /**
   * 初始化粒子位置追踪
   */
  initializePositions() {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      this.lastPositions.set(i, { x: p.x, y: p.y });
    }
  }

  /**
   * 检查粒子是否发生显著移动
   */
  checkParticleMovement(index, particle) {
    const lastPos = this.lastPositions.get(index);
    if (!lastPos) return false;

    const dx = particle.x - lastPos.x;
    const dy = particle.y - lastPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance > this.movementThreshold;
  }

  /**
   * 更新粒子追踪状态
   */
  updateParticleTracking() {
    this.dirtyParticles.clear();
    let hasMovement = false;

    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];

      if (this.checkParticleMovement(i, particle)) {
        this.dirtyParticles.add(i);
        hasMovement = true;

        // 更新位置缓存
        this.lastPositions.set(i, { x: particle.x, y: particle.y });
      }
    }

    // 如果有粒子移动，标记连接为脏
    if (hasMovement) {
      this.connectionsDirty = true;
    }

    return hasMovement;
  }

  /**
   * 检查是否需要重新计算连接
   */
  needsConnectionUpdate() {
    return this.connectionsDirty || this.globalDirty;
  }

  /**
   * 获取需要重绘的粒子索引
   */
  getDirtyParticles() {
    return Array.from(this.dirtyParticles);
  }

  /**
   * 清理脏标记
   */
  clean() {
    this.dirtyParticles.clear();
    this.connectionsDirty = false;
    this.globalDirty = false;
  }

  /**
   * 强制标记为全局脏（用于窗口调整等）
   */
  markGlobalDirty() {
    this.globalDirty = true;
    this.connectionsDirty = true;
  }

  /**
   * 获取统计信息
   */
  getStats() {
    return {
      totalParticles: this.particles.length,
      dirtyParticles: this.dirtyParticles.size,
      connectionsDirty: this.connectionsDirty,
      globalDirty: this.globalDirty,
      movementThreshold: this.movementThreshold
    };
  }
}

class ViewportCuller {
  constructor(canvasWidth, canvasHeight, margin = 100) {
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.margin = margin; // 边距，确保边缘粒子的连接也被渲染
    this.visibleParticles = new Set();
  }

  /**
   * 更新viewport尺寸
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  /**
   * 检查粒子是否在可见区域内
   */
  isVisible(particle) {
    return particle.x >= -this.margin &&
           particle.x <= this.width + this.margin &&
           particle.y >= -this.margin &&
           particle.y <= this.height + this.margin;
  }

  /**
   * 更新可见粒子列表
   */
  updateVisibleParticles(particles) {
    this.visibleParticles.clear();

    for (let i = 0; i < particles.length; i++) {
      if (this.isVisible(particles[i])) {
        this.visibleParticles.add(i);
      }
    }

    return this.visibleParticles.size;
  }

  /**
   * 获取可见粒子索引数组
   */
  getVisibleParticleIndices() {
    return Array.from(this.visibleParticles);
  }

  /**
   * 检查两个粒子的连接是否需要渲染
   */
  shouldRenderConnection(p1, p2) {
    // 如果任一粒子在可见区域内，就渲染连接
    return this.isVisible(p1) || this.isVisible(p2);
  }

  /**
   * 获取统计信息
   */
  getStats() {
    return {
      totalViewport: `${this.width}x${this.height}`,
      margin: this.margin,
      visibleParticles: this.visibleParticles.size
    };
  }
}

class SmartRenderManager {
  constructor(canvasWidth, canvasHeight, particles) {
    this.canvas = { width: canvasWidth, height: canvasHeight };

    // 初始化子系统
    this.dirtyTracker = new ParticleDirtyTracker(particles, 2.0);
    this.viewportCuller = new ViewportCuller(canvasWidth, canvasHeight, 100);

    // 性能控制
    this.frameCount = 0;
    this.skipFrames = 0; // 跳帧计数
    this.targetFPS = 60;
    this.actualFPS = 60;

    // 自适应质量控制
    this.qualityLevel = 1.0; // 1.0 = 最高质量, 0.5 = 中等质量, 0.25 = 低质量
    this.lastPerformanceCheck = 0;
  }

  /**
   * 更新渲染管理器状态
   */
  update(particles, currentFPS) {
    this.frameCount++;
    this.actualFPS = currentFPS;

    // 自适应质量调整
    this.adjustQuality(currentFPS);

    // 更新脏标记追踪
    const hasMovement = this.dirtyTracker.updateParticleTracking();

    // 更新可见粒子
    this.viewportCuller.updateVisibleParticles(particles);

    return {
      needsFullRender: this.shouldDoFullRender(),
      needsConnectionUpdate: this.dirtyTracker.needsConnectionUpdate(),
      visibleParticles: this.viewportCuller.getVisibleParticleIndices(),
      qualityLevel: this.qualityLevel
    };
  }

  /**
   * 自适应质量调整
   */
  adjustQuality(currentFPS) {
    const now = performance.now();

    // 每秒检查一次性能
    if (now - this.lastPerformanceCheck > 1000) {
      if (currentFPS < 30) {
        // 性能不足，降低质量
        this.qualityLevel = Math.max(0.25, this.qualityLevel - 0.1);
        this.dirtyTracker.movementThreshold *= 1.2; // 提高移动阈值
      } else if (currentFPS > 50) {
        // 性能充足，提高质量
        this.qualityLevel = Math.min(1.0, this.qualityLevel + 0.05);
        this.dirtyTracker.movementThreshold = Math.max(1.0, this.dirtyTracker.movementThreshold * 0.9);
      }

      this.lastPerformanceCheck = now;
    }
  }

  /**
   * 判断是否需要完整渲染
   */
  shouldDoFullRender() {
    // 低质量模式下跳帧
    if (this.qualityLevel < 0.5) {
      this.skipFrames++;
      if (this.skipFrames % 2 === 0) return false;
    }

    return true;
  }

  /**
   * 根据质量级别过滤粒子
   */
  getQualityFilteredParticles(visibleParticles) {
    if (this.qualityLevel >= 1.0) return visibleParticles;

    // 根据质量级别随机采样粒子
    const sampleRate = this.qualityLevel;
    const filteredParticles = [];

    for (let i = 0; i < visibleParticles.length; i++) {
      if (Math.random() < sampleRate) {
        filteredParticles.push(visibleParticles[i]);
      }
    }

    return filteredParticles;
  }

  /**
   * 清理脏标记
   */
  clean() {
    this.dirtyTracker.clean();
  }

  /**
   * 窗口调整处理
   */
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.viewportCuller.resize(width, height);
    this.dirtyTracker.markGlobalDirty();
  }

  /**
   * 获取综合性能统计
   */
  getPerformanceStats() {
    return {
      frameCount: this.frameCount,
      qualityLevel: this.qualityLevel,
      actualFPS: this.actualFPS,
      dirtyTracker: this.dirtyTracker.getStats(),
      viewportCuller: this.viewportCuller.getStats()
    };
  }

  /**
   * 打印性能报告
   */
  printPerformanceReport() {
    const stats = this.getPerformanceStats();
    console.group('🎯 Smart Render Manager Report');
    console.log('🎮 Quality Control:', {
      'Quality Level': `${(stats.qualityLevel * 100).toFixed(0)}%`,
      'Target FPS': this.targetFPS,
      'Actual FPS': stats.actualFPS.toFixed(1),
      'Frame Count': stats.frameCount
    });
    console.log('🔍 Dirty Tracking:', stats.dirtyTracker);
    console.log('👁️ Viewport Culling:', stats.viewportCuller);
    console.groupEnd();
  }
}

// 导出主要类
export {
  DirtyRegion,
  ParticleDirtyTracker,
  ViewportCuller,
  SmartRenderManager
};

// 便捷工厂函数
export const createSmartRenderManager = (width, height, particles) => {
  return new SmartRenderManager(width, height, particles);
};

export default SmartRenderManager;