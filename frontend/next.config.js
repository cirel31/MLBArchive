/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  // 기존 설정과 병합
  webpack: (config, { isServer }) => {
    // 클라이언트 컴포넌트만을 대상으로 설정합니다.
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        util: require.resolve("util/"),
        fs: false,
        tls: false,
        net: false,
        path: false,
        zlib: false,
        http: false,
        https: false,
        stream: false,
        crypto: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
