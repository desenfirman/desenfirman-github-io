import React from 'react'
import { css } from '@emotion/core'


export default function HLine(){
    const line_break = require('../assets/img/hr-11.png')
    const hr_styling = css`
        height: 6px;
        background: url(${line_break}) repeat-x 0 0;
        border: 0;
        text-align: center;
        width: 100%;
    `
    return(
        <hr css={hr_styling} />
    )
}