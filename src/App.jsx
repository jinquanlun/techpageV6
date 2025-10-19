import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

// 懒加载页面组件以优化初始加载性能
const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const HPHDetailPage = lazy(() => import('./pages/HPHDetailPage.jsx'))
const PEFDetailPage = lazy(() => import('./pages/PEFDetailPage.jsx'))

// 高性能加载指示器组件
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: '1.2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      borderTopColor: '#ffffff',
      animation: 'spin 1s ease-in-out infinite',
      marginRight: '16px'
    }}></div>
    Loading Technology Showcase...
    <style>
      {`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
)

// 错误边界组件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#000000',
          color: '#ffffff',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h1 style={{ marginBottom: '20px', fontSize: '2rem' }}>技术展示平台暂时不可用</h1>
          <p style={{ marginBottom: '20px', opacity: 0.8 }}>系统遇到了一个错误，请刷新页面重试</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '6px',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            刷新页面
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* 首页路由 - 现在包含了技术展示内容 */}
          <Route path="/" element={<HomePage />} />

          {/* HPH技术详情页路由 */}
          <Route path="/tech/hph" element={<HPHDetailPage />} />

          {/* PEF技术详情页路由 */}
          <Route path="/tech/pef" element={<PEFDetailPage />} />

          {/* 保留/tech路由以便向后兼容 */}
          <Route path="/tech" element={<HomePage />} />

          {/* 404页面处理 - 重定向到主页 */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App