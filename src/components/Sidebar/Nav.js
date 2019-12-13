import React from 'react';
import {Link} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default function Nav({ sections = [] }) {
  return (
    <nav className="nav">
      <ul>
          {sections.map(s => {
            return (
              <li key={s.path}>
                  <Link 
                    activeClassName="active"
                    to={`${s.path}`}
                    partiallyActive={(s.path !== '/') ? true : false}>
                    <FontAwesomeIcon icon={s.icon} fixedWidth/><span className={`isToogle`}> {s.name} </span>
                  </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
