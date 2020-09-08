module.exports = {
  siteMetadata: {
    title: `歌マクロスDB`,
    description: `歌マクロスのデータ閲覧サイト`,
    author: {
      name: 'ponko23',
      content: '',
    },
    social: {
      github: 'https://github.com/ponko23/game-db',
    },
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-material-ui',
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        head: false,
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
  ],
}
