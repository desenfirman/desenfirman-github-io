import React from 'react'

import { ContentLayout as Layout } from '../components/Layout/ContentLayout'
import { Link, graphql } from 'gatsby'
import { Divider, HLine } from '../components/HLine'
import SEO from '../components/SEO'

import { Container, Row, Col } from 'react-bootstrap';



class BlogIndex extends React.Component {

  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages, prefix_page } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? prefix_page + '/' : prefix_page + '/' + (currentPage - 1).toString()
    const nextPage = prefix_page + '/' + (currentPage + 1).toString()
    return (
      <Layout breadcrumb_items={[
        {link: prefix_page, name: 'Blog'},
      ]}>
        <SEO title={'Blog'} />
        <Container>
          {
            (this.props.pageContext.tag) ? 
              <><h5>List of posts by tag: {this.props.pageContext.tag}</h5><HLine/></>
            : <></>
          }
          {/* START of Post List */}
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <Row key={node.fields.slug}>
                <Container fluid={true} style={{ marginBottom: '1em', marginTop: '1em' }}>
                  <p className={'time'}>Written on <time>{node.frontmatter.date}</time></p>
                  <h1 >
                    <Link to={node.fields.slug}>
                      {title}
                    </Link>
                  </h1>
                  <p className="rd-t">{node.fields.readingTime.text}</p>
                  <p className={'text-body'} style={{ marginTop: '0.75em' }} dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                  <Col className={'d-flex justify-content-end'}>
                    <Link className={'btn btn-link float-right'} to={node.fields.slug}>Keep Reading</Link>
                  </Col>
                </Container>
                <Divider />
              </Row>
            )
          })}
          {/* END of Post List */}

          {/* START of Pagination */}
          <HLine />
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              listStyle: 'none',
              padding: 0,
            }}
          >
            {!isFirst && (
              <Link className={"btn btn-link"} to={prevPage} rel="prev">« Previous Page</Link>
            )}
            {Array.from({ length: numPages }, (_, i) => (
              <li
                key={`pagination-number${i + 1}`}
                style={{
                  margin: 0,
                }}
              >
                <Link className={"btn btn-link " + (i + 1 === currentPage ? 'disabled' : '')}
                  to={`blog/` + ((i === 0) ? '' : i + 1)}
                >
                  {i + 1}
                </Link>
              </li>
            ))}
            {!isLast && (
              <Link className={"btn btn-link"} to={nextPage} rel="next">Next Page »</Link>
            )}
          </ul>
          <HLine />
          {/* END of Pagination */}
        </Container>


      </Layout>

    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQueryWithTag($skip: Int!, $limit: Int!, $tag: String = "*") {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { frontmatter: { tags: { glob: $tag } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 280)
          fields {
            slug
            readingTime{
              text
            }
          }
          frontmatter {
            date(formatString: "DD MMMM YYYY")
            title
          }
        }
      }
    }
  }
`