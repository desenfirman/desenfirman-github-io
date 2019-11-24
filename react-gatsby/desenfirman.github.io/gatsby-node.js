/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// Create blog post list pages

function createPostPages(createPage, posts, postsPerPage) {
  const blogPost = path.resolve(`./src/components/templates/blog-post.js`)
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
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/blog' + `/` : '/blog' + `/${i + 1}`,
      component: path.resolve('./src/components/templates/blog-list.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      },
    });
  });
}

function createPortfolioPages(createPage, posts, portfolioPerPage) {
  const portfolioPost = path.resolve(`./src/components/templates/portfolio-post.js`)
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    
    createPage({
      path: '/portfolio/' + post.node.name,
      component: portfolioPost,
      context: {
        portfolioData: post.node,
        previous,
        next,
      },
    })
  })
  
  // Create portfolio post list pages
  const numPages = Math.ceil(posts.length / portfolioPerPage);
  
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/portfolio' + `/` : '/portfolio' + `/${i + 1}`,
      component: path.resolve('./src/components/templates/portfolio-list.js'),
      context: {
        limit: portfolioPerPage,
        skip: i * portfolioPerPage,
        numPages,
        currentPage: i + 1
      },
    });
  });
}


const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  

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
                      description
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
    const posts = result.data.allMarkdownRemark.edges
    createPostPages(createPage, posts, 2)


    // Create portfolio posts pages.
    const portfolios = result.data.allGithubData.edges[0].node.data.search.edges
    createPortfolioPages(createPage, portfolios, 2)
  })
}


// Create a node slug for each post in graphQL query. Slug is Link of post  
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}