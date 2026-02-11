module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          // Targets the current version of Node.js for testing environment
          targets: {
            node: 'current',
          },
        },
      ],
    ],
  };