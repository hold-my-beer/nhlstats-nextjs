/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.nhle.com',
        port: '',
        pathname: '/mugs/nhl/**',
      },
    ],
  },
}

export default nextConfig
