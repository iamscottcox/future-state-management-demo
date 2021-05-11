const path = require('path');
const withLess = require('@zeit/next-less');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  webpack(config) {
    console.log('config.context', config.context);
    config.resolve.alias['../../theme.config$'] = path.join(
      config.context,
      '/src/semantic-ui/theme.config'
    );
    return config;
  },
};

const plugins = [withLess];
module.exports = withPlugins(plugins, nextConfig);
