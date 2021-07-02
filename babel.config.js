// ESM and CJS builds
module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);
  const env = api.env();

  return {
    presets: [
      ['@babel/preset-env', {
        'useBuiltIns': false, // default value: don't add core-js or babel polyfills
        'modules': env === 'cjs' ? 'commonjs' : false, // `false`: dont' transform ES6 module syntax. required for tree-shaking with ES6 modules
        'targets': {
          'ie': '10',
          'node': '6'
        }
      }],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', {
        'useESModules': env === 'cjs' ? false : true, // `true`: use helpers that not get run through @babel/plugin-transform-modules-commonjs
        'corejs': false // default value: use `@babel/runtime` that doesn't have built-in polyfills
      }],
      '@babel/plugin-proposal-class-properties'
    ]
  };
};
