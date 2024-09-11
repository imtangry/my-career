/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'archive.cetus.zone',
          },
        ],
      },
}

export default nextConfig
