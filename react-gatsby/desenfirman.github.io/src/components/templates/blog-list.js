import React from 'react'
import Layout from '../Layout'
import { Link, graphql } from 'gatsby'
import SideBar from '../Sidebar';
import PageFooter from '../PageFooter';
import TopNav from '../TopNav'
import {Divider, HLine} from '../HLine'
import SEO from '../SEO'

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
      <Layout location={this.props.location}>
        <SEO
          title={"Blog"}
        />
        <SideBar />

        <Container>
          <Row>
            <Col md={10} lg={8} className={'offset-md-1 offset-lg-2'}>
              <Container >
                <TopNav level_1={{link: prefix_page, name: 'Blog'}} level_2={{link: '', name: 'Index'}}/>
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
                        <p className={'text-body'} style={{ marginTop: '0.75em' }} dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                        <Col className={'d-flex justify-content-end'}>
                          <Link className={'btn btn-link float-right'} to={node.fields.slug}>Keep Reading</Link>
                        </Col>
                      </Container>
                      <Divider/>
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
                      <Link className={"btn btn-link " + (i + 1 === currentPage ? 'disabled' : '' )}
                        to={'blog' + `/${i === 0 ? '' : i + 1}`}
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
            </Col>
          </Row>
        </Container>

        <PageFooter />

      </Layout>

    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 280)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`