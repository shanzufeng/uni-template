import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path';
import unocss from 'unocss/vite';

export default ({ mode }) => {
    const root = process.cwd();
    const { VITE_APP_REQ_URL, VITE_APP_AXIOS_BASE_URL, VITE_PORT } = loadEnv(mode, root);
    return defineConfig({
        base: './',
        plugins: [uni(), unocss()],
        server: {
            port: VITE_PORT,
            host: '0.0.0.0',
            proxy: {
                [VITE_APP_AXIOS_BASE_URL]: {
                    target: VITE_APP_REQ_URL,
                    changeOrigin: true
                    // rewrite: (p) => p.replace(/^\/api/, '')
                }
            }
        },
        build: {
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true
                }
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        css: {
            // 配置`scss`和`less`全局变量
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/style/global/base.scss";'
                }
            }
        }
    })
}
