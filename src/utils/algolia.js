// const pageQuery = `{
//     pages: allMarkdownRemark(
//       filter: {
//         fileAbsolutePath: { regex: "/pages/" },
//         frontmatter: {purpose: {eq: "page"}}
//       }
//     ) {
//       edges {
//         node {
//           objectID: id
//           frontmatter {
//             title
//             slug
//           }
//           excerpt(pruneLength: 5000)
//         }
//       }
//     }
//   }`
  
  const postQuery = `{
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
    ) {
      edges {
        node {
          objectID: id
          frontmatter {
            title
            date(formatString: "MMM D, YYYY")
            tags
          }
          fields{
            slug
          }
          excerpt(pruneLength: 5000)
        }
      }
    }
  }`
  
  const flatten = arr =>
    arr.map(({ node: { frontmatter, fields, ...rest } }) => ({
      ...frontmatter,
      ...fields,
      ...rest,
    }))
  const settings = { attributesToSnippet: [`excerpt:20`] }
  
  const queries = [
    // {
    //   query: pageQuery,
    //   transformer: ({ data }) => flatten(data.pages.edges),
    //   indexName: `Pages`,
    //   settings,
    // },
    {
      query: postQuery,
      transformer: ({ data }) => flatten(data.posts.edges),
      indexName: `Blog`,
      settings,
    },
  ]
  
  // console.log(queries[0].transformer)
  module.exports = queries
