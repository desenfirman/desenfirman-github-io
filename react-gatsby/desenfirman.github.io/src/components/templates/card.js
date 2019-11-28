import React from 'react'
import { Link, graphql } from 'gatsby'

import { Card, Button } from 'react-bootstrap'

export default function PortfolioCard({name, description, last_update}) {
    description = (description !== null) ? description : "No description available"
    return(
        <Card>
            <Card.Img/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Button variant='primary'>See README.md</Button>
                <Button variant='success'>Check on GitHub</Button>
            </Card.Body>
        </Card>
    )
}