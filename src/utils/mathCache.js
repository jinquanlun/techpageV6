/**
 * 高性能数学函数缓存系统
 * 预计算和缓存常用的数学函数结果，避免重复计算
 */

class MathCache {
  constructor() {
    // 预计算表的精度和范围配置
    this.PRECISION = 1000; // 每度1000个值，提供0.001弧度精度
    this.MAX_ANGLE = Math.PI * 2; // 完整圆周
    this.STEP = this.MAX_ANGLE / (this.PRECISION * 360);

    // 预计算的查找表
    this.sinTable = new Float32Array(this.PRECISION * 360);
    this.cosTable = new Float32Array(this.PRECISION * 360);

    // 动态缓存 - 使用Map实现LRU
    this.dynamicCache = new Map();
    this.maxCacheSize = 1000;

    // 初始化预计算表
    this.initializeTables();
  }

  /**
   * 初始化预计算的sin/cos查找表
   */
  initializeTables() {
    console.log('Initializing math lookup tables...');
    const startTime = performance.now();

    for (let i = 0; i < this.sinTable.length; i++) {
      const angle = i * this.STEP;
      this.sinTable[i] = Math.sin(angle);
      this.cosTable[i] = Math.cos(angle);
    }

    const initTime = performance.now() - startTime;
    console.log(`Math tables initialized in ${initTime.toFixed(2)}ms`);
  }

  /**
   * 快速sin函数 - 使用查找表
   * @param {number} angle - 角度（弧度）
   * @returns {number} sin值
   */
  fastSin(angle) {
    // 标准化角度到 [0, 2π] 范围
    const normalizedAngle = ((angle % this.MAX_ANGLE) + this.MAX_ANGLE) % this.MAX_ANGLE;
    const index = Math.round(normalizedAngle / this.STEP);
    return this.sinTable[index] || Math.sin(angle);
  }

  /**
   * 快速cos函数 - 使用查找表
   * @param {number} angle - 角度（弧度）
   * @returns {number} cos值
   */
  fastCos(angle) {
    // 标准化角度到 [0, 2π] 范围
    const normalizedAngle = ((angle % this.MAX_ANGLE) + this.MAX_ANGLE) % this.MAX_ANGLE;
    const index = Math.round(normalizedAngle / this.STEP);
    return this.cosTable[index] || Math.cos(angle);
  }

  /**
   * 快速sqrt函数 - 使用缓存和近似算法
   * @param {number} value - 输入值
   * @returns {number} 平方根
   */
  fastSqrt(value) {
    // 对于小整数，使用缓存
    if (value >= 0 && value <= 10000 && value === Math.floor(value)) {
      const key = `sqrt_${value}`;
      if (this.dynamicCache.has(key)) {
        return this.dynamicCache.get(key);
      }

      const result = Math.sqrt(value);
      this.setCache(key, result);
      return result;
    }

    // 对于其他值，直接计算
    return Math.sqrt(value);
  }

  /**
   * 快速距离计算 - 优化的欧几里得距离
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @returns {number} 距离
   */
  fastDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distanceSquared = dx * dx + dy * dy;

    // 使用快速平方根
    return this.fastSqrt(distanceSquared);
  }

  /**
   * 距离平方计算 - 避免开方运算
   * 在只需要比较距离时使用
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @returns {number} 距离的平方
   */
  distanceSquared(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return dx * dx + dy * dy;
  }

  /**
   * 线性插值 - 高度优化版本
   * @param {number} start
   * @param {number} end
   * @param {number} factor
   * @returns {number}
   */
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  /**
   * 平滑步长函数 - 用于动画缓动
   * @param {number} t - 0到1之间的值
   * @returns {number} 平滑后的值
   */
  smoothStep(t) {
    return t * t * (3 - 2 * t);
  }

  /**
   * 随机数缓存 - 预生成随机数提高性能
   */
  initRandomCache() {
    this.randomCache = new Float32Array(10000);
    for (let i = 0; i < this.randomCache.length; i++) {
      this.randomCache[i] = Math.random();
    }
    this.randomIndex = 0;
  }

  /**
   * 快速随机数获取
   * @returns {number} 0-1之间的随机数
   */
  fastRandom() {
    if (!this.randomCache) {
      this.initRandomCache();
    }

    const value = this.randomCache[this.randomIndex];
    this.randomIndex = (this.randomIndex + 1) % this.randomCache.length;
    return value;
  }

  /**
   * 设置动态缓存（带LRU清理）
   * @param {string} key
   * @param {number} value
   */
  setCache(key, value) {
    if (this.dynamicCache.size >= this.maxCacheSize) {
      // LRU清理：删除最旧的条目
      const firstKey = this.dynamicCache.keys().next().value;
      this.dynamicCache.delete(firstKey);
    }

    this.dynamicCache.set(key, value);
  }

  /**
   * 清理缓存
   */
  clearCache() {
    this.dynamicCache.clear();
  }

  /**
   * 获取缓存统计信息
   */
  getCacheStats() {
    return {
      tableSize: this.sinTable.length,
      dynamicCacheSize: this.dynamicCache.size,
      maxCacheSize: this.maxCacheSize,
      randomCacheSize: this.randomCache?.length || 0
    };
  }
}

// 创建全局单例
const mathCache = new MathCache();

// 导出便捷函数
export const fastSin = (angle) => mathCache.fastSin(angle);
export const fastCos = (angle) => mathCache.fastCos(angle);
export const fastSqrt = (value) => mathCache.fastSqrt(value);
export const fastDistance = (x1, y1, x2, y2) => mathCache.fastDistance(x1, y1, x2, y2);
export const distanceSquared = (x1, y1, x2, y2) => mathCache.distanceSquared(x1, y1, x2, y2);
export const lerp = (start, end, factor) => mathCache.lerp(start, end, factor);
export const smoothStep = (t) => mathCache.smoothStep(t);
export const fastRandom = () => mathCache.fastRandom();

// 导出类实例用于高级功能
export default mathCache;