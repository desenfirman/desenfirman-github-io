import './style.scss'
import React from 'react'

import { CoreLayout as Layout } from '../../components/Layout/CoreLayout'
import BreadcrumbNav from '../../components/BreadcrumbNav'
import SideBar from '../../components/Sidebar'
import PageFooter from '../../components/PageFooter'
import { toLocalTime } from '../../components/utils'

import ReactMarkdown from 'react-markdown'
import axios from 'axios';
import { Row, Container, Col, Alert } from 'react-bootstrap'
import { HLine } from '../../components/HLine'
import { Router } from "@reach/router";
import { DiscussionEmbed } from 'disqus-react';





class PortfolioRenderer extends React.Component {
  state = {
    loading: false,
    errors: false,
    username: 'desenfirman',
    repo: {
      name: '',
      description: '',
      created_at: '',
      pushed_at: '',
      language: '',
      license: '',
      html_url: '',
      readme: '',
    }
  }


  componentDidMount() {
    this.fetchPortfolioData();
  }

  render() {
    // console.log(this.data)
    const base_url = window.location.origin
    const prefix_page = 'portfolio/'
    const disqus_shortname = 'desenfirman'
    const disqus_config = {
      url: base_url + '/' + prefix_page + 'r/' + this.props.name,
      identifier: prefix_page + 'r/' + this.props.name,
      title: this.props.name,
    }
    console.log(disqus_config)
    const { name, description, created_at, pushed_at, language, license, html_url, readme } = this.state.repo
    const content = this.props.name ?
      (
        this.state.loading ? (<p style={{ textAlign: `center`, marginTop: `35vh`, marginBottom: `35vh` }}>Please Hold on!</p>)
          : name && description && readme
            ? (
              <>
                <BreadcrumbNav breadcrumb_items={
                  [
                    { link: prefix_page, name: 'Portfolio' },
                    { link: prefix_page + 'r/' + this.props.name, name: this.props.name },
                  ]
                } />
                <Row>
                  <main className='container-fluid'>
                    <table className={'detail'}>
                      <tr><td>Repository Name </td><td> : </td> <td>{name}</td></tr>
                      <tr><td>Created At      </td><td> : </td> <td>{toLocalTime(created_at)}</td></tr>
                      <tr><td>Last Commit     </td><td> : </td> <td>{toLocalTime(pushed_at)}</td></tr>
                      <tr><td>Language        </td><td> : </td> <td>{language}</td></tr>
                      <tr><td>License         </td><td> : </td> <td>{license}</td></tr>
                      <tr><td>Description     </td><td> : </td> <td>{description}</td></tr>
                    </table>

                    <HLine />
                    <Alert variant={'info'}>
                      You are now viewing README.md's repository, - <a href={html_url}>View repo on GitHub</a>
                    </Alert>
                    <HLine />
                    <article style={{marginBottom: '6rem'}}  className={'text-body'}>
                      <ReactMarkdown source={readme} />
                    </article>
                    <HLine />
                  </main>
                  <Container fluid={true}>
                    <DiscussionEmbed shortname={disqus_shortname} config={disqus_config} />
                  </Container>
                </Row>
              </>

            ) : (<p style={{ textAlign: `center`, marginTop: `35vh`, marginBottom: `35vh` }}>Oh noes, something error :(</p>)
      )
      : ''

    return (content)
  }

  fetchPortfolioData = async () => {
    this.setState({ loading: true })
    if (this.props.name) {
      let repo_data = "https://api.github.com/repos/" + this.state.username + "/" + this.props.name
      let readme_data = "https://api.github.com/repos/" + this.state.username + "/" + this.props.name + "/readme"

      const reqRepoData = axios.get(repo_data)
      const reqReadmeData = axios.get(readme_data)
      let repo = {}

      await axios
        .all([reqRepoData, reqReadmeData])
        .then(
          axios.spread((respRepoData, respReadmeData) => {
            console.log(respReadmeData)
            const { name, description, created_at, pushed_at, language, license, html_url } = respRepoData.data
            const readme = atob(respReadmeData.data.content)
            repo = {
              name: (name) ? name : '<no name provided>',
              description: (description) ? description : '<no description provided>',
              created_at: (created_at) ? created_at : '<no date provided>',
              pushed_at: (pushed_at) ? pushed_at : '<no date provided>',
              language: (language) ? language : '<no language provided>',
              license: (license) ? license.name : '<no license provided>',
              html_url: (html_url) ? html_url : '#',
              readme: (readme) ? readme : '<no readme provided>',
            }
          })
        )
        .then(() => {
          this.setState({
            loading: false,
            repo
          })
        })
        .catch(errors => {
          console.log(errors)
          this.setState({ loading: false, errors })
        })
    }
  }
}

const PortfolioTemplate = () => {
  return (
    <Layout>
      <SideBar />
      <Container>
        <Row>
          <Col md={10} lg={8} className={'offset-md-1 offset-lg-2'}>
            <Container >
              <Router>
                <PortfolioRenderer path={`/portfolio/r/:name`} />
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
