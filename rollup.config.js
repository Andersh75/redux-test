import reslove from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/my-app.js',
    output: {
        file: './build/bundle.js',
        format: 'iife'
    },
    name: 'MyModule',
    plugins: [
        reslove(),
        commonjs()
    ]
};