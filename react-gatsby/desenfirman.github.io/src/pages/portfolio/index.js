import React from 'react'
import Layout from '../../components/Layout'
// import { Link, graphql } from 'gatsby'
import SideBar from '../../components/Sidebar';
import PageFooter from '../../components/PageFooter';
import PortfolioCard from '../../components/templates/card';
import TopNav from '../../components/TopNav';
import axios from 'axios';
import SEO from '../../components/SEO';

import { Router, Link as ReachLink } from "@reach/router";
import PortfolioTemplate from '../../pages/portfolio/repo';


import { Container, Row, Col } from 'react-bootstrap';



class PortfolioIndex extends React.Component {
  state = {
    loading: false,
    error: false,
    portfolio: {
      items: []
    }
  }

  componentDidMount() {
    this.fetchPortfolioList()
  }

  query_data = {
    user: "desenfirman",
    topic: "portfolio"
  }


  render() {
    const { items } = this.state.portfolio
    const content = this.state.loading ? (<Container><p>Please hold on!</p></Container>) : items.length > 0 ? (
      items.map(node =>
        <PortfolioCard
          key={node.id}
          name={node.name}
          description={node.description}
          last_update={node.pushed_at}
          github_link={node.html_url}
          limit_desc={160}
        />
      )
    ) : (<Container><p>Oh noes, something error :(</p></Container>)


    return (
      <Layout>
        <SEO
          title={"Portfolio"}
        />
        <SideBar />

        <Container>
          <Col md={10} lg={8} className={'offset-md-1 offset-lg-2'}>
            <Container style={{ paddingTop: '0.25em' }}>
              <TopNav level_1={{link: '/portfolio', name: 'Portfolio'}} level_2={{link: '', name: 'Index'}} />

              <Row className={"d-flex flex-wrap"}>
                {content}
              </Row>
            </Container>
          </Col>
        </Container>
        <PageFooter />

        <Router>
                <PortfolioTemplate path={'portfolio/repo/:name'} />
        </Router>
        
      </Layout>

    )
  }

  fetchPortfolioList = () => {
    this.setState({ loading: true })
    axios
      .get("https://api.github.com/search/repositories?q=topic:" + this.query_data.topic + "+user:" + this.query_data.user)
      .then(api_req => {
        const items = api_req.data.items
        console.log(items)
        this.setState({
          loading: false,
          portfolio: {
            items
          }
        })
      })
      .catch(error => {
        this.setState({ loading: false, error })
      })
  }
}

export default PortfolioIndex

