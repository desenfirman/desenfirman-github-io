/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const blog_prefix_page = `/blog`
const lodash = require('lodash')

// Create blog post list pages
function createPostPages(createPage, posts, postsPerPage) {
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
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
        blog_prefix_page
      },
    })
  })

  // Create blog post list pages
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? blog_prefix_page + `/` : blog_prefix_page + `/${i + 1}`,
      component: path.resolve(`./src/templates/blog-list.js`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        prefix_page: blog_prefix_page,
      },
    });
  });
}

function createPostByTagsPages(createPage, tags, postsPerPage) {
  tags.forEach(tag => {
    const numPages = Math.ceil(tag.totalCount / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      const tag_path = lodash.kebabCase(tag.fieldValue)
      createPage({
        path: i === 0 ? blog_prefix_page + `/tags/${tag_path}` : blog_prefix_page + `/tags/${tag_path}/${i + 1}`,
        component: path.resolve(`./src/templates/blog-list.js`),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          blog_prefix_page,
          tag: tag.fieldValue
        },
      });
    });
  })
}


const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions


  return await graphql(
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
                tags
              }
            }
          }
            group(field: frontmatter___tags) {
              fieldValue
              totalCount
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

    // Creat post by tags page
    const tags = result.data.allMarkdownRemark.group
    createPostByTagsPages(createPage, tags, 2)

    // // Create portfolio posts pages.
    // const portfolios = result.data.allGithubData.edges[0].node.data.search.edges
    // createPortfolioPages(createPage, portfolios, 2)
  })
}


// Create a node slug for each post in graphQL query. Slugs are for Link of post  
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = blog_prefix_page + createFilePath({ node, getNode })
    // console.log(value)
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

//Create a meta page for portfolio repo



exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/portfolio\/r/)) {
    page.matchPath = "/portfolio/r/*"

    // Update the page.
    createPage(page)
  }
}
