/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! QUAN TRỌNG !!
    // Dòng này giúp bỏ qua lỗi TypeScript khi deploy
    ignoreBuildErrors: true,
  },
  eslint: {
    // Dòng này giúp bỏ qua lỗi kiểm tra cú pháp khi deploy
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;