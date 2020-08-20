import './style.scss'
import React from 'react'

import { CoreLayout as Layout } from '../../components/Layout/CoreLayout'
import SEO from '../../components/SEO';
import BreadcrumbNav from '../../components/BreadcrumbNav'
import SideBar from '../../components/Sidebar'
import PageFooter from '../../components/PageFooter'
import { toLocalTime } from '../../components/utils'

// import ReactMarkdown from 'react-markdown'
import axios from 'axios';
import { Row, Container, Col, Alert } from 'react-bootstrap'
import { HLine } from '../../components/HLine'
// import { Router } from "@reach/router";
import { DiscussionEmbed } from 'disqus-react';
import unified from 'unified'
import rehypeCustom from "../../utils/rehype-custom";
import remark2rehype from "remark-rehype";
import rehype2react from "rehype-react";
// import remark2react from "remark-react";

const parse =  require('remark-parse')
const qs = require('qs')

const processor = unified()
                    .use(parse, 
                      {
                        gfm: true,
                        commonmark:true,
                        footnotes: true,
                        pedantic: true,
                      })
                      // .use(remark2react);
                    .use(remark2rehype)
                    .use(rehypeCustom)
                    .use(rehype2react, {
                      createElement: React.createElement,
                      fragment: React.Fragment,
                    });



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

  componentWillUnmount() {
    this.setState({
      loading: false,
      errors: false,
      username: '',
      repo: {}
    })
  }

  shouldComponentUpdate() {
    return (!this.state.repo.html_url || !this.state.repo.readme) || this.state.loading || this.state.errors
  }

  render() {
    // console.log(this.data)
    // console.log(this.props)
    const base_url = this.props.base_url
    const prefix_page = 'portfolio/'
    const disqus_shortname = 'desenfirman'
    const disqus_config = {
      url: base_url + '/' + prefix_page + 'r/?name=' + this.props.name,
      identifier: prefix_page + 'r/?name=' + this.props.name,
      title: this.props.name,
    }

    
    // console.log(disqus_config)
    // console.log(this.state)
    const { name, description, created_at, pushed_at, language, license, html_url, readme, fork } = this.state.repo
    // console.log(processor.processSync(readme))
    // console.log(readme, this.state.repo)
    const content = this.props.name ?
      (
        this.state.loading ? (<p style={{ textAlign: `center`, marginTop: `35vh`, marginBottom: `35vh` }}>Please Hold on!</p>)
          : name && html_url && readme
            ? (
              <>
                <BreadcrumbNav breadcrumb_items={
                  [
                    { link: prefix_page, name: 'Portfolio' },
                    { link: prefix_page + 'r/?name=' + this.state.repo.name, name: this.state.repo.name },
                  ]
                } />
                <Row>
                  <main className='container-fluid'>
                    <table className={'detail'}>
                      <tbody>
                        <tr><td>Repository Name</td><td>:</td><td>{name}</td></tr>
                        <tr><td>Created At</td><td>:</td><td>{toLocalTime(created_at)}</td></tr>
                        <tr><td>Last Commit</td><td>:</td><td>{toLocalTime(pushed_at)}</td></tr>
                        <tr><td>Language</td><td>:</td><td>{language}</td></tr>
                        <tr><td>License</td><td>:</td><td>{license}</td></tr>
                        <tr><td>Forked Repository</td><td>:</td><td>{(fork) ? 'Yes' : 'No'}</td></tr>
                        <tr><td>Description</td><td>:</td><td>{description}</td></tr>
                      </tbody>
                    </table>

                    <HLine />
                    <Alert variant={'info'}>
                      You are now viewing README.md's repository, - <a href={html_url} target="_blank" rel="noopener noreferrer">View repo on GitHub</a>
                    </Alert>
                    <HLine />
                      <article className={'text-body'} style={{marginBottom: '6rem'}}>
                      <>
                        {
                          processor.processSync(readme).result.props.children
                        }
                      </>
                      </article>
                    
                    <HLine />
                  </main>
                  <Container fluid={true}>
                    {(this.state.repo.html_url) && <DiscussionEmbed shortname={disqus_shortname} config={disqus_config} />}
                  </Container>
                </Row>
              </>

            ) : (<p style={{ textAlign: `center`, marginTop: `35vh`, marginBottom: `35vh` }} 
                    dangerouslySetInnerHTML={
                      {__html:'Oh noes, something error :( <a href="javascript:window.location.href=window.location.href">Try Again</a>'}
                    }>
                    
                </p>)
      )
      : ''

    return (content)
  
  }

  fetchPortfolioData = async () => {
    await this.setState({
      loading: true,
      repo: {
        ...this.state.repo,
        name: this.props.name
      }
    })

    let repo_data = "https://api.github.com/repos/" + this.state.username + "/" + this.state.repo.name
    let readme_data = "https://api.github.com/repos/" + this.state.username + "/" + this.state.repo.name + "/readme"

    let repo = {}

    await axios
      .get(repo_data)
      .then((respRepoData) => {
        const { name, description, created_at, pushed_at, language, license, html_url, fork } = respRepoData.data
        repo = {
          name: (name) ? name : '<no name provided>',
          description: (description) ? description : '<no description provided>',
          created_at: (created_at) ? created_at : '<no date time provided>',
          pushed_at: (pushed_at) ? pushed_at : '<no date time provided>',
          language: (language) ? language : '<no language provided>',
          license: (license) ? license.name : '<no license provided>',
          html_url: (html_url) ? html_url : '#',
          fork,
          readme: ''
        }
      })
      .then(() => {
        this.setState({
          loading: false,
          repo
        })
      })
      .catch(errors => {
        this.setState({ loading: false, errors })
      })
    await this.setState({
      loading: true,
    })
    await axios
      .get(readme_data)
      .then((respReadmeData) => {
        // console.log(atob(respReadmeData.data.content))
        this.setState({
          loading: false,
          repo: {
            ...this.state.repo,
            readme: atob(respReadmeData.data.content)
          }

        })
      })
      .catch(errors => {
        this.setState({
          loading: false,
          repo: {
            ...this.state.repo,
            readme: '<No README.md provided>'
          }
        })
      })
  }
}

const PortfolioTemplate = (props) => {
const name = (props.location.search) ? qs.parse(props.location.search, { ignoreQueryPrefix: true }).name : 1
  const base_url = props.location.origin
  return (
    <Layout>
      <SEO title={name}/>
      <SideBar />
      <Container>
        <Row>
          <Col md={10} lg={8} className={'offset-md-1 offset-lg-2'}>
            <Container >
              <PortfolioRenderer name={name} base_url={base_url} />
            </Container>
          </Col>
        </Row>
      </Container>

      <PageFooter />

    </Layout>
  )
}

export default PortfolioTemplate
