import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'

export default function Header({ bar_text, onMenuClick = () => { } }) {

  return (
    <>
      <div className='nav'>
        <ul>
          <li>
            <Link to={'#'}
              onClick={e => {
                e.preventDefault();
                onMenuClick();
              }}
            >
              <FontAwesomeIcon icon='bars' fixedWidth /><span id='bar-text'>{bar_text}</span>
            </Link>
          </li>
          <li>
            <Link to={'/search'}
              activeClassName="active"

            // onClick={e => {
            //   e.preventDefault();
            //   onSearchClick();
            // }}
            >
              <FontAwesomeIcon icon='search' fixedWidth /><span>Search</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )

}
