const NextFederationPlugin = require('@module-federation/nextjs-mf');

const nextConfig = {
    webpack(config) {
        config.plugins.push(
            new NextFederationPlugin({
                name: '',
                filename: '',
                remotes: {},
                exposes: {},
                shared: {},
                extraOptions: {},
            })
        );

        return config;
    },
}

module.exports = nextConfig


