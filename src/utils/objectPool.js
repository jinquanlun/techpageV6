/**
 * 高性能全局对象池化系统
 * 通过预分配和复用对象来减少内存分配和垃圾回收
 */

class ObjectPool {
  constructor(createFn, resetFn, initialSize = 100, maxSize = 1000) {
    this.createFn = createFn;     // 创建新对象的函数
    this.resetFn = resetFn;       // 重置对象状态的函数
    this.pool = [];               // 可用对象池
    this.active = new Set();      // 活跃对象集合
    this.maxSize = maxSize;       // 池最大容量
    this.created = 0;             // 总创建数量统计
    this.reused = 0;              // 复用次数统计

    // 预分配对象
    this.preallocate(initialSize);
  }

  /**
   * 预分配指定数量的对象
   */
  preallocate(count) {
    for (let i = 0; i < count; i++) {
      this.pool.push(this.createFn());
      this.created++;
    }
  }

  /**
   * 获取对象 - 从池中取出或创建新的
   */
  acquire() {
    let obj;

    if (this.pool.length > 0) {
      obj = this.pool.pop();
      this.reused++;
    } else {
      obj = this.createFn();
      this.created++;
    }

    this.active.add(obj);
    return obj;
  }

  /**
   * 释放对象 - 重置后放回池中
   */
  release(obj) {
    if (!this.active.has(obj)) {
      console.warn('Attempting to release object not from this pool');
      return;
    }

    this.active.delete(obj);

    // 重置对象状态
    if (this.resetFn) {
      this.resetFn(obj);
    }

    // 如果池未满，放回池中
    if (this.pool.length < this.maxSize) {
      this.pool.push(obj);
    }
    // 否则让对象被垃圾回收
  }

  /**
   * 批量释放对象
   */
  releaseAll() {
    for (const obj of this.active) {
      if (this.resetFn) {
        this.resetFn(obj);
      }
      if (this.pool.length < this.maxSize) {
        this.pool.push(obj);
      }
    }
    this.active.clear();
  }

  /**
   * 清理池 - 释放所有对象
   */
  clear() {
    this.pool.length = 0;
    this.active.clear();
  }

  /**
   * 获取池统计信息
   */
  getStats() {
    return {
      poolSize: this.pool.length,
      activeCount: this.active.size,
      totalCreated: this.created,
      totalReused: this.reused,
      reuseRatio: this.created > 0 ? (this.reused / this.created).toFixed(2) : 0
    };
  }
}

/**
 * 全局对象池管理器
 */
class PoolManager {
  constructor() {
    this.pools = new Map();
    this.totalMemorySaved = 0;
  }

  /**
   * 创建或获取对象池
   */
  createPool(name, createFn, resetFn, initialSize = 100, maxSize = 1000) {
    if (this.pools.has(name)) {
      return this.pools.get(name);
    }

    const pool = new ObjectPool(createFn, resetFn, initialSize, maxSize);
    this.pools.set(name, pool);
    return pool;
  }

  /**
   * 获取对象池
   */
  getPool(name) {
    return this.pools.get(name);
  }

  /**
   * 从指定池获取对象
   */
  acquire(poolName) {
    const pool = this.pools.get(poolName);
    if (!pool) {
      throw new Error(`Pool '${poolName}' not found`);
    }
    return pool.acquire();
  }

  /**
   * 释放对象到指定池
   */
  release(poolName, obj) {
    const pool = this.pools.get(poolName);
    if (!pool) {
      throw new Error(`Pool '${poolName}' not found`);
    }
    pool.release(obj);
  }

  /**
   * 清理所有池
   */
  clearAll() {
    for (const pool of this.pools.values()) {
      pool.clear();
    }
  }

  /**
   * 获取所有池的统计信息
   */
  getAllStats() {
    const stats = {};
    for (const [name, pool] of this.pools.entries()) {
      stats[name] = pool.getStats();
    }
    return stats;
  }

  /**
   * 打印性能报告
   */
  printReport() {
    console.group('🔋 Object Pool Performance Report');
    const allStats = this.getAllStats();

    for (const [poolName, stats] of Object.entries(allStats)) {
      console.log(`📊 ${poolName}:`, {
        'Pool Size': stats.poolSize,
        'Active Objects': stats.activeCount,
        'Total Created': stats.totalCreated,
        'Total Reused': stats.totalReused,
        'Reuse Ratio': `${stats.reuseRatio}%`,
        'Memory Efficiency': stats.totalReused > 0 ? '✅ Excellent' : '⚠️ Needs optimization'
      });
    }

    console.groupEnd();
  }
}

// 创建全局池管理器实例
const poolManager = new PoolManager();

// 预定义的常用对象池工厂函数

/**
 * 粒子连接对象池
 */
const createConnectionPool = () => {
  return poolManager.createPool(
    'particleConnections',
    () => ({
      x1: 0, y1: 0, x2: 0, y2: 0,
      opacity: 0, lineWidth: 0, active: false
    }),
    (obj) => {
      obj.active = false;
      obj.opacity = 0;
      obj.lineWidth = 0;
    },
    500, 2000
  );
};

/**
 * 2D向量对象池
 */
const createVector2Pool = () => {
  return poolManager.createPool(
    'vector2',
    () => ({ x: 0, y: 0 }),
    (obj) => {
      obj.x = 0;
      obj.y = 0;
    },
    200, 1000
  );
};

/**
 * 3D向量对象池
 */
const createVector3Pool = () => {
  return poolManager.createPool(
    'vector3',
    () => ({ x: 0, y: 0, z: 0 }),
    (obj) => {
      obj.x = 0;
      obj.y = 0;
      obj.z = 0;
    },
    200, 1000
  );
};

/**
 * 颜色对象池
 */
const createColorPool = () => {
  return poolManager.createPool(
    'color',
    () => ({ r: 0, g: 0, b: 0, a: 1 }),
    (obj) => {
      obj.r = 0;
      obj.g = 0;
      obj.b = 0;
      obj.a = 1;
    },
    100, 500
  );
};

/**
 * 边界框对象池
 */
const createBoundingBoxPool = () => {
  return poolManager.createPool(
    'boundingBox',
    () => ({ minX: 0, minY: 0, maxX: 0, maxY: 0 }),
    (obj) => {
      obj.minX = 0;
      obj.minY = 0;
      obj.maxX = 0;
      obj.maxY = 0;
    },
    50, 200
  );
};

/**
 * 动画关键帧对象池
 */
const createKeyframePool = () => {
  return poolManager.createPool(
    'keyframe',
    () => ({ time: 0, value: 0, easing: 'linear' }),
    (obj) => {
      obj.time = 0;
      obj.value = 0;
      obj.easing = 'linear';
    },
    100, 500
  );
};

// 初始化常用对象池
const initializeCommonPools = () => {
  console.log('🚀 Initializing object pools...');
  const startTime = performance.now();

  createConnectionPool();
  createVector2Pool();
  createVector3Pool();
  createColorPool();
  createBoundingBoxPool();
  createKeyframePool();

  const initTime = performance.now() - startTime;
  console.log(`✅ Object pools initialized in ${initTime.toFixed(2)}ms`);
};

// 便捷的获取函数
export const acquireConnection = () => poolManager.acquire('particleConnections');
export const releaseConnection = (obj) => poolManager.release('particleConnections', obj);

export const acquireVector2 = () => poolManager.acquire('vector2');
export const releaseVector2 = (obj) => poolManager.release('vector2', obj);

export const acquireVector3 = () => poolManager.acquire('vector3');
export const releaseVector3 = (obj) => poolManager.release('vector3', obj);

export const acquireColor = () => poolManager.acquire('color');
export const releaseColor = (obj) => poolManager.release('color', obj);

export const acquireBoundingBox = () => poolManager.acquire('boundingBox');
export const releaseBoundingBox = (obj) => poolManager.release('boundingBox', obj);

export const acquireKeyframe = () => poolManager.acquire('keyframe');
export const releaseKeyframe = (obj) => poolManager.release('keyframe', obj);

// 导出主要接口
export { ObjectPool, poolManager, initializeCommonPools };
export default poolManager;