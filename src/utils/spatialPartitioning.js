/**
 * 高性能空间分割系统
 * 使用网格分割算法优化粒子碰撞检测，将O(n²)复杂度降至O(n)
 */

class SpatialGrid {
  constructor(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cols = Math.ceil(width / cellSize);
    this.rows = Math.ceil(height / cellSize);

    // 预分配网格数组以避免运行时分配
    this.grid = new Array(this.cols * this.rows);
    this.clearGrid();

    // 缓存变量以减少重复计算
    this.cellSizeInv = 1 / cellSize;
  }

  /**
   * 清空网格 - 重用数组以避免GC
   */
  clearGrid() {
    for (let i = 0; i < this.grid.length; i++) {
      if (!this.grid[i]) {
        this.grid[i] = [];
      } else {
        this.grid[i].length = 0; // 清空数组但保持引用
      }
    }
  }

  /**
   * 快速获取网格索引
   * @param {number} x - X坐标
   * @param {number} y - Y坐标
   * @returns {number} 网格索引
   */
  getGridIndex(x, y) {
    const col = Math.floor(x * this.cellSizeInv);
    const row = Math.floor(y * this.cellSizeInv);

    // 边界检查
    if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) {
      return -1;
    }

    return row * this.cols + col;
  }

  /**
   * 将粒子添加到对应网格
   * @param {Object} particle - 粒子对象
   * @param {number} index - 粒子索引
   */
  addParticle(particle, index) {
    const gridIndex = this.getGridIndex(particle.x, particle.y);
    if (gridIndex >= 0 && gridIndex < this.grid.length) {
      this.grid[gridIndex].push({ particle, index });
    }
  }

  /**
   * 获取相邻网格的粒子（包括当前网格）
   * @param {number} x - X坐标
   * @param {number} y - Y坐标
   * @returns {Array} 相邻网格中的粒子数组
   */
  getNearbyParticles(x, y) {
    const col = Math.floor(x * this.cellSizeInv);
    const row = Math.floor(y * this.cellSizeInv);
    const nearbyParticles = [];

    // 检查3x3网格区域（当前格子及其8个相邻格子）
    for (let dRow = -1; dRow <= 1; dRow++) {
      for (let dCol = -1; dCol <= 1; dCol++) {
        const checkCol = col + dCol;
        const checkRow = row + dRow;

        // 边界检查
        if (checkCol >= 0 && checkCol < this.cols &&
            checkRow >= 0 && checkRow < this.rows) {

          const gridIndex = checkRow * this.cols + checkCol;
          const cell = this.grid[gridIndex];

          // 将该网格中的所有粒子添加到结果数组
          for (let i = 0; i < cell.length; i++) {
            nearbyParticles.push(cell[i]);
          }
        }
      }
    }

    return nearbyParticles;
  }

  /**
   * 更新网格尺寸
   * @param {number} width - 新宽度
   * @param {number} height - 新高度
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.cols = Math.ceil(width / this.cellSize);
    this.rows = Math.ceil(height / this.cellSize);

    // 重新分配网格数组
    const newSize = this.cols * this.rows;
    if (newSize !== this.grid.length) {
      this.grid = new Array(newSize);
      this.clearGrid();
    }
  }

  /**
   * 获取网格统计信息（用于性能调试）
   */
  getStats() {
    let totalParticles = 0;
    let nonEmptyCells = 0;
    let maxCellSize = 0;

    for (let i = 0; i < this.grid.length; i++) {
      const cellSize = this.grid[i].length;
      totalParticles += cellSize;
      if (cellSize > 0) {
        nonEmptyCells++;
        maxCellSize = Math.max(maxCellSize, cellSize);
      }
    }

    return {
      totalCells: this.grid.length,
      nonEmptyCells,
      totalParticles,
      maxCellSize,
      avgParticlesPerCell: totalParticles / Math.max(nonEmptyCells, 1),
      cellSize: this.cellSize,
      dimensions: `${this.cols}x${this.rows}`
    };
  }
}

/**
 * 优化的粒子连接检测器
 * 使用空间分割减少计算复杂度
 */
class ParticleConnectionOptimizer {
  constructor(width, height, maxDistance) {
    // 网格大小设为最大连接距离，确保只需检查相邻网格
    this.maxDistance = maxDistance;
    this.maxDistanceSquared = maxDistance * maxDistance;

    // 动态计算最佳网格大小
    this.cellSize = Math.max(maxDistance, 100); // 最小网格尺寸100px
    this.spatialGrid = new SpatialGrid(width, height, this.cellSize);

    // 性能统计
    this.stats = {
      comparisons: 0,
      connections: 0,
      lastFrameComparisons: 0,
      efficiency: 0
    };
  }

  /**
   * 更新最大连接距离
   * @param {number} newMaxDistance - 新的最大距离
   */
  updateMaxDistance(newMaxDistance) {
    this.maxDistance = newMaxDistance;
    this.maxDistanceSquared = newMaxDistance * newMaxDistance;

    // 如果距离变化较大，重新计算网格大小
    const newCellSize = Math.max(newMaxDistance, 100);
    if (Math.abs(newCellSize - this.cellSize) > 50) {
      this.cellSize = newCellSize;
      this.spatialGrid = new SpatialGrid(
        this.spatialGrid.width,
        this.spatialGrid.height,
        this.cellSize
      );
    }
  }

  /**
   * 优化的连接检测算法
   * @param {Array} particles - 粒子数组
   * @param {Function} connectionCallback - 连接创建回调函数
   * @param {number} maxConnections - 最大连接数
   */
  findConnections(particles, connectionCallback, maxConnections = 200) {
    // 重置统计
    this.stats.comparisons = 0;
    this.stats.connections = 0;

    // 清空并重新填充网格
    this.spatialGrid.clearGrid();

    // 将所有粒子添加到网格
    for (let i = 0; i < particles.length; i++) {
      this.spatialGrid.addParticle(particles[i], i);
    }

    let connectionCount = 0;

    // 对每个粒子，只检查相邻网格中的粒子
    for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
      const p1 = particles[i];
      const nearbyParticles = this.spatialGrid.getNearbyParticles(p1.x, p1.y);

      for (let j = 0; j < nearbyParticles.length && connectionCount < maxConnections; j++) {
        const nearbyData = nearbyParticles[j];
        const p2 = nearbyData.particle;
        const p2Index = nearbyData.index;

        // 避免重复检查和自己与自己的连接
        if (p2Index <= i) continue;

        this.stats.comparisons++;

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSquared = dx * dx + dy * dy;

        if (distSquared <= this.maxDistanceSquared) {
          // 调用连接创建回调
          connectionCallback(p1, p2, distSquared);
          connectionCount++;
          this.stats.connections++;
        }
      }
    }

    // 计算效率指标
    const naiveComparisons = (particles.length * (particles.length - 1)) / 2;
    this.stats.efficiency = naiveComparisons > 0 ?
      (1 - this.stats.comparisons / naiveComparisons) * 100 : 0;

    this.stats.lastFrameComparisons = this.stats.comparisons;
  }

  /**
   * 更新网格尺寸
   */
  resize(width, height) {
    this.spatialGrid.resize(width, height);
  }

  /**
   * 获取性能统计信息
   */
  getPerformanceStats() {
    return {
      ...this.stats,
      gridStats: this.spatialGrid.getStats(),
      cellSize: this.cellSize,
      maxDistance: this.maxDistance
    };
  }

  /**
   * 打印性能报告
   */
  printPerformanceReport() {
    const stats = this.getPerformanceStats();
    console.group('🚀 Spatial Partitioning Performance Report');
    console.log('🔧 Grid Configuration:', {
      'Cell Size': `${stats.cellSize}px`,
      'Grid Dimensions': stats.gridStats.dimensions,
      'Total Cells': stats.gridStats.totalCells,
      'Active Cells': stats.gridStats.nonEmptyCells
    });
    console.log('⚡ Performance Metrics:', {
      'Comparisons This Frame': stats.lastFrameComparisons,
      'Connections Found': stats.connections,
      'Efficiency Gain': `${stats.efficiency.toFixed(1)}%`,
      'Avg Particles/Cell': stats.gridStats.avgParticlesPerCell.toFixed(1)
    });
    console.groupEnd();
  }
}

// 导出主要类和便捷函数
export { SpatialGrid, ParticleConnectionOptimizer };

// 创建全局优化器实例的工厂函数
export const createConnectionOptimizer = (width, height, maxDistance) => {
  return new ParticleConnectionOptimizer(width, height, maxDistance);
};

export default ParticleConnectionOptimizer;