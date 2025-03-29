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
import { visualizer } from 'rollup-plugin-visualizer';
import modify from 'rollup-plugin-modify'
 


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
const productionPlugins = [
    modify({
        find: /const\s+logger\w*\s*=\s*FzLogger.get/,
        replace: "// removed getLogger"
    }),
    modify({
        find: /    logger\w*\.(debug|warn|log|info)/g,
        replace: "//removed logger.$1/"
    }),
    modify({
        find: /    logger\w*\.if\.(debug|warn|log|info)/g,
        replace: "//removed logger.if.$1"
    }),
    terser({
        ecma: 2021,
        module: true,
        warnings: true,
        compress: {
            drop_console: true, // ✅ Remove console.log()
            drop_debugger: true, // ✅ Remove debugger statements
            pure_funcs: ["console.log"], // ✅ Ensure console logs are stripped
            dead_code: true,
        },
        mangle: {
            properties: {
                regex: /^__/, // Mangle only private properties
            },
        },
    })
]

function manualChunks(id) {
    if (id.includes('node_modules/markdown-it') || id.includes('dist/markdown-dynamic')  ) return 'markdown'
    if (id.includes('node_modules/ajv') || id.includes('dist/ajv-dynamic')) return 'ajv'
}

const devonly = process.env.NODE_ENV === 'development';


    // produce developement bundle
const dev_conf = {
    input: './dist/formulizer.js',
    output: {
        dir: './dist',
        entryFileNames: '[name].js',
        chunkFileNames: "[name]-dynamic.js",
        format: 'esm',
        sourcemap: true,
        manualChunks,
    },
    onwarn,
    plugins: [...commonPlugins, summary()],
}

const prod_conf = {
    input: './dist/formulizer.js',
    output: {
        dir: './dist',
        entryFileNames: '[name].min.js',
        chunkFileNames: "[name]-dynamic.min.js",
        format: 'esm',
        sourcemap: false,
        manualChunks,
    },
    onwarn,
    plugins: [...commonPlugins, ...productionPlugins, summary(),
    visualizer({ template: 'treemap', filename: "dist/stat/treemap.html", gzipSize: true, brotliSize: true, }),
    visualizer({ template: 'network', filename: "dist/stat/network.html", gzipSize: true, brotliSize: true, }),
    visualizer({ template: 'sunburst', filename: "dist/stat/sunburst.html", gzipSize: true, brotliSize: true, }),
    visualizer({ template: 'flamegraph', filename: "dist/stat/flamegraph.html", gzipSize: true, brotliSize: true, }),
    visualizer({ template: 'raw-data', filename: "dist/stat/rawdata.html", gzipSize: true, brotliSize: true, }),
    visualizer({ template: 'list', filename: "dist/stat/list.html", gzipSize: true, brotliSize: true, }),
    ]
}

// produce type declarations
const type_defs = {
    input: "src/formulizer.ts", // Ensure this is your root file
    output: {
        file: "dist/formulizer.d.ts",
        format: "es",
    },
    plugins: [dts()],
}

const config = [ dev_conf ]
if (!devonly) config.push(prod_conf)
if (!devonly) config.push(type_defs)
export default config
