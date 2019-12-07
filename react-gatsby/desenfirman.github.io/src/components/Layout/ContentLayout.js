import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import {CoreLayout as Layout} from './CoreLayout'
import SideBar from '../Sidebar'
import TopNav from '../TopNav'
import PageFooter from '../PageFooter'


class ContentLayout extends Component {
    render() {
        const {breadcrumb_items, children} = this.props
        return (
            <Layout>
                <SideBar/>
                <Container>
                    <Row>
                        <Col md={10} lg={8} className={'offset-md-1 offset-lg-2'}>
                            <Container >
                                <TopNav breadcrumb_items={breadcrumb_items} />
                                <Row>
                                    {children}
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>

                <PageFooter />

            </Layout>
        )
    }
}

ContentLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ContentLayout }