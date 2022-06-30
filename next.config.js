/** @type {import('next').NextConfig} */
const StylelintPlugin = require("stylelint-webpack-plugin");

const isDev = process.env.NODE_ENV !== 'production';
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, options) => {
        config.plugins.push(new StylelintPlugin());
        return config;
    },
    basePath: isDev ? '' : '/shmurgle',
    assetPrefix: isDev ? '' : '/shmurgle/',
};

module.exports = nextConfig
