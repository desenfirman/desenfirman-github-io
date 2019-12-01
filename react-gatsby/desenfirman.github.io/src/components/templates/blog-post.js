import React from 'react'
import { Link, graphql } from 'gatsby'

// import Bio from '../components/Bio'
import Layout from '../Layout'
import SEO from '../SEO'
// import { rhythm, scale } from '../utils/typography'
import SideBar from '../Sidebar';
import PageFooter from '../PageFooter';
import TopNav from '../TopNav'
import { Row, Container, Col } from 'react-bootstrap'
import { HLine } from '../HLine'


class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next, prefix_page } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt || 'nothin’'}
          // image={post.frontmatter.image.childImageSharp.sizes.src}
          pathname={post.fields.slug}
          article
        />
        <SideBar />
        <Container >
          <Row>
            <Col md={10} lg={8} className={'offset-md-1 offset-lg-2'}>
              <Container>
                <TopNav level_1={{link: prefix_page, name: 'Blog'}} level_2={{link: post.fields.slug, name: post.frontmatter.title}} />
                <Row>
                  <Container fluid={true}>
                    <main>
                    <p className={'time'}>Written on <time>{post.frontmatter.date}</time></p>
                      <h1>{post.frontmatter.title}</h1>
                      <HLine />
                      <article className={'text-body'} dangerouslySetInnerHTML={{ __html: post.html }} />
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
                          <Link style={{ fontSize: '0.75em' }} className={"btn btn-link"} to={previous.fields.slug} rel="prev">
                              « {previous.frontmatter.title}
                            </Link>
                          )}
                        </li>
                        <li>
                          {next && (
                          <Link style={{ fontSize: '0.75em' }} className={"btn btn-link"} to={next.fields.slug} rel="next">
                              {next.frontmatter.title} »
                            </Link>
                          )}
                        </li>
                      </ul>
                      <HLine />
                    </main>
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
      fields {
        slug
      }
    }
  }
`