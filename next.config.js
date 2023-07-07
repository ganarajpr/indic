/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    if (!isServer) {

    }
    config.externals = config.externals
      ? [...config.externals, 'chrome-aws-lambda']
      : ['chrome-aws-lambda'];
    return config;
  },
};

module.exports = nextConfig;
