import React from 'react'
import Layout from '../Layout'
import {Link, graphql} from 'gatsby'
import SideBar from '../Sidebar';
import PageFooter from '../PageFooter';
import TopNav from '../TopNav'

import {Container, Row, Col} from 'react-bootstrap';



class BlogIndex extends React.Component {

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? 'blog/' : 'blog/' + (currentPage - 1).toString()
    const nextPage = 'blog/' + (currentPage + 1).toString()
    return (
      <Layout location={this.props.location} title={siteTitle}>

        <SideBar />

        <Container style={{paddingTop: '0.25em'}}>
          <TopNav/>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <Row key={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: 1 / 4,
                  }}
                >
                  <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </Row>
            )
          })}
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
              <Link to={prevPage} rel="prev">
                ← Previous Page
              </Link>
            )}
            {Array.from({ length: numPages }, (_, i) => (
              <li
                key={`pagination-number${i + 1}`}
                style={{
                  margin: 0,
                }}
              >
                <Link
                  to={'blog' + `/${i === 0 ? '' : i + 1}`}
                  style={{
                    padding: 1 / 4,
                    textDecoration: 'none',
                    color: i + 1 === currentPage ? '#ffffff' : '',
                    background: i + 1 === currentPage ? '#007acc' : '',
                  }}
                >
                  {i + 1}
                </Link>
              </li>
            ))}
            {!isLast && (
              <Link to={nextPage} rel="next">
                Next Page →
              </Link>
            )}
          </ul>
          
        
        </Container>
        <PageFooter></PageFooter>

            
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
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`