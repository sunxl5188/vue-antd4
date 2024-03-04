import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	resolve: {
		alias: [
			{
				find: '@', // 别名
				replacement: resolve(__dirname, './src') // 别名对应地址
			}
		]
	},
	plugins: [
		vue(),
		eslintPlugin({
			lintOnStart: true,
			cache: false,
			include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
		})
	],
	server: {
		port: 8000, // 设置服务启动端口号，如果端口已经被使用，Vite 会自动尝试下一个可用的端口
		open: true, // boolean | string 设置服务启动时是否自动打开浏览器，当此值为字符串时，会被用作 URL 的路径名
		cors: true, // 为开发服务器配置 CORS，配置为允许跨域
		// 设置代理，根据我们项目实际情况配置
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8000', // 后台服务地址
				changeOrigin: true, // 是否允许不同源
				secure: false, // 支持https
				rewrite: path => path.replace(/^/aip, '')
			}
		}
	},
	build: {
		outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
		terserOptions: {
			compress: {
				keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
				drop_console: true, // 生产环境去除 console
				drop_debugger: true // 生产环境去除 debugger
			}
		},
		chunkSizeWarningLimit: 1500 // chunk 大小警告的限制（以 kbs 为单位）
	}
})
