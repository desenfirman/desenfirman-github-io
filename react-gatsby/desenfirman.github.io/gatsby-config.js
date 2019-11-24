const config = require('./config');

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    title: config.siteTitle,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-github-api`,
      options: {
        // token: required by the GitHub API
        token: 'd9bf48f45bea9dc67f490d4bd8eb5f523adadbdb',
  
        // GraphQLquery: defaults to a search query
        graphQLQuery: `
        query ($q: String = "", $searchFirst: Int = 0) {
          search(query: $q, type: REPOSITORY, first: $searchFirst) {
            pageInfo {
              endCursor
              startCursor
            }
            repositoryCount
            edges {
              node {
                ... on Repository {
                  id
                  url
                  name
                  readme: object(expression: "master:README.md") {
                    ... on Blob {
                      oid
                      text
                    }
                  }
                  pushedAt
                }
              }
            }
          }
        }`,
  
        // variables: defaults to variables needed for a search query
        variables: {
          searchFirst: 50,
          q: "user:desenfirman topic:portfolio"
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/blog/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.manifestName,
        short_name: config.manifestShortName,
        start_url: config.pathPrefix || config.manifestStartUrl,
        background_color: config.manifestBackgroundColor,
        theme_color: config.manifestThemeColor,
        display: config.manifestDisplay,
        icon: config.manifestIcon, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline',
  ],
};
