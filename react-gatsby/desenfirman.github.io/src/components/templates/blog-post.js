import React from 'react'
import { Link, graphql } from 'gatsby'

// import Bio from '../components/Bio'
import Layout from '../Layout'
// import SEO from '../components/seo'
// import { rhythm, scale } from '../utils/typography'
import SideBar from '../Sidebar';
import PageFooter from '../PageFooter';
import TopNav from '../TopNav'
import { Row, Container, Col } from 'react-bootstrap'
import HLine from '../HLine'


class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        {/* <SEO title={post.frontmatter.title} description={post.excerpt} /> */}
        <SideBar />
        <Container >
          <Row>
            <Col md={8} className={'offset-md-2'}>
              <Container>
                <TopNav />
                <Row>
                  <Container fluid={true}>
                    <time><p>Written on {post.frontmatter.date}</p></time>
                    <h1>{post.frontmatter.title}</h1>
                    <HLine />
                    <div dangerouslySetInnerHTML={{ __html: post.html }} />
                    <HLine />
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
                          <Link style={{fontSize: '0.75em'}} className={"button-link"} to={previous.fields.slug} rel="prev">
                            « {previous.frontmatter.title}
                          </Link>
                        )}
                      </li>
                      <li>
                        {next && (
                          <Link style={{fontSize: '0.75em'}} className={"button-link"} to={next.fields.slug} rel="next">
                            {next.frontmatter.title} »
              </Link>
                        )}
                      </li>
                    </ul>
                    <HLine />
                  </Container>
                </Row>
              </Container>
            </Col>

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