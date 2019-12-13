import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function TopNav({ title, }) {
  return (
    <div id="headerToggle">
      <a
        href="/#"
        className="toggle"
      >
        <FontAwesomeIcon icon='bars'/>
        {' '}
      </a>
    </div>
  );
}
