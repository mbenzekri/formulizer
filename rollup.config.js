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
import dts from "rollup-plugin-dts";
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';


import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname)

function onwarn(warning) {
  if (warning.code !== 'THIS_IS_UNDEFINED') {
    if (warning.message.includes("Rollup 'sourcemap' option must be set to generate source maps.")) return
    console.error(`(!) ${warning.message}`);
  }
}

const commonPlugins = [
  alias({
    entries: [
      { find: '../assets/bootstrap-icons.woff', replacement: `${projectRoot}/src/assets/bootstrap-icons.woff` },
      { find: '../assets/bootstrap-icons.woff2', replacement: `${projectRoot}/src/assets/bootstrap-icons.woff2` },
      { find: './assets//bootstrap.css', replacement: `${projectRoot}/src/assets/bootstrap.css` },
      { find: './assets/bs_variables.css', replacement: `${projectRoot}/src/assets/bs_variables.css` },
    ]
  }),
  // Ensures that dependencies are properly resolved before transformation.
  resolve(),
  json(),      // 👈 Add this before commonjs()
  commonjs(),  // 👈 must be before typescript()
  typescript({ sourceMap: true }),
  replace({ preventAssignment: false, 'Reflect.decorate': 'undefined' }),
  string({
    include: '**/*.css',
  }),
  // Permet d'importer les fichiers avec l'extension .css en tant que chaîne de caractères
  url({
    // by default, rollup-plugin-url will not handle font files
    include: ['**/*.woff', '**/*.woff2', '**/*.css'],
    // setting infinite limit will ensure that the files 
    // are always bundled with the code, not copied to /dist
    limit: Infinity,
  }),
];

// minification step
const terserPlugin = terser({
  ecma: 2021,
  module: true,
  warnings: true,
  mangle: {
    properties: {
      regex: /^__/,
    },
  },
});

export default [

  // produce developement bundle
  {
    input: './dist/main.js',
    output: {
      file: './dist/formulizer.js',
      format: 'esm',
      sourcemap: true,
    },
    onwarn,
    plugins: [...commonPlugins,summary()],
  },

  // produce minified bundle
  {
    input: './dist/main.js',
    output: {
      file: './dist/formulizer.min.js',
      format: 'esm',
      sourcemap: false,
    },
    onwarn,
    plugins: [...commonPlugins,terserPlugin,summary()],
  },

  // produce type declarations
  {
    input: "src/main.ts", // Ensure this is your root file
    output: {
      file: "dist/formulizer.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },

];
