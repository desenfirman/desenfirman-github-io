import React from 'react'
import { Link, graphql } from 'gatsby'

// import Bio from '../components/Bio'
import Layout from '../Layout'
import SEO from '../SEO'
// import { rhythm, scale } from '../utils/typography'
import ReactMarkdown from 'react-markdown'


class PortfolioTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const {portfolioData, previous, next } = this.props.pageContext
    const post = portfolioData

    return (
      <Layout location={this.props.location}>
        <SEO
          title={"Blog"}
        />
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
        <ReactMarkdown source={(post.readme != null) ? post.readme.text : "No README.md file available for this repository"}></ReactMarkdown>
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

export default PortfolioTemplate

export const pageQuery = graphql`
  query portfolioDataPage{
    site {
      siteMetadata {
        title
      }
    }
  }
`