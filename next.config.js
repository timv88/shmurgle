/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';
const nextConfig = {
    reactStrictMode: true,
    basePath: isDev ? '' : '/shmurgle',
    assetPrefix: isDev ? '' : '/shmurgle/',
};

module.exports = nextConfig
