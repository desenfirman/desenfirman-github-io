import React from 'react'
import { css } from '@emotion/core'


const HLine = function HLine() {
    const line_break = require('../assets/img/hr-11.png')
    const hr_styling = css`
        height: 6px;
        background: url(${line_break}) repeat-x 0 0;
        border: 0;
        text-align: center;
        width: 100%;
    `
    return (
        <hr css={hr_styling} />
    )
}

const Divider = function Divider() {
    const divider_img = require('../assets/img/divider.png')
    const divider_styl = css`
        width: 100%;
        height: 8ex;
        background-image: url(${divider_img});
        background-repeat: no-repeat;
        background-position: center; 
        background-size: 8rem auto;
    `
    return (
        <div css={divider_styl}></div>
    )
}

export {
    HLine,
    Divider
}