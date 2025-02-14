/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import summary from 'rollup-plugin-summary';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { string } from 'rollup-plugin-string';
import url from '@rollup/plugin-url';
import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './dist/main.js',
  output: {
    file: './dist/formulizer.js',
    format: 'esm',
    sourcemap: true,
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({preventAssignment: false, 'Reflect.decorate': 'undefined'}),
    resolve(),
    /**
     * This minification setup serves the static site generation.
     * For bundling and minification, check the README.md file.
     */
    // terser({
    //   ecma: 2021,
    //   module: true,
    //   warnings: true,
    //   mangle: {
    //     properties: {
    //       regex: /^__/,
    //     },
    //   },
    // }),
    summary(),
    // Permet d'importer les fichiers avec l'extension .css en tant que chaîne de caractères
    string({
      include: '**/*.css',
    }),
    alias({
       entries: [
         { find: './assets', replacement: '../src/assets' },
       ]
     }),
    url({
      // by default, rollup-plugin-url will not handle font files
      include: ['**/*.woff', '**/*.woff2'],
      // setting infinite limit will ensure that the files 
      // are always bundled with the code, not copied to /dist
      limit: Infinity,
    }),
    typescript({ sourceMap: true })
  ],
};
