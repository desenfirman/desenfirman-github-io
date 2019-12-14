import './styles.scss'
import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

// import { SearchIcon, Form, Input } from "./styles"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default connectSearchBox(({ refine, ...rest }) => (
        <form className={'search-form'}>
            <input
                className={'search-input'}
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={e => refine(e.target.value)}
                {...rest}
            >
            </input>
                {/* <FontAwesomeIcon icon="search" style={{ pointerEvents: 'none' }} fixedWidth /> */}
        </form>
))
