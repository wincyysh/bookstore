// babel.config.js (Corrected content)
const config = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react', // Include this if you installed it earlier
  ],
};

export default config;