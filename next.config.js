/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
 /*  webpack: (config, { isServer }) => {
    if (!isServer) {
        config.resolve.fallback = {
            fs: false,
            net: false,
            child_process: false,
            fs: false,
            crypto: false,
            net: false,
            tls: false
        }
    }

    return config;
}  */
}

module.exports = nextConfig
