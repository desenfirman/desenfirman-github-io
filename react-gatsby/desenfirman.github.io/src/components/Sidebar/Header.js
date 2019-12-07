import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default function Header({bar_text, onMenuClick = () => {} }) {
  return (
    <div className='nav'>
    <ul>
      <li>
        <a href='#'
           onClick={e => {
            e.preventDefault();
            onMenuClick();
          }}
        >
          <FontAwesomeIcon icon='bars' fixedWidth/><span id='bar-text'>{bar_text}</span>
        </a>
      </li>
    </ul>
    </div>
  )
}
