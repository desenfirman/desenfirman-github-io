import React from 'react'
import { Link, graphql } from 'gatsby'

import { ContentLayout as Layout } from '../components/Layout/ContentLayout'
import SEO from '../components/SEO'
import { Row, Container, Col } from 'react-bootstrap'
import { HLine } from '../components/HLine'


class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const prefix_page = '/blog'
    const { previous, next } = this.props.pageContext

    return (
      <Layout breadcrumb_items={[
        {link: prefix_page, name:'Blog'},
        {link: post.fields.slug, name:post.frontmatter.title},

      ]}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt || 'nothin’'}
          // image={post.frontmatter.image.childImageSharp.sizes.src}
          pathname={post.fields.slug}
          article
        />

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
                  <Link className={"btn btn-link"} to={previous.fields.slug} rel="prev">
                    « {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link className={"btn btn-link"} to={next.fields.slug} rel="next">
                    {next.frontmatter.title} »
                            </Link>
                )}
              </li>
            </ul>
            <HLine />
          </main>
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