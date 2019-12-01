import React from 'react'
import { Row, Card, Button, Breadcrumb } from 'react-bootstrap'
import { Link } from 'gatsby'
import { HLine } from './HLine'


export default function TopNavBar({level_1, level_2}) {
    const limit = 20
    level_2.name = (level_2.name.length < limit) ? level_2.name : (level_2.name.substring(0, limit) + "...")
    return (
        <Row>
            <nav class="container" aria-label="breadcrumb" style={{ marginTop: '0.75em' }}>
                <div className={'d-flex justify-content-end'}>
                    <Breadcrumb >
                        <li className={'breadcrumb-item'}><Link to="/">Home</Link></li>
                        <li className={'breadcrumb-item'}><Link to={level_1.link}>{level_1.name}</Link></li>
                        <Breadcrumb.Item active>{level_2.name}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <HLine/>
            </nav>
        </Row>
    )
}

