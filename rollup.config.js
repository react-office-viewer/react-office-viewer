import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import autoprefixer from 'autoprefixer';
import url from '@rollup/plugin-url';
import { cssUrl } from '@sixian/css-url';
export default {
    input: './src/index.js',
    output: {
        file: './build/bundle.js',
        format: 'cjs',
    },
    plugins: [babel(), commonjs(), url(), postcss({
        modules: true,
        plugins: [autoprefixer(), cssUrl({
            imgOutput: 'build/images',
            cssOutput: 'build/style'
        })]
    }),
    ],
    external: ['react']
}