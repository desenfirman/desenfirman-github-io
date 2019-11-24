import React from 'react'
import { Link, graphql } from 'gatsby'

// import Bio from '../components/Bio'
import Layout from '../components/Layout'
// import SEO from '../components/seo'
// import { rhythm, scale } from '../utils/typography'

class portfolioTemplate extends React.Component {
  render() {
    const post = this.props.data.githubData.data.search.edges[0].node
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        {/* <SEO title={post.frontmatter.title} description={post.excerpt} /> */}
        <h1>{post.name}</h1>
        <p
          style={{
            ...0.5, //scale
            display: `block`,
            marginBottom: 0.5, //rhythm
            marginTop: 0.5, //rhythm
          }}
        >
          {post.pushedAt}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: 0.5 ,//rhythm
          }}
        />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={'/portfolio/' + previous.name} rel="prev">
                ← {previous.name}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={'/portfolio/' + next.name} rel="next">
                {next.name} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default portfolioTemplate

export const pageQuery = graphql`
  query portPostBySlug($name: String!) {
    site {
      siteMetadata {
        title
      }
    }
    githubData(data: {search: {edges: {elemMatch: {node: {name: {eq: $name}}}}}}) {
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
`