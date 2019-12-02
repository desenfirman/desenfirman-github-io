import React from 'react'
import { Link, graphql } from 'gatsby'

// import Bio from '../components/Bio'
import Layout from '../../components/Layout'
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
    const content = this.state.loading ? (<p>Please Hold on!</p>) : repo_name && repo_description && repo_readme ? (
      <h1>{repo_description}</h1>
    ) : (<p> Something Error</p>)

    return (
      <>
        {content}
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
      </>
    )
  }

  fetchPortfolioData = () => {
    this.setState({ loading: true })
    let repo_data = "https://api.github.com/repos/" + this.repo_data.username + "/" + this.repo_data.repo_name
    let readme_data = "https://api.github.com/repos/" + this.repo_data.username + "/" + this.repo_data.repo_name + "/readme"

    const reqRepoData = axios.get(repo_data)
    const reqReadmeData = axios.get(readme_data)
    // console.log(reqRepoData)
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
      .then(x => {
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

export default PortfolioTemplate
