import { nodeResolve } from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from 'typescript';
import ts from 'rollup-plugin-ts';
import pkg from './package.json';

export const VERSION = pkg.version;

export default {
  input: 'src/index.ts',
  output: [
    // development build
    {
      format: 'umd', // works as `cjs`, `iife` and `amd` all in one
      name: 'adversarialSearch',
      file: `umd/adversarialSearch-${VERSION}.js`
    },
    // production build
    {
      format: 'umd',
      name: 'adversarialSearch',
      file: `umd/adversarialSearch-${VERSION}.min.js`,
      plugins: [
        terser()
      ]
    }
  ],
  plugins: [
    nodeResolve({
      // defaults `extensions` plus '.ts' files
      extensions: [
        '.mjs', '.js', '.json', '.node', '.ts'
      ],
      browser: true,
      preferBuiltins: false,
    }),
    // commonjs(),
    ts({
      typescript,
      tsconfig: './tsconfig.json',
      browserlist: false // using target property of tsconfig file
    })
  ]
};
