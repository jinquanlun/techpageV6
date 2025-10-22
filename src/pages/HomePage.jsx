import { useEffect, useRef, useState, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { hphCategories, pefCategories } from '../config/techCategories.js';
import { fastSin, fastCos, fastSqrt } from '../utils/simpleMath.js';
import { acquireConnection, releaseConnection, initializeCommonPools } from '../utils/simplePool.js';
import { getCachedColor, getPooledRandom, getCachedTime, getParticleColor, fastSinCached, fastCosCached } from '../utils/performanceOptimizations.js';
import '../styles/pages/HomePage.css';
import '../styles/pages/TechShowcasePage.css';

// 技术展示组件
const TechSection = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [focusedSection, setFocusedSection] = useState('pef');
  const [scrolling, setScrolling] = useState(false);
  const [internalStep, setInternalStep] = useState(0);

  const [hphSelectedCategory, setHphSelectedCategory] = useState(null);
  const [hphShowCategory, setHphShowCategory] = useState(false);
  const [pefSelectedCategory, setPefSelectedCategory] = useState(null);
  const [pefShowCategory, setPefShowCategory] = useState(false);

  const [categoryAnimating, setCategoryAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const animTime = 2000;
  const canvasRef = useRef(null);

  // 处理从详情页返回时的导航状态
  useEffect(() => {
    const state = location.state;
    // 只有从详情页返回时才更新状态
    if (state?.targetSection && state?.fromDetailPage) {
      setFocusedSection(state.targetSection);
      // 根据targetSection设置正确的internalStep
      if (state.targetSection === 'hph') {
        setInternalStep(1);
      } else if (state.targetSection === 'pef') {
        setInternalStep(0);
      }
    }
  }, [location.state]);

  // 监听屏幕尺寸变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 粒子动画系统（简化版）
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false
    });
    if (!ctx) return;

    let mainAnimationId;
    let mainParticles = [];
    let onMobile = window.innerWidth < 768;

    let isTabVisible = true;
    let lastRenderTime = 0;
    const TARGET_FRAME_TIME = 1000 / 60;

    let fps = 60;
    let frameCount = 0;
    let lastTime = performance.now();
    let fpsCheckInterval = 30;

    const PARTICLE_OUTER_COLOR = "rgba(255,255,255,0.95)";
    const PARTICLE_INNER_COLOR = "#ffffff";
    const BG_COLOR_HPH = "rgba(10, 10, 10, 0.3)";
    const BG_COLOR_PEF = "rgba(26, 29, 36, 0.3)";

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (!isTabVisible) {
        cancelAnimationFrame(mainAnimationId);
      } else {
        draw();
      }
    };

    initializeCommonPools();

    const MAX_CONNECTIONS = 200;
    let activeConnections = [];

    let cachedTime = 0;

    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    resizeCanvas();

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

    let particleNum = getOptimalParticleCount();

    const getOptimalDistance = () => {
      const base = window.innerWidth / 5;
      const fpsMultiplier = fps < 30 ? 0.8 : (fps > 50 ? 1.2 : 1.0);
      let dist = base * fpsMultiplier;

      if (dist < 180) dist = 180;
      else if (dist > 300) dist = 300;
      return dist;
    };

    let minDist = getOptimalDistance();

    class Particle {
      constructor(index) {
        this.x = index * (window.innerWidth / particleNum);
        this.y = getPooledRandom() * window.innerHeight;
        this.vy = (getPooledRandom() * -1) / 3;
        this.radius = 1.5;
        this.innerRadius = 0.9;
        this.intX = Math.round(this.x);
        this.intY = Math.round(this.y);

        this.radiusPi2 = Math.PI * 2;
        this.innerRadiusPi2 = Math.PI * 2;
      }

      updatePosition() {
        this.intX = Math.round(this.x);
        this.intY = Math.round(this.y);
      }
    }

    const initParticles = () => {
      mainParticles = [];
      for (let i = 0; i < particleNum; i++) {
        mainParticles.push(new Particle(i));
      }
    };

    initParticles();

    const paintCanvas = () => {
      if (!ctx) return;
      const currentSection = document.querySelector('.skw-page.active')?.classList.contains('skw-page-1') ? 'hph' : 'pef';
      const bgColor = currentSection === 'hph' ? BG_COLOR_HPH : BG_COLOR_PEF;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const update = () => {
      const now = Date.now();
      cachedTime = now * 0.0008;

      const amplitude = onMobile ? window.innerWidth / 25 : window.innerWidth / 18;
      let theta = cachedTime;
      const dx = (Math.PI * 2) / particleNum;
      frameCount++;

      for (let i = 0; i < mainParticles.length; i++) {
        const p = mainParticles[i];

        if (!onMobile) {
          const waveOffset = i * dx;
          const speedVariation = 1 + (i % 3) * 0.2;

          if (i % 3 === 0) {
            p.y = window.innerHeight * 0.3 + fastSinCached(theta * speedVariation + waveOffset) * amplitude;
          } else if (i % 3 === 1) {
            p.y = window.innerHeight * 0.5 + fastCosCached(theta * speedVariation + waveOffset) * amplitude * 0.8;
          } else {
            p.y = window.innerHeight * 0.7 + fastSinCached(theta * speedVariation + waveOffset + Math.PI/3) * amplitude * 0.6;
          }
        } else {
          p.y += p.vy;
          if (p.y > window.innerHeight || p.y < 0) {
            p.vy = -p.vy;
          }
        }

        if (p.x + p.radius > window.innerWidth) p.x = p.radius;
        else if (p.x - p.radius < 0) p.x = window.innerWidth - p.radius;
        if (p.y + p.radius > window.innerHeight) p.y = p.radius;
        else if (p.y - p.radius < 0) p.y = window.innerHeight - p.radius;

        p.updatePosition();
      }

      const maxDistSquared = minDist * minDist;

      for (const conn of activeConnections) {
        releaseConnection(conn);
      }
      activeConnections = [];

      const len = mainParticles.length;
      for (let i = 0; i < len && activeConnections.length < MAX_CONNECTIONS; i++) {
        const p1 = mainParticles[i];

        for (let j = i + 1; j < len && activeConnections.length < MAX_CONNECTIONS; j++) {
          const p2 = mainParticles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSquared = dx * dx + dy * dy;

          if (distSquared <= maxDistSquared) {
            const conn = acquireConnection();
            const dist = fastSqrt(distSquared);
            const distRatio = 1 - dist / minDist;

            conn.x1 = p1.intX;
            conn.y1 = p1.intY;
            conn.x2 = p2.intX;
            conn.y2 = p2.intY;
            conn.opacity = Math.max(0.3, 0.9 * distRatio);
            conn.lineWidth = Math.max(1.0, 2.0 * distRatio);
            conn.active = true;

            activeConnections.push(conn);
          }
        }
      }
    };

    const draw = () => {
      const currentTime = performance.now();

      if (!isTabVisible) {
        setTimeout(() => {
          if (isTabVisible) draw();
        }, 100);
        return;
      }

      if (currentTime - lastRenderTime < TARGET_FRAME_TIME) {
        mainAnimationId = requestAnimationFrame(draw);
        return;
      }
      lastRenderTime = currentTime;

      paintCanvas();

      for (const conn of activeConnections) {
        if (conn.active) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${conn.opacity})`;
          ctx.lineWidth = conn.lineWidth;
          ctx.moveTo(conn.x1, conn.y1);
          ctx.lineTo(conn.x2, conn.y2);
          ctx.stroke();
        }
      }

      ctx.fillStyle = PARTICLE_OUTER_COLOR;
      ctx.beginPath();
      for (let i = 0; i < mainParticles.length; i++) {
        const p = mainParticles[i];
        ctx.moveTo(p.intX + p.radius, p.intY);
        ctx.arc(p.intX, p.intY, p.radius, 0, Math.PI * 2);
      }
      ctx.fill();

      ctx.fillStyle = PARTICLE_INNER_COLOR;
      ctx.beginPath();
      for (let i = 0; i < mainParticles.length; i++) {
        const p = mainParticles[i];
        ctx.moveTo(p.intX + p.innerRadius, p.intY);
        ctx.arc(p.intX, p.intY, p.innerRadius, 0, Math.PI * 2);
      }
      ctx.fill();

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

      update();
      mainAnimationId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      onMobile = window.innerWidth < 768;
      resizeCanvas();

      particleNum = getOptimalParticleCount();
      minDist = getOptimalDistance();

      initParticles();
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    draw();

    return () => {
      if (mainAnimationId) {
        cancelAnimationFrame(mainAnimationId);
        mainAnimationId = null;
      }

      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      mainParticles.length = 0;
      mainParticles = null;

      for (const conn of activeConnections) {
        releaseConnection(conn);
      }
      activeConnections = [];

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, []);

  // 处理分类点击
  const handleCategoryClick = (category, section) => {
    setCategoryAnimating(true);
    setAnimationKey(prev => prev + 1);

    if (section === 'hph') {
      setHphSelectedCategory(category);
      setHphShowCategory(true);
    } else {
      setPefSelectedCategory(category);
      setPefShowCategory(true);
    }

    setTimeout(() => {
      setCategoryAnimating(false);
    }, 1000);
  };

  const handleMainPageClick = () => {
    setHphShowCategory(false);
    setHphSelectedCategory(null);
    setPefShowCategory(false);
    setPefSelectedCategory(null);
    setCategoryAnimating(false);
  };

  // 滚动处理
  useEffect(() => {
    const handleWheel = (e) => {
      if (scrolling || hphShowCategory || pefShowCategory || categoryAnimating) return;

      const techSection = document.querySelector('.tech-section');
      if (!techSection) return;

      const rect = techSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const isInTechSection = rect.top <= 100 && rect.bottom >= windowHeight - 50;

      if (isInTechSection) {
        if (e.deltaY > 0) {
          if (internalStep === 0) {
            e.preventDefault();
            e.stopPropagation();
            setInternalStep(1);
            setFocusedSection('hph');
            setScrolling(true);
            setTimeout(() => setScrolling(false), animTime);
            return;
          }
        } else {
          if (internalStep === 1) {
            e.preventDefault();
            e.stopPropagation();
            setInternalStep(0);
            setFocusedSection('pef');
            setScrolling(true);
            setTimeout(() => setScrolling(false), animTime);
            return;
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [internalStep, scrolling, hphShowCategory, pefShowCategory, categoryAnimating, animTime]);

  return (
    <div className="tech-section skw-pages">
      <canvas ref={canvasRef} className="particle-canvas" />

      {/* HPH Section */}
      <div className={`skw-page skw-page-1 ${focusedSection === 'hph' ? 'active' : ''}`}>
        {!hphShowCategory ? (
          <>
            <div className="skw-page__half skw-page__half--left">
              <div className="skw-page__skewed">
                <div className="skw-page__content">
                  <h2 className="skw-page__heading">
                    <div className="title-line-1">HPH</div>
                    <div className="title-line-2">纳米破碎·动态灭菌</div>
                  </h2>
                  <button className="tech-button" onClick={() => {
                    setCurrentVideoUrl('/videos/hph-demo');
                    setCurrentVideoTitle('HPH 纳米破碎·动态灭菌技术演示');
                    setIsVideoOpen(true);
                  }}>
                    <span className="vline"></span>
                    <span className="text">视 频 演 示</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="skw-page__half skw-page__half--right">
              <div className="skw-page__skewed">
                <div className="skw-page__content">
                  <p className="skw-page__description">
                    超高压纳米破碎技术利用300-400MPa超高压质阀
                    <br />
                    通过空化、剪切与撞击实现纳米级破碎与灭菌。
                  </p>
                  <p className="skw-page__description">
                    可广泛应用于果汁、化妆品、制药等领域,
                    <br />
                    低温条件下保留营养成分，提升产品稳定性与吸收率，
                    <br />
                    具备高效、连续化生产优势，支持多行业物料精细化处理需求
                  </p>
                  <button className="tech-button-right" onClick={() => navigate('/tech/hph')}>
                    <span className="vline"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="3">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span className="text">  查 看 详 情</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div key={`hph-${animationKey}`} className="detail-page">
            <div className="detail-page__half detail-page__half--left">
              <div className="detail-page__skewed" style={{ backgroundColor: hphSelectedCategory.leftBgColor || '#17100f' }}>
                <div className="detail-page__content">
                  <h2 style={{ color: hphSelectedCategory.bgColor }}>{hphSelectedCategory.title}</h2>
                  <p>{hphSelectedCategory.description}</p>
                </div>
              </div>
            </div>
            <div className="detail-page__half detail-page__half--right">
              <div className="detail-page__skewed" style={{ backgroundColor: hphSelectedCategory.rightBg || '#2b1a17' }}>
                <div className="detail-page__content">
                  <h3>应用详情</h3>
                  <p>{hphSelectedCategory.details}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PEF Section */}
      <div className={`skw-page skw-page-2 ${focusedSection === 'pef' ? 'active' : ''}`}>
        {!pefShowCategory ? (
          <>
            <div className="skw-page__half skw-page__half--left">
              <div className="skw-page__skewed">
                <div className="skw-page__content">
                  <h2 className="skw-page__heading">
                    <div className="title-line-1">PEF</div>
                    <div className="title-line-2">超冰温·脉冲电场保鲜</div>
                  </h2>
                  <button className="tech-button" onClick={() => {
                    setCurrentVideoUrl('/videos/pef-demo');
                    setCurrentVideoTitle('PEF 超冰温·脉冲电场保鲜技术演示');
                    setIsVideoOpen(true);
                  }}>
                    <span className="vline"></span>
                    <span className="text">视 频 演 示</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="skw-page__half skw-page__half--right">
              <div className="skw-page__skewed">
                <div className="skw-page__content">
                  <p className="skw-page__description">
                    鎏鲜科技专注于冷链食材保鲜技术，
                    <br />
                    融合冰温保鲜、纳米微晶、超冷冰沙与全冷链系统
                    <br />
                    实现15天保持一级鲜度。
                  </p>
                  <p className="skw-page__description">
                    其“鲜到鲜”技本在不改变食材形态的前提下，
                    <br />
                    有效抑制冰晶生成，减少汁液流失，
                    <br />
                    适用于肉类、果蔬等多种场景，重新定义保鲜标准
                  </p>
                  <button className="tech-button-right" onClick={() => navigate('/tech/pef')}>
                    <span className="vline"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="3">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span className="text ">查 看 详 情</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div key={`pef-${animationKey}`} className="detail-page">
            <div className="detail-page__half detail-page__half--left">
              <div className="detail-page__skewed" style={{ backgroundColor: pefSelectedCategory.leftBgColor || '#17100f' }}>
                <div className="detail-page__content">
                  <h2 style={{ color: pefSelectedCategory.bgColor }}>{pefSelectedCategory.title}</h2>
                  <p>{pefSelectedCategory.description}</p>
                </div>
              </div>
            </div>
            <div className="detail-page__half detail-page__half--right">
              <div className="detail-page__skewed" style={{ backgroundColor: pefSelectedCategory.rightBg || '#2b1a17' }}>
                <div className="detail-page__content">
                  <h3>应用详情</h3>
                  <p>{pefSelectedCategory.details}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航条 */}
      {focusedSection === 'hph' && !pefShowCategory && (
        <div className="category-navigation">
          <div className="category-nav-content">
            <div className="category-buttons">
              <button className={`nav-btn ${!hphShowCategory ? 'active' : ''}`} onClick={handleMainPageClick}>
                <span className="text">The Mine</span>
              </button>
              {hphCategories.map((category) => (
                <button
                  key={`hph-${category.id}`}
                  className={`nav-btn ${hphSelectedCategory?.id === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category, 'hph')}
                >
                  <span className="text">{category.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {focusedSection === 'pef' && !hphShowCategory && (
        <div className="category-navigation">
          <div className="category-nav-content">
            <div className="category-buttons">
              <button className={`nav-btn ${!pefShowCategory ? 'active' : ''}`} onClick={handleMainPageClick}>
                <span className="text">The Mine</span>
              </button>
              {pefCategories.map((category) => (
                <button
                  key={`pef-${category.id}`}
                  className={`nav-btn ${pefSelectedCategory?.id === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category, 'pef')}
                >
                  <span className="text">{category.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 视频播放窗口 */}
      {isVideoOpen && (
        <div className="minimal-video-overlay" onClick={() => setIsVideoOpen(false)}>
          <div className="minimal-video-container" onClick={(e) => e.stopPropagation()}>
            <div className="minimal-video-header">
              <h3 className="minimal-video-title">{currentVideoTitle}</h3>
              <button className="minimal-video-close" onClick={() => setIsVideoOpen(false)}>
                ×
              </button>
            </div>
            <div className="minimal-video-content">
              <video
                key={currentVideoUrl} // Force re-render when video changes
                controls
                autoPlay
                className="minimal-video-player"
                preload="none"
                playsInline
                onLoadStart={() => console.log('Video loading:', isMobile ? 'mobile' : 'desktop', currentVideoUrl)}
                onError={(e) => {
                  console.warn('Video load error for:', e.target.src, e.target.error);
                }}
                onLoadedData={() => console.log('Video loaded successfully:', currentVideoUrl)}
              >
                {isMobile ? (
                  <>
                    <source src={`${currentVideoUrl}-mobile.webm`} type="video/webm" />
                    <source src={`${currentVideoUrl}.mp4`} type="video/mp4" />
                  </>
                ) : (
                  <>
                    <source src={`${currentVideoUrl}.webm`} type="video/webm" />
                    <source src={`${currentVideoUrl}.mp4`} type="video/mp4" />
                  </>
                )}
                您的浏览器不支持视频播放。
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// 技术总结页面组件
const TechSummarySection = memo(() => {
  const canvasRef = useRef(null);

  // 粒子动画系统（复用HomePage的粒子系统）
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let techParticles = [];
    let techAnimationId;

    // 设置canvas尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // 计算粒子数量
    const calculateParticleCount = () => {
      return Math.floor((canvas.width * canvas.height) / 6000);
    };

    // 粒子类
    class Particle {
      constructor() {
        this.reset();
        this.y = getPooledRandom() * canvas.height;
        this.fadeDelay = getPooledRandom() * 600 + 100;
        this.fadeStart = getCachedTime() + this.fadeDelay;
        this.fadingOut = false;
        // Pre-calculate random values to eliminate RAF calculations
        this.colorVariation = getPooledRandom();
        this.sizeVariation = getPooledRandom() * 2 + 1;
      }

      reset() {
        this.x = getPooledRandom() * canvas.width;
        this.y = getPooledRandom() * canvas.height;
        this.speed = getPooledRandom() / 5 + 0.1;
        this.opacity = 1;
        this.fadeDelay = getPooledRandom() * 600 + 100;
        this.fadeStart = getCachedTime() + this.fadeDelay;
        this.fadingOut = false;
        // Pre-calculate random values to eliminate RAF calculations
        this.colorVariation = getPooledRandom();
        this.sizeVariation = getPooledRandom() * 2 + 1;
      }

      update() {
        this.y -= this.speed;
        if (this.y < 0) {
          this.reset();
        }

        if (!this.fadingOut && getCachedTime() > this.fadeStart) {
          this.fadingOut = true;
        }

        if (this.fadingOut) {
          this.opacity -= 0.008;
          if (this.opacity <= 0) {
            this.reset();
          }
        }
      }

      draw() {
        // Fixed: Pre-calculated values to eliminate string creation in RAF loop
        ctx.fillStyle = getParticleColor(this.opacity, this.colorVariation || 0.5);
        ctx.fillRect(this.x, this.y, 0.4, this.sizeVariation || 1.5);
      }
    }

    // 初始化粒子
    const initParticles = () => {
      techParticles = [];
      const particleCount = calculateParticleCount();
      for (let i = 0; i < particleCount; i++) {
        techParticles.push(new Particle());
      }
    };

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      techParticles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      techAnimationId = requestAnimationFrame(animate);
    };

    // 窗口大小改变处理
    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (techAnimationId) {
        cancelAnimationFrame(techAnimationId);
      }
    };
  }, []);

  return (
    <div className="tech-summary-section">
      {/* 粒子画布 */}
      <canvas ref={canvasRef} className="tech-summary-canvas"></canvas>

      {/* 装饰线条 - 仿照HomePage的accent-lines */}
      <div className="summary-accent-lines">
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="tech-summary-content">
        <div className="summary-text-container">
          <div className="summary-text-line">在PRïSM瓴境双核技术的协同赋能下</div>
          <div className="summary-text-line">既攻克了 高品质短保产品 的多个瓶颈</div>
          <div className="summary-text-line">保质期·损耗·成本</div>
          <div className="summary-text-line">同时又赋予了产品和品牌全新维度的</div>
          <div className="summary-text-line">可能性·生命力·竞争力·影响力</div>
          <div className="summary-text-line summary-bottom-line">为您构建起难以逾越的技术壁垒</div>
        </div>
      </div>
    </div>
  );
});

const HomePage = () => {
  const canvasRef = useRef(null);
  const location = useLocation();
  const [isGoldMode, setIsGoldMode] = useState(false);
  const [isInTechSection, setIsInTechSection] = useState(false);

  // 粒子动画系统
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let homeParticles = [];
    let homeAnimationId;

    // 设置canvas尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // 计算粒子数量
    const calculateParticleCount = () => {
      return Math.floor((canvas.width * canvas.height) / 6000);
    };

    // 粒子类
    class Particle {
      constructor() {
        this.reset();
        this.y = getPooledRandom() * canvas.height;
        this.fadeDelay = getPooledRandom() * 600 + 100;
        this.fadeStart = getCachedTime() + this.fadeDelay;
        this.fadingOut = false;
        // Pre-calculate random values to eliminate RAF calculations
        this.colorVariation = getPooledRandom();
        this.sizeVariation = getPooledRandom() * 2 + 1;
      }

      reset() {
        this.x = getPooledRandom() * canvas.width;
        this.y = getPooledRandom() * canvas.height;
        this.speed = getPooledRandom() / 5 + 0.1;
        this.opacity = 1;
        this.fadeDelay = getPooledRandom() * 600 + 100;
        this.fadeStart = getCachedTime() + this.fadeDelay;
        this.fadingOut = false;
        // Pre-calculate random values to eliminate RAF calculations
        this.colorVariation = getPooledRandom();
        this.sizeVariation = getPooledRandom() * 2 + 1;
      }

      update() {
        this.y -= this.speed;
        if (this.y < 0) {
          this.reset();
        }

        if (!this.fadingOut && getCachedTime() > this.fadeStart) {
          this.fadingOut = true;
        }

        if (this.fadingOut) {
          this.opacity -= 0.008;
          if (this.opacity <= 0) {
            this.reset();
          }
        }
      }

      draw() {
        // Fixed: Pre-calculated values to eliminate string creation in RAF loop
        ctx.fillStyle = getParticleColor(this.opacity, this.colorVariation || 0.5);
        ctx.fillRect(this.x, this.y, 0.4, this.sizeVariation || 1.5);
      }
    }

    // 初始化粒子
    const initParticles = () => {
      homeParticles = [];
      const particleCount = calculateParticleCount();
      for (let i = 0; i < particleCount; i++) {
        homeParticles.push(new Particle());
      }
    };

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      homeParticles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      homeAnimationId = requestAnimationFrame(animate);
    };

    // 窗口大小改变处理
    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (homeAnimationId) {
        cancelAnimationFrame(homeAnimationId);
      }
    };
  }, []);

  // 检测是否在技术展示区域或技术总结区域
  useEffect(() => {
    const handleScroll = () => {
      const techSection = document.querySelector('.tech-section');
      const summarySection = document.querySelector('.tech-summary-section');

      let isInSpecialSection = false;

      if (techSection) {
        const techRect = techSection.getBoundingClientRect();
        // 当技术展示区域出现在视口中时调整spotlight
        const techVisible = techRect.top <= window.innerHeight * 0.8 && techRect.bottom >= 0;
        if (techVisible) isInSpecialSection = true;
      }

      if (summarySection) {
        const summaryRect = summarySection.getBoundingClientRect();
        // 当技术总结区域出现在视口中时继续显示spotlight（但调整样式）
        const summaryVisible = summaryRect.top <= window.innerHeight * 0.8 && summaryRect.bottom >= 0;
        if (summaryVisible) isInSpecialSection = true;
      }

      setIsInTechSection(isInSpecialSection);
    };

    window.addEventListener('scroll', handleScroll);
    // 初始检查
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 处理从详情页返回时的自动滚动
  useEffect(() => {
    const state = location.state;
    // 只有当有targetSection且来自详情页时才滚动
    if (state?.targetSection && state?.fromDetailPage) {
      // 延迟滚动，确保页面已经渲染完成
      const timer = setTimeout(() => {
        const techSection = document.querySelector('.tech-section');
        if (techSection) {
          techSection.scrollIntoView({ behavior: 'smooth' });
        }
        // 清除状态，避免重复触发
        window.history.replaceState(null, '', location.pathname);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const toggleGoldMode = () => {
    setIsGoldMode(!isGoldMode);
  };

  const handleScrollToTech = () => {
    // 平滑滚动到技术展示区域
    const techSection = document.querySelector('.tech-section');
    if (techSection) {
      techSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className={`home-page ${isGoldMode ? 'gold' : ''} ${isInTechSection ? 'in-tech-section' : ''}`}>
      {/* Header */}
      <div className="header">
        <h2>
          <a href="#" onClick={(e) => e.preventDefault()}>
            双核科技
          </a>
        </h2>
        <div className="mid-spot" onClick={toggleGoldMode}></div>
        <button className="contact-btn" onClick={handleScrollToTech}>
          <span className="glow"></span>
          <span className="contact-btn-content">技术展示</span>
        </button>

        {/* 聚光灯效果 - 从第一页照到第三页 */}
        <div className="spotlight">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* 粒子画布 */}
      <canvas ref={canvasRef} id="particleCanvas"></canvas>

      {/* 装饰线条 */}
      <div className="accent-lines">
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* 主标题区域 */}
      <div className="heroSubP">
        <p>独家科技</p>
      </div>

      <div className="hero">
        <div className="heroT">
          <h2>双核赋能</h2>
          <h2>双核赋能</h2>
        </div>
      </div>

      {/* 统一的6行文字 */}
      <div className="heroAllText">
        <div className="text-line">革新产品全球竞争力</div>
        <div className="text-line">我们拥有2项世界领先的专利技术</div>
        <div className="text-line">它们并非普通的量变工具</div>
        <div className="text-line">而是能够实现从产品力本质到商业模式</div>
        <div className="text-line"><span>价值重塑+规则重构</span>的质变武器</div>
        <div className="text-line bottom-line">
          <span className="glow-text">穿越周期·双核无界</span>
        </div>
      </div>


      {/* 间隔区域 */}
      <div className="hero-spacer"></div>

      {/* 技术展示区域 */}
      <TechSection />

      {/* 第三页 - 技术总结页面 */}
      <TechSummarySection />
    </div>
  );
};

export default memo(HomePage);