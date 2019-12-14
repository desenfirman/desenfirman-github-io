import React from 'react';

import { CoreLayout as Layout } from '../components/Layout/CoreLayout';
import PageFooter from '../components/PageFooter';
import { Col, Row, Container, Image } from 'react-bootstrap'
import { Link } from 'gatsby'
import axios from 'axios'

class FourOhFour extends React.Component {
  meme_api_endpoint = 'https://meme-api.herokuapp.com/gimme'

  state = {
    loading: false,
    error: false,
    img: ''
  }

  componentDidMount() {
    this.fetchRandomMeme()
  }

  render() {
    const { img } = this.state
    // console.log(img)
    return (
      <Layout>
        <Container style={{ marginTop: '8vw', marginBottom: '6vw' }}>
          <Row>
            <Col md={4} lg={4} className={'offset-md-2 offset-lg-2'} style={{marginBottom: '6vw'}}>
              <h1 style={{ marginTop: '3vw' }}>four. zero. four.</h1>
              <p>Sorry, we can’t find that page that you’re looking for. You can try again by going back to the homepage.</p>
              <Link to={'/'} className="btn btn-info">Back to Homepage</Link>
            </Col>

            <Col md={3} lg={3} className={'offset-md-1 offset-lg-1'}>
              <p> But, don't be sad. Here a random meme for you ;) </p>
              <Image src={img} fluid style={{maxHeight: '18rem'}} />
            </Col>
          </Row>
        </Container>
        <PageFooter />
      </Layout>
    )
  }


  fetchRandomMeme = async () => {
    await this.setState({
      loading: true
    })
    await axios
      .get(this.meme_api_endpoint)
      .then(api_resp => {
        this.setState({
          img: api_resp.data.url,
          loading: false
        })
      })
      .catch(error => {
        this.setState({
          error
        })
      })
  }
}

export default FourOhFour;
