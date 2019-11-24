/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// Create blog post list pages
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  

  const blogPost = path.resolve(`./src/pages/blog-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    // Create blog post list pages
    const postsPerPage = 2;
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? '/blog' + `/` : '/blog' + `/${i + 1}`,
        component: path.resolve('./src/pages/blog-list.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        },
      });
    });
  })
}

// Portfolio Entry
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  
  
  const portfolioPost = path.resolve(`./src/pages/portfolio-post.js`)
  return graphql(
    `
      {
        allGithubData(
          limit: 1000
          ) {
            edges {
              node{
              data {
                search {
                  edges {
                    node {
                      id
                      name
                      url
                      readme {
                        text
                      }
                      pushedAt
                    }
                  }
                }
              }
            }
          }
        }
      }
      `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }
    
    // Create blog posts pages.
    const posts = result.data.allGithubData.edges[0].node.data.search.edges
    console.log(posts)
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      
      createPage({
        path: '/portfolio/' + post.node.name,
        component: portfolioPost,
        context: {
          name: post.node.name,
          previous,
          next,
        },
      })
    })
    
    // Create blog post list pages
    const portfolioPerPage = 2;
    const numPages = Math.ceil(posts.length / portfolioPerPage);
    
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? '/portfolio' + `/` : '/portfolio' + `/${i + 1}`,
        component: path.resolve('./src/pages/portfolio-list.js'),
        context: {
          limit: portfolioPerPage,
          skip: i * portfolioPerPage,
          numPages,
          currentPage: i + 1
        },
      });
    });
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark` ) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}