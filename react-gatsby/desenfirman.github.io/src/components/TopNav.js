import React from 'react'
import { Row, Card, Button } from 'react-bootstrap'


export default function TopNavBar() {
    return (
        <Row>
            <nav class="container-fluid" aria-label="breadcrumb">
                <div class="">
                    <ol class="breadcrumb float-right">
                        <li class="breadcrumb-item"><a href="/">desenfirman.github.io</a></li> 
                        <li class="breadcrumb-item active" aria-current="page">portfolio</li>
                        <li class="breadcrumb-item">index</li>
                    </ol>
                </div>

                <hr class="float-left" style={{width:'100%'}}/>
            </nav>
        </Row>
    )
}