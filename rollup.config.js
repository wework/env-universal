// https://github.com/rollup/rollup/wiki/Command-Line-Interface

import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';

// NPM injects the name from `package.json` to this env var
const pkgName = process.env.npm_package_name;

export default {
  entry: 'src/index.js',
  targets: [
    {
      dest: 'dist/index.js',
      sourceMap: 'dist/index.map.js',
      format: 'cjs'
    },
  ],
  moduleId: pkgName,
  moduleName: pkgName,
  plugins: [
    filesize(),

    babel({
      exclude: './node_modules/**',
      moduleIds: true,
      comments: false,

      // Custom babelrc for build
      babelrc: false,
      presets: [
        [ 'es2015', { 'modules': false } ],
        'stage-0',
      ],
      plugins: [
        'external-helpers'
      ]
    })
  ]
};
