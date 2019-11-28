import React from 'react'
import Layout from '../components/Layout'
import {Link, graphql} from 'gatsby'
import SideBar from '../components/Sidebar';
import PageFooter from '../components/PageFooter';
import PortfolioCard from '../components/templates/card';
import axios from 'axios';

import {Container, Row, Col} from 'react-bootstrap';



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
    return (
      <Layout>
        <SideBar />

        <Container >
        { 
          this.state.loading ? (
            <p>Please hold on!</p>
            ) : items.length > 0 ? (
              items.map(node =>
                <PortfolioCard name={node.name} description={node.description} last_update={node.lastUpdated}></PortfolioCard>
              )
          ) : (
            <p>Oh noes, something error :(</p>
          )
        }
        </Container>
        <PageFooter></PageFooter>
      </Layout>

    )
  }

  fetchPortfolioList = () => {
    this.setState({loading: true})
    axios
      .get("https://api.github.com/search/repositories?q=topic:" + this.query_data.topic + "+user:" + this.query_data.user)
      .then(api_req => {
        const items = api_req.data.items
        console.log(items)
        this.setState({
          loading:false,
          portfolio:{
            items
          }
        })
      })
      .catch(error => {
        this.setState({loading: false, error})
      })
  }
}

export default PortfolioIndex

