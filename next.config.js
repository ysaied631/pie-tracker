/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/components')],
  },
  webpack: (config, _options) => {
    config.resolve.alias['@src'] = path.resolve(__dirname, './src');
    config.resolve.alias['@components'] = path.resolve(
      __dirname,
      './src/components'
    );
    config.resolve.alias['@styles'] = path.resolve(__dirname, './src/styles');
    config.resolve.alias['@public'] = path.resolve(__dirname, './src/public');
    config.resolve.alias['@utils'] = path.resolve(__dirname, './src/utils');
    config.resolve.alias['@db'] = path.resolve(__dirname, './src/db');

    config.resolve.extensions = config.resolve.extensions.concat([
      '.ts',
      '.tsx',
    ]);

    // config.cache.buildDependencies.mydeps = ['package-lock.json'];

    return config;
  },
};

module.exports = nextConfig;
