import './style.scss'
import React from 'react'

const HLine = function HLine({w_love = false}) {
    return (
        <hr className={'style2 ' + ((w_love) ? 'w-love' : '')} />
    )
}

const Divider = function Divider() {
    return (
        <div className={'style1'}></div>
    )
}

export {
    HLine,
    Divider
}