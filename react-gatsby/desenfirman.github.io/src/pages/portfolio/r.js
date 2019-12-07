import React from 'react'

import { CoreLayout as Layout } from '../../components/Layout/CoreLayout'
import TopNavBar from '../../components/TopNav'
import SideBar from '../../components/Sidebar'
import PageFooter from '../../components/PageFooter'
import {toLocalTime} from '../../components/utils'

import ReactMarkdown from 'react-markdown'
import axios from 'axios';
import { Row, Container, Col } from 'react-bootstrap'
import { HLine } from '../../components/HLine'
import { Router } from "@reach/router";




class ContentRenderer extends React.Component {
  state = {
    loading: false,
    errors: false,
    item: {
      repo_name: '',
      repo_description: '',
      repo_readme: '',
    }
  }


  componentDidMount() {
    this.fetchPortfolioData();
  }

  repo_data = {
    username: 'desenfirman',
    repo_name: this.props.name
  }

  render() {
    const { repo_name, repo_description, repo_readme } = this.state.item
    // console.log(this.repo_data)

    const prefix_page = 'portfolio/'
    const content = this.props.name ?
      (
        this.state.loading ? (<p style={{textAlign: `center`, marginTop:`35vh`, marginBottom:`35vh`}}>Please Hold on!</p>)
          : repo_name && repo_description && repo_readme
            ? (
              <>
              <TopNavBar breadcrumb_items={
                [
                  {link: prefix_page, name:'Portfolio'},
                  {link: prefix_page + 'r/' + this.props.name, name:this.props.name},
                ]
              }/>
              <Row>
              <main className='container-fluid'>
                <p className={'time'}>Written on <time></time></p>
                <h1>{repo_name}</h1>
                <HLine />
                <article className={'text-body'}>
                  <ReactMarkdown source={repo_readme} />
                </article>
                <HLine />
                <HLine />
              </main>
              </Row>
              </>

            ) : (<p style={{textAlign: `center`, marginTop:`35vh`, marginBottom:`35vh`}}>Oh noes, something error :(</p>)
      )
      : ''

    return (content)
  }

  fetchPortfolioData = () => {
    this.setState({ loading: true })
    if (this.props.name) {
      let repo_data = "https://api.github.com/repos/" + this.repo_data.username + "/" + this.repo_data.repo_name
      let readme_data = "https://api.github.com/repos/" + this.repo_data.username + "/" + this.repo_data.repo_name + "/readme"

      const reqRepoData = axios.get(repo_data)
      const reqReadmeData = axios.get(readme_data)
      let item = {}

      axios
        .all([reqRepoData, reqReadmeData])
        .then(
          axios.spread((respRepoData, respReadmeData) => {
            item = {
              repo_name: respRepoData.data.name,
              repo_description: respRepoData.data.description,
              repo_readme: atob(respReadmeData.data.content)
            }
          })
        )
        .then(() => {
          this.setState({
            loading: false,
            item: item
          })
        })
        .catch(errors => {
          this.setState({ loading: false, errors })
        })
    }
  }
}

const PortfolioTemplate = () => {
  return (
    <Layout>
      <SideBar/>
      <Container>
        <Row>
          <Col md={10} lg={8} className={'offset-md-1 offset-lg-2'}>
            <Container >
              <Router>
                <ContentRenderer path={`/portfolio/r/:name`} />
              </Router>
            </Container>
          </Col>
        </Row>
      </Container>

      <PageFooter />

    </Layout>
  )
}


export default PortfolioTemplate
