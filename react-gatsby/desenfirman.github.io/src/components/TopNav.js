import React from 'react'
import { Row, Card, Button, Breadcrumb } from 'react-bootstrap'
import { Link } from 'gatsby'
import HLine from './HLine'


export default function TopNavBar() {
    return (
        <Row>
            <nav class="container" aria-label="breadcrumb" style={{ marginTop: '0.75em' }}>
                <div className={'d-flex justify-content-end'}>
                    <Breadcrumb >
                        <li className={'breadcrumb-item'}><Link href="/">Home</Link></li>
                        <li className={'breadcrumb-item'}><Link href="/">Portfolio</Link></li>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <HLine/>
            </nav>
        </Row>
    )
}

