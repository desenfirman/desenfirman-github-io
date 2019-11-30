import React from 'react'
import { Link, graphql } from 'gatsby'

// import Bio from '../components/Bio'
import Layout from '../Layout'
// import SEO from '../components/seo'
// import { rhythm, scale } from '../utils/typography'
import SideBar from '../Sidebar';
import PageFooter from '../PageFooter';
import TopNav from '../TopNav'
import { Row, Container } from 'react-bootstrap'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        {/* <SEO title={post.frontmatter.title} description={post.excerpt} /> */}
        <SideBar/>
        <Container style={{paddingTop: '0.25em'}}>
        <TopNav/>
        <Row>
        <Container fluid={true}>
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...0.5, //scale
            display: `block`,
            marginBottom: 0.5, //rhythm
            marginTop: 0.5, //rhythm
          }}
        >
          {post.frontmatter.date}
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
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
        </Container>
        </Row>
        </Container>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`