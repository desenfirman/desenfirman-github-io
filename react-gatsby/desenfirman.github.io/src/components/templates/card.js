import React from 'react'
import { Link, graphql } from 'gatsby'

import { Col, Card, Button } from 'react-bootstrap'

export default function PortfolioCard({id, name, description, last_update, github_link, limit_desc}) {
    description = (description !== null) ? description : "No description available"
    return(
        <Col xl={6} lg={6} md={6}>
            <Card key={id} >
                <Card.Img/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Last commit: {last_update}</Card.Subtitle>
                    <Card.Text style={{minHeight: '7rem'}}>
                        { (description.length <= limit_desc) ? description : description.substring(0, limit_desc) + "..."}
                    </Card.Text>
                    
                    <Button variant='outline-primary' href='#' >Open README.md</Button>
                    {/* <Button variant='outline-success' href={github_link}>Check on GitHub</Button> */}
                </Card.Body>
            </Card>
        </Col>
    )
}
