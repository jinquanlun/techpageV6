import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/globals/index.css'

// 移除初始加载指示器
const removeLoadingIndicator = () => {
  const loadingElement = document.querySelector('.initial-loading');
  if (loadingElement) {
    loadingElement.style.opacity = '0';
    loadingElement.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => {
      loadingElement.remove();
    }, 300);
  }
};

// 创建React应用
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// 应用加载完成后移除加载指示器
setTimeout(removeLoadingIndicator, 100);