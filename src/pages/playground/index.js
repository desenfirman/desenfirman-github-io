import React from 'react'

import { ContentLayout as Layout } from '../../components/Layout/ContentLayout'
import SEO from '../../components/SEO'
import { Row, Col, Container } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

import colab_notebooks from 'raw-loader!./colab-notebooks.md';

class Playground extends React.Component {
    render() {
        return (
            <Layout breadcrumb_items={[
                { link: '/playground', name: 'Playground' },
            ]}>

                <SEO
                    title={'Playground'}
                />
                <Container fluid={true}>
                    <Row >
                        <Col>
                            <main className={'text-body'} >
                                <ReactMarkdown source={colab_notebooks} />
                            </main>
                        </Col>
                    </Row>
                </Container>

            </Layout>
        )
    }
}


export default Playground;