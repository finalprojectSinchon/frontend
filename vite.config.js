import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173, // 필요한 경우 포트 번호를 수정하세요.
        strictPort: true,
    },
    resolve: {
        alias: {
            src: resolve(__dirname, 'src'),
        },
    },
    esbuild: {
        loader: 'jsx', // JSX 구문을 파싱할 로더 설정
        include: /src\/.*\.jsx?$/, // 파싱할 파일 경로 패턴
        exclude: [], // 제외할 파일 경로 패턴
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: 'load-js-files-as-jsx',
                    setup(build) {
                        build.onLoad(
                            { filter: /src.*\.js$/ }, // 경로 구분자를 슬래시로 변경
                            async (args) => ({
                                loader: 'jsx',
                                contents: await fs.readFile(args.path, 'utf8'),
                            })
                        );
                    },
                },
            ],
        },
    },
    
    plugins: [svgr(), react()],
});