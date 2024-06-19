const NextFederationPlugin = require('@module-federation/nextjs-mf');

const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    header: `header@https://daryannnn.github.io/headerapp/_next/static/${location}/remoteEntry.js`,
    profile: `profile@https://daryannnn.github.io/profileapp/_next/static/${location}/remoteEntry.js`,
    programs: `programs@https://daryannnn.github.io/trprapp/_next/static/${location}/remoteEntry.js`,
    posts: `posts@https://daryannnn.github.io/postsapp/_next/static/${location}/remoteEntry.js`,
    events: `events@https://daryannnn.github.io/evapp/_next/static/${location}/remoteEntry.js`,
  };
};
const nextConfig = {
  reactStrictMode: false,
  webpack(config, { isServer }) {
    config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          filename: 'static/chunks/remoteEntry.js',
          remotes: remotes(isServer),
          exposes: {},
            shared: {
                '@material-ui/styles': {
                    singleton: true,
                    requiredVersion: '*',
                },
                '@material-ui/core': {
                    singleton: true,
                    requiredVersion: '*',
                },
                '@emotion/core': {
                    singleton: true,
                    requiredVersion: '*',
                },
                '@emotion/styled': {
                    singleton: true,
                    requiredVersion: '*',
                },
                "@material-ui/private-theming": {
                    singleton: true,
                    requiredVersion: '*',
                },
            },
        })
    );

    return config;
  },
}

module.exports = nextConfig
