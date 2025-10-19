import React, { useState, useRef, useEffect } from 'react';

/**
 * 优化的图片组件
 * 支持懒加载、错误处理、加载状态显示
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  style = {},
  lazy = true,
  placeholder = null,
  onLoad = null,
  onError = null,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef(null);

  // 懒加载逻辑
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [lazy, isInView]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
    ...style
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 1 : 0
  };

  const placeholderStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    color: '#666',
    fontSize: '14px',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
    pointerEvents: 'none'
  };

  return (
    <div ref={imgRef} className={className} style={containerStyle}>
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          style={imageStyle}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}

      {/* 自定义占位符 */}
      {placeholder && !isLoaded && !hasError && (
        <div style={placeholderStyle}>
          {placeholder}
        </div>
      )}

      {/* 默认占位符 */}
      {!placeholder && !isLoaded && !hasError && (
        <div style={placeholderStyle}>
          <div style={{
            width: '24px',
            height: '24px',
            border: '2px solid #ddd',
            borderTopColor: '#999',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style>
            {`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}

      {/* 错误状态 */}
      {hasError && (
        <div style={{
          ...placeholderStyle,
          backgroundColor: '#f5f5f5',
          opacity: 1,
          flexDirection: 'column'
        }}>
          <div style={{ marginBottom: '8px', fontSize: '18px' }}>📷</div>
          <div>图片加载失败</div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;