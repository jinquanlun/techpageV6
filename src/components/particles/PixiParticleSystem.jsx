import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { fastSinCached, fastCosCached, getPooledRandom } from '../../utils/performanceOptimizations.js';
import { fastSqrt } from '../../utils/simpleMath.js';
import { acquireConnection, releaseConnection, initializeCommonPools } from '../../utils/simplePool.js';

/**
 * PixiJS高性能粒子系统
 * 保持与Canvas 2D版本完全一致的视觉效果，但使用GPU加速
 */
const PixiParticleSystem = () => {
  const containerRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 初始化对象池
    initializeCommonPools();

    let onMobile = window.innerWidth < 768;
    let isTabVisible = true;
    let fps = 60;
    let frameCount = 0;
    let lastTime = performance.now();
    const fpsCheckInterval = 30;

    // 创建PixiJS应用 - 配置与Canvas 2D相同
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1a1d24, // PEF默认背景色
      backgroundAlpha: 0.3,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true
    });
    
    // 等待应用初始化完成
    (async () => {
      await app.init();
      if (!containerRef.current) return;
      
      containerRef.current.appendChild(app.canvas);
      appRef.current = app;

      // 粒子容器 - 使用ParticleContainer以获得最佳性能
      const particlesContainer = new PIXI.Container();
      app.stage.addChild(particlesContainer);

      // 连接线图形容器
      const connectionsGraphics = new PIXI.Graphics();
      app.stage.addChild(connectionsGraphics);

      // 创建粒子纹理 - 双层圆形（外层+内层）
      const createParticleTexture = () => {
        const graphics = new PIXI.Graphics();
        
        // 外层圆 - rgba(255,255,255,0.95)
        graphics.beginFill(0xFFFFFF, 0.95);
        graphics.drawCircle(0, 0, 1.5);
        graphics.endFill();
        
        // 内层圆 - 纯白色
        graphics.beginFill(0xFFFFFF, 1.0);
        graphics.drawCircle(0, 0, 0.9);
        graphics.endFill();

        return app.renderer.generateTexture(graphics);
      };

      const particleTexture = createParticleTexture();

      // 粒子数量计算 - 与Canvas版本相同
      const getOptimalParticleCount = (targetFps = 30) => {
        const base = onMobile ? window.innerWidth / 130 : window.innerWidth / 70;
        let optimal = Math.floor(base);

        if (fps < targetFps) {
          optimal = Math.max(optimal * 0.7, onMobile ? 8 : 15);
        } else if (fps > 50) {
          optimal = Math.min(optimal * 1.2, onMobile ? 25 : 45);
        }

        if (optimal < (onMobile ? 8 : 15)) optimal = onMobile ? 8 : 15;
        if (optimal > (onMobile ? 25 : 45)) optimal = onMobile ? 25 : 45;

        return Math.floor(optimal);
      };

      const getOptimalDistance = () => {
        const base = window.innerWidth / 5;
        const fpsMultiplier = fps < 30 ? 0.8 : (fps > 50 ? 1.2 : 1.0);
        let dist = base * fpsMultiplier;

        if (dist < 180) dist = 180;
        else if (dist > 300) dist = 300;
        return dist;
      };

      let particleNum = getOptimalParticleCount();
      let minDist = getOptimalDistance();
      const MAX_CONNECTIONS = 200;
      let activeConnections = [];
      let cachedTime = 0;

      // 粒子数据类 - 与Canvas版本相同
      class ParticleData {
        constructor(index) {
          this.x = index * (window.innerWidth / particleNum);
          this.y = getPooledRandom() * window.innerHeight;
          this.vy = (getPooledRandom() * -1) / 3;
        }

        updatePosition() {
          // 位置更新逻辑保持一致
        }
      }

      // 创建粒子精灵数组
      let particles = [];
      let particleData = [];

      const initParticles = () => {
        // 清除旧粒子
        particles.forEach(sprite => sprite.destroy());
        particles = [];
        particleData = [];

        // 创建新粒子
        for (let i = 0; i < particleNum; i++) {
          const data = new ParticleData(i);
          const sprite = new PIXI.Sprite(particleTexture);
          
          sprite.x = data.x;
          sprite.y = data.y;
          sprite.anchor.set(0.5);
          
          particlesContainer.addChild(sprite);
          particles.push(sprite);
          particleData.push(data);
        }
      };

      initParticles();

      // Tab可见性检测
      const handleVisibilityChange = () => {
        isTabVisible = !document.hidden;
        if (isTabVisible) {
          app.ticker.start();
        } else {
          app.ticker.stop();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      // 主动画循环
      app.ticker.add(() => {
        if (!isTabVisible) return;

        // 更新粒子位置 - 与Canvas版本完全相同的逻辑
        const now = Date.now();
        cachedTime = now * 0.0008;

        const amplitude = onMobile ? window.innerWidth / 25 : window.innerWidth / 18;
        const theta = cachedTime;
        const dx = (Math.PI * 2) / particleNum;

        for (let i = 0; i < particleData.length; i++) {
          const data = particleData[i];
          const sprite = particles[i];

          if (!onMobile) {
            const waveOffset = i * dx;
            const speedVariation = 1 + (i % 3) * 0.2;

            if (i % 3 === 0) {
              data.y = window.innerHeight * 0.3 + fastSinCached(theta * speedVariation + waveOffset) * amplitude;
            } else if (i % 3 === 1) {
              data.y = window.innerHeight * 0.5 + fastCosCached(theta * speedVariation + waveOffset) * amplitude * 0.8;
            } else {
              data.y = window.innerHeight * 0.7 + fastSinCached(theta * speedVariation + waveOffset + Math.PI/3) * amplitude * 0.6;
            }
          } else {
            data.y += data.vy;
            if (data.y > window.innerHeight || data.y < 0) {
              data.vy = -data.vy;
            }
          }

          // 边界检测
          if (data.x + 1.5 > window.innerWidth) data.x = 1.5;
          else if (data.x - 1.5 < 0) data.x = window.innerWidth - 1.5;
          if (data.y + 1.5 > window.innerHeight) data.y = 1.5;
          else if (data.y - 1.5 < 0) data.y = window.innerHeight - 1.5;

          // 更新精灵位置
          sprite.x = Math.round(data.x);
          sprite.y = Math.round(data.y);
        }

        // 计算并绘制连接线
        connectionsGraphics.clear();
        
        // 检测背景颜色（HPH还是PEF）
        const currentSection = document.querySelector('.skw-page.active')?.classList.contains('skw-page-1') ? 'hph' : 'pef';
        
        // 清除旧连接
        for (const conn of activeConnections) {
          releaseConnection(conn);
        }
        activeConnections = [];

        const maxDistSquared = minDist * minDist;
        const len = particleData.length;

        for (let i = 0; i < len && activeConnections.length < MAX_CONNECTIONS; i++) {
          const p1 = particleData[i];

          for (let j = i + 1; j < len && activeConnections.length < MAX_CONNECTIONS; j++) {
            const p2 = particleData[j];

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSquared = dx * dx + dy * dy;

            if (distSquared <= maxDistSquared) {
              const conn = acquireConnection();
              const dist = fastSqrt(distSquared);
              const distRatio = 1 - dist / minDist;

              conn.x1 = Math.round(p1.x);
              conn.y1 = Math.round(p1.y);
              conn.x2 = Math.round(p2.x);
              conn.y2 = Math.round(p2.y);
              conn.opacity = Math.max(0.3, 0.9 * distRatio);
              conn.lineWidth = Math.max(1.0, 2.0 * distRatio);
              conn.active = true;

              activeConnections.push(conn);
            }
          }
        }

        // 绘制连接线
        for (const conn of activeConnections) {
          if (conn.active) {
            connectionsGraphics.lineStyle(conn.lineWidth, 0xFFFFFF, conn.opacity);
            connectionsGraphics.moveTo(conn.x1, conn.y1);
            connectionsGraphics.lineTo(conn.x2, conn.y2);
          }
        }

        // FPS监控和自适应调整
        frameCount++;
        if (frameCount >= fpsCheckInterval) {
          const currentTime = performance.now();
          const deltaTime = currentTime - lastTime;
          fps = Math.round((frameCount * 1000) / deltaTime);
          frameCount = 0;
          lastTime = currentTime;

          const newParticleNum = getOptimalParticleCount();
          if (newParticleNum !== particleNum) {
            particleNum = newParticleNum;
            initParticles();
          }

          minDist = getOptimalDistance();
        }
      });

      // 窗口大小调整
      const handleResize = () => {
        onMobile = window.innerWidth < 768;
        app.renderer.resize(window.innerWidth, window.innerHeight);
        
        particleNum = getOptimalParticleCount();
        minDist = getOptimalDistance();
        
        initParticles();
      };

      window.addEventListener('resize', handleResize);
    })();

    // 清理函数
    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true, texture: true, baseTexture: true });
        appRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default PixiParticleSystem;

