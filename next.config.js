/** @type {import('next').NextConfig} */
const StylelintPlugin = require("stylelint-webpack-plugin");

const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, options) => {
        config.plugins.push(
            new StylelintPlugin({
                failOnError: isProd ? true : false,
            })
        );
        return config;
    },
    basePath: isProd ? '/shmurgle': '',
    assetPrefix: isProd ? '/shmurgle/' : ''
};

module.exports = nextConfig
