import React from 'react'
import Layout from '../Layout'
import {Link, graphql} from 'gatsby'
import SideBar from '../Sidebar';
import PageFooter from '../PageFooter';

import {Container, Row, Col} from 'react-bootstrap';



class PortfolioIndex extends React.Component {

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allGithubData.edges[0].node.data.search.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? 'portfolio/' : 'portfolio/' + (currentPage - 1).toString()
    const nextPage = 'portfolio/' + (currentPage + 1).toString()
    return (
      <Layout location={this.props.location} title={siteTitle}>

        <SideBar />

        <Container >
          {posts.map(({ node }) => {
            const title = node.name || node.id
            return (
              <Row key={node.id}>
                <h3
                  style={{
                    marginBottom: 1 / 4,
                  }}
                >
                  <Link style={{ boxShadow: 'none' }} to={'/portfolio/' + node.name}>
                    {title}
                  </Link>
                </h3>
                <small>{node.pushedAt}</small>
                <p dangerouslySetInnerHTML={{ __html: (node.description !== null) ? node.description : "No description available" }} />
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
                  to={'portfolio' + `/${i === 0 ? '' : i + 1}`}
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

export default PortfolioIndex

export const portfolioQuery = graphql`
  query portfolioQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allGithubData(
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          data {
            search {
              edges {
                node {
                  name
                  id
                  url
                  description
                  pushedAt
                }
              }
            }
          }
          internal {
            type
          }
        }
      }
    }
  }
`