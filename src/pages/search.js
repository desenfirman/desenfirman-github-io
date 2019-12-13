import React from "react"
// import { Container, Logo } from "./styles"
// import Nav from "../Nav"
import { ContentLayout as Layout } from '../components/Layout/ContentLayout'
import { Container, Row } from 'react-bootstrap'
import Search from "../components/Search"
import {Link} from 'gatsby'
const searchIndices = [
    //   { name: `Pages`, title: `Pages`, hitComp: `PageHit` },
    { name: `Blog`, title: `Blog Posts`, hitComp: `PostHit` },
]

const SearchPages = (props) => {
    const groups = props.data.allMarkdownRemark.group
    console.table(groups)
    return (
        <Layout breadcrumb_items={[
            { link: '/search', name: 'Search' },
        ]}>
            <Container fluid={true}>
            <Row>
                <Container >
                    <h3>Search through this website</h3>
                    <Search indices={searchIndices} />
                </Container>
            </Row>
            <Row>
                <Container>
                    <br />
                    <h3>Or Browse by Tag</h3>
                    {
                        groups.map(tag => {
                            return (<Link to={'/blog' + "/tags/" + tag.fieldValue} class="badge badge-secondary">{tag.fieldValue} <span class="badge badge-light">{tag.totalCount}</span></Link>)
                        })
                    }
                </Container>
            </Row>
            </Container>
        </Layout>
    )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

export default SearchPages