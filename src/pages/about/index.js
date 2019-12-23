import React from 'react'

import { ContentLayout as Layout } from '../../components/Layout/ContentLayout'
import SEO from '../../components/SEO'
import { Row, Col, Container } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

import summary from 'raw-loader!./summary.md';
import contact_me from 'raw-loader!./contact-me.md';
import work from 'raw-loader!./work-experience.md';
import credit from 'raw-loader!./credit-and-tool-for-web.md';

class About extends React.Component {
    render() {
        return (
            <Layout breadcrumb_items={[
                { link: '/about', name: 'About' },
            ]}>

                <SEO
                    title={'About'}
                />
                <Container fluid={true}>
                    <Row >
                        <Col>
                            <main className={'text-body'} >
                                <ReactMarkdown source={summary} />
                            </main>
                        </Col>
                    </Row>
                    <Row >

                        <Col >
                            <section className={'text-body'}>
                                <ReactMarkdown source={work} />
                            </section>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <section className={'text-body'} id="credit">
                                <ReactMarkdown source={credit} />
                            </section>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <section className={'text-body'} >
                                <ReactMarkdown source={contact_me} />
                            </section>
                        </Col>
                    </Row>
                </Container>

            </Layout>
        )
    }
}


export default About;