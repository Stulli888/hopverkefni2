const presets = [
  ['@babel/preset-env', {
    useBuiltIns: 'usage',
    corejs: 2,
    targets: '> 0.25%, not dead',
  }],
];
module.exports = { presets };