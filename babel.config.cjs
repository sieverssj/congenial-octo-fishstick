// For Jest. ts-jest seemingly has issues with ESM modules and I couldn't get it working in a reasonable time frame. https://github.com/kulshekhar/ts-jest/issues/4081
module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
    ],
  };