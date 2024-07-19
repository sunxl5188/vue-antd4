import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default ({ mode }: { mode: any }) => {
	const env = loadEnv(mode, process.cwd(), '')
	return defineConfig({
		define: {
			__APP_PREFIX__: JSON.stringify(env.VITE_PREFIX),
			__APP_VERSION__: JSON.stringify(env.npm_package_version),
			__IS_ENCRYPT__: JSON.stringify(true),
			__SECRET_KEY__: JSON.stringify('ccdde6e143439161'),
			__SECRET_VI__: JSON.stringify('aabbe7e3ba84431a')
		},
		base: '/',
		css: {
			preprocessorOptions: {
				less: {
					charset: false,
					additionalData: '@import "./src/assets/style/variables.less";'
				}
			}
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, './src')
				//'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
			},
			//注意，不建议忽略自定义导入类型的扩展名（例如：.vue）
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
		},
		plugins: [
			vue(),
			VueSetupExtend(),
			eslintPlugin({
				lintOnStart: true,
				cache: false,
				include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue']
			}),
			visualizer({
				emitFile: false,
				filename: 'stats.html',
				open: true,
				sourcemap: true
			}),
			viteCompression({
				verbose: true,
				disable: false,
				threshold: 1024,
				algorithm: 'gzip',
				deleteOriginFile: true
			}),
			Components({
				resolvers: [
					AntDesignVueResolver({
						importStyle: false, // css in js
						resolveIcons: true
					})
				]
			}),
			AutoImport({
				include: [
					/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
					/\.vue$/,
					/\.vue\?vue/, // .vue
					/\.md$/ // .md
				],
				// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
				imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
				// eslint 报错解决：'ref' is not defined
				eslintrc: {
					// 默认 false, true 启用生成。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把 enable 关掉，即改成 false。
					// 否则这个文件每次会在重新加载的时候重新生成，这会导致 eslint 有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
					enabled: false
					// filepath: './.eslintrc-auto-import.json', // 默认就是 ./.eslintrc-auto-import.json
					// globalsPropValue: true, // 默认 true
				},
				resolvers: [AntDesignVueResolver()],
				dts: './auto-imports.d.ts'
			}),
			createHtmlPlugin({
				minify: true, //是否压缩 html
				/**
				 * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
				 * @default src/main.ts
				 */
				entry: 'src/main.ts',
				/**
				 * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
				 * @default index.html
				 */
				template: './index.html',
				/**
				 * 需要注入 index.html ejs 模版的数据
				 */
				inject: {
					data: {
						title: env.VITE_TITLE
					}
				}
			}),
			createSvgIconsPlugin({
				// 指定路径在你的src里的svg存放文件
				iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
				// 指定symbolId格式
				symbolId: '[name]'
			})
		],
		server: {
			port: 8000,
			// 设置代理，根据我们项目实际情况配置
			proxy: {
				[`^${env.VITE_API}`]: {
					target: env.VITE_TARGET, // 后台服务地址
					changeOrigin: true, // 是否允许不同源
					secure: false, // 支持https
					rewrite: (path: any) => path.replace(RegExp(`^${env.VITE_API}`), '')
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
			chunkSizeWarningLimit: 1000, // chunk 大小警告的限制（以 kbs 为单位）
			cssCodeSplit: false, //启用/禁用 CSS 代码拆分
			cssMinify: 'lightningcss',
			rollupOptions: {
				output: {
					sourcemap: false,
					chunkFileNames: 'static/js/[name]-[hash].js',
					entryFileNames: 'static/js/[name]-[hash].js',
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
					manualChunks(id) {
						// id为文件的绝对路径
						if (id.includes('node_modules')) {
							return id
								.toString()
								.split('node_modules/')[1]
								.split('/')[0]
								.toString()
						}
					}
				}
			}
		}
	})
}
