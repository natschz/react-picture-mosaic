import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import image from '@rollup/plugin-image';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    }
  ],
  plugins: [
    postcss(),
    typescript({tsconfig: './tsconfig.json'}),
    image(),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-react"]
    }),
    external(),
    resolve({preferBuiltins: true, mainFields: ['browser']}),
    commonjs(),
    // terser()
  ]
}