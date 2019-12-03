import React from 'react'
import { Row, Breadcrumb } from 'react-bootstrap'
import { Link } from 'gatsby'
import { HLine } from './HLine'


export default function TopNavBar({breadcrumb_items}) {
    const limit = 20
    return (
        <Row>
            <nav className={`container`} aria-label="breadcrumb" style={{ marginTop: '0.75em' }}>
                <div className={`d-flex justify-content-end`}>
                    <Breadcrumb >
                        <li className={`breadcrumb-item`}><Link to={`/`}>Home</Link></li>
                        {
                            breadcrumb_items.map((node, i, arr) => {
                                const node_name = (node.name.length < limit) ? node.name : (node.name.substring(0, limit) + `...`)
                                return (
                                    <li key={node.link} className={((arr.length - 1 === i) ? `active` : ``)  + ` breadcrumb-item`}>
                                        <Link to={node.link}>{node_name}</Link>
                                    </li>
                                )
                            })
                        }
                    </Breadcrumb>
                </div>
                <HLine />
            </nav>
        </Row>
    )
}

