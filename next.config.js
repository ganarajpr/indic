/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
      ) => {
        // Important: return the modified config
        config.externals = config.externals ? [...config.externals, 'chrome-aws-lambda']: ['chrome-aws-lambda'];
        return config
      },
}

module.exports = nextConfig
