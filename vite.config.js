import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap' // 可选: 'treemap', 'sunburst', 'network'
    }),
  ],

  // 构建优化配置
  build: {
    // 输出目录
    outDir: 'dist',

    // Rollup配置
    rollupOptions: {
      output: {
        // 手动分包优化
        manualChunks: {
          // 第三方库分包
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],

          // 页面组件分包
          pages: [
            './src/pages/TechShowcasePage.jsx',
            './src/pages/HPHDetailPage.jsx',
            './src/pages/PEFDetailPage.jsx'
          ],

          // 工具类分包
          utils: [
            './src/utils/mathCache.js',
            './src/utils/objectPool.js',
            './src/utils/spatialPartitioning.js',
            './src/utils/dirtyMarking.js'
          ]
        },

        // 优化文件命名
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop().replace('.jsx', '').replace('.js', '') : 'chunk';
          return `js/[name]-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff2?|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          return `${extType}/[name]-[hash][extname]`;
        }
      }
    },

    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境移除console和debugger
        drop_console: true,
        drop_debugger: true,
        // 移除未使用的代码
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        // 保留类名，避免破坏性能监控类
        keep_classnames: true
      }
    },

    // 优化配置
    target: 'es2015', // 支持现代浏览器
    sourcemap: false, // 生产环境不生成sourcemap

    // 文件大小警告阈值
    chunkSizeWarningLimit: 1000
  },

  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    host: true, // 允许外部访问
    cors: true,

    // 代理配置（如果需要）
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },

  // 预览服务器配置
  preview: {
    port: 4173,
    open: true,
    host: true
  },

  // 静态资源处理
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot'],

  // CSS配置
  css: {
    // CSS预处理器配置
    preprocessorOptions: {
      // 如果使用scss
      // scss: {
      //   additionalData: `@import "@/styles/variables.scss";`
      // }
    }
  },

  // 优化依赖
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    // 排除某些依赖的预构建
    exclude: []
  },

  // 定义全局常量
  define: {
    // 替换环境变量
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  },

  // 基础URL配置
  base: './', // 相对路径，适用于各种部署环境

  // 环境变量配置
  envPrefix: 'VITE_'
})