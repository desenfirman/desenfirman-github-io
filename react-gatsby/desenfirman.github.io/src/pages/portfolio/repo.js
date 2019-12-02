import React from 'react'
import { Link, graphql } from 'gatsby'

// import Bio from '../components/Bio'
import Layout from '../../components/Layout'
import SideBar from '../../components/Sidebar';
import PageFooter from '../../components/PageFooter';
import TopNav from '../../components/TopNav';
import SEO from '../../components/SEO'
// import { rhythm, scale } from '../utils/typography'
import ReactMarkdown from 'react-markdown'
import axios from 'axios';
import { Row, Container, Col } from 'react-bootstrap'
import { HLine } from '../../components/HLine'



class PortfolioTemplate extends React.Component {
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
    // console.log(this.state)
    const prefix_page = 'portfolio/'
    const page_link = prefix_page + 'repo/' + repo_name
    
    const content = this.props.name ?
      (
        this.state.loading ? (<p>Please Hold on!</p>)
          : repo_name && repo_description && repo_readme
            ? (

              <Row>
                <Col md={10} lg={8} className={'offset-md-1 offset-lg-2'}>
                  <Container>
                    <TopNav level_1={{ link: prefix_page, name: 'Portfolio' }} level_2={{ link: page_link, name: repo_name }} />
                    <Row>
                      <Container fluid={true}>
                        <main>
                          <p className={'time'}>Written on <time></time></p>
                          <h1>{repo_name}</h1>
                          <HLine />
                          <article className={'text-body'}>
                            <ReactMarkdown source={repo_readme} />
                          </article>
                          <HLine />
                          {/* <ul
                        style={{
                          display: `flex`,
                          flexWrap: `wrap`,
                          justifyContent: `space-between`,
                          listStyle: `none`,
                          padding: 0,
                        }}
                      >
                        <li>
                          {previous && (
                          <Link style={{ fontSize: '0.75em' }} className={"btn btn-link"} to={previous.fields.slug} rel="prev">
                              « {previous.frontmatter.title}
                            </Link>
                          )}
                        </li>
                        <li>
                          {next && (
                          <Link style={{ fontSize: '0.75em' }} className={"btn btn-link"} to={next.fields.slug} rel="next">
                              {next.frontmatter.title} »
                            </Link>
                          )}
                        </li>
                      </ul> */}
                          <HLine />
                        </main>
                      </Container>
                    </Row>
                  </Container>
                </Col>
              </Row>

            ) : (<p> Something Error</p>)
      )
      : ''

    return (
      <Layout>
        <SEO
          title={repo_name}
        />
        <SideBar />
        <Container >
          {content}
        </Container>
        {/* 
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
            {previous && (
              <Link to={'/portfolio/' + previous.name} rel="prev">
                ← {previous.name}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={'/portfolio/' + next.name} rel="next">
                {next.name} →
              </Link>
            )}
          </li>
        </ul> */}
      </Layout>
    )
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
          console.log(item)
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

export default PortfolioTemplate
