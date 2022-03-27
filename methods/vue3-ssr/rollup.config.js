import commonjs from '@rollup/plugin-commonjs';
import VuePlugin from 'rollup-plugin-vue';

export default {
  input: "index.js",
  output: {
    file: "dist/index.js",
    format: "cjs"
  },
  plugins: [
    commonjs(),
    VuePlugin({
      css: false
    }),
  ],
  watch: {
    include: '**',
    exclude: 'node_modules/**'
  }
}