import React from 'react'
import { ContentLayout as Layout } from '../../components/Layout/ContentLayout';
import PortfolioCard from '../../components/PortfolioCard'
import axios from 'axios';
import SEO from '../../components/SEO';

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
    const content = this.state.loading ? (<Container><p style={{textAlign: `center`, marginTop:`28vh`, marginBottom:`28vh`}}>Please hold on!</p></Container>) : items.length > 0 ? (
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
    ) : (<Container><p style={{textAlign: `center`, marginTop:`28vh`, marginBottom:`28vh`}}>Oh noes, something error :(</p></Container>)


    return (
      <Layout breadcrumb_items={[
        {link: '/portfolio', name: 'Portfolio'},
      ]}>
        <SEO
          title={"Portfolio"}
        />
        <Container>
        <Row className={"d-flex flex-wrap"}>
          {content}
        </Row>
        </Container>
      </Layout>

    )
  }

  fetchPortfolioList = () => {
    this.setState({ loading: true })
    axios
      .get("https://api.github.com/search/repositories?q=topic:" + this.query_data.topic + "+user:" + this.query_data.user)
      .then(api_req => {
        const items = api_req.data.items
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

