import React from 'react'
import { ContentLayout as Layout } from '../../components/Layout/ContentLayout';
import PortfolioCard from '../../components/PortfolioCard'
import axios from 'axios';
import SEO from '../../components/SEO';
import { toLocalTime } from '../../components/utils'
import { HLine } from '../../components/HLine'
import { Container, Row } from 'react-bootstrap';
import PropTypes from "prop-types";

// import { Link as ReachLink, Router, Redirect } from '@reach/router';

const qs = require('qs')


class PortfolioListRenderer extends React.Component {
  state = {
    loading: false,
    error: false,
    url: "",
    next: null,
    prev: null,
    last: null,
    items: [],

  }
  per_page = 4
  user = "desenfirman"
  topic = "portfolio"


  componentDidMount() {
    this.fetchPortfolioList()
  }

  render() {
    const items = this.state.items
    // console.log(this.state)
    const content = this.state.loading ? (<Container><p style={{ textAlign: `center`, marginTop: `28vh`, marginBottom: `28vh` }}>Please hold on!</p></Container>) : items.length > 0 ? (
      items.map(node =>
        <PortfolioCard
          key={node.id}
          name={node.name}
          description={node.description}
          last_update={toLocalTime(node.pushed_at)}
          github_link={node.html_url}
          limit_desc={160}
        />
      )
    ) : (<Container><p style={{ textAlign: `center`, marginTop: `28vh`, marginBottom: `28vh` }}>Oh noes, something error :(</p></Container>)


    return (
      <Container>
        <Row className={"d-flex flex-wrap"}>
          {content}
        </Row>
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
            <a className={"btn btn-link " + (!this.state.prev ? "disabled" : "")} href={'/portfolio?p=' + this.state.prev} >
              « Previous
              </a>
          </li>
          <li>
            <a className={"btn btn-link " + (!this.state.next ? "disabled" : "")} href={'/portfolio?p=' + this.state.next} >
              Next »
              </a>
          </li>
        </ul>
        <HLine />
      </Container>
    )
  }

  fetchPortfolioList = async () => {
    const page_number = this.props.page_number
    // console.log(page_number)
    await this.setState({
      url: (
        "https://api.github.com/search/repositories?q=" +
        "user:" + this.user +
        "+topic:" + this.topic +
        "+fork:true" +
        "&page=" + page_number +
        "&per_page=" + this.per_page + ""
      ),
      loading: true,
    })
    const octopage = require('github-pagination')
    await axios
      .get(this.state.url)
      .then(api_req => {
        const items = api_req.data.items
        const {next, prev, last} = (api_req.headers.link) ? octopage.parser(api_req.headers.link): {next: null, prev:null, last:null}
        // console.log(items)
        this.setState({
          loading: false,
          next,
          prev,
          last,
          items
        })
      })
      .catch(error => {
        this.setState({ loading: false, error })
      })
  }
}


PortfolioListRenderer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  prev: PropTypes.string,
  next: PropTypes.string,
  last: PropTypes.string,
  items: PropTypes.array,
}

export default function PortfolioListPage(props) {
  const page_number = (props.location.search) ? qs.parse(props.location.search, { ignoreQueryPrefix: true }).p : 1
  return (
    <Layout breadcrumb_items={[
      { link: '/portfolio', name: 'Portfolio' },
    ]}>
      <SEO
        title={"Portfolio"}
      />

      <PortfolioListRenderer page_number={page_number} />

    </Layout>
  )
}



