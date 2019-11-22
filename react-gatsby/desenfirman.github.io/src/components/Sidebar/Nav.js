import React from 'react';
import Scrollspy from 'react-scrollspy';
import Scroll from '../Scroll';
import {Link} from 'gatsby';

export default function Nav({ sections = [] }) {
  return (
    <nav id="nav">
      <ul>
        <Scrollspy
          items={sections.map(s => s.id)}
          currentClassName="active"
          offset={-300}
        >
          {sections.map(s => {
            return (
              <li key={s.id}>
                  <Link to={`${s.id}`}>
                    <span className={`icon ${s.icon}`}><div className={`isToogle`}>{s.name}</div></span>
                  </Link>
              </li>
            );
          })}
        </Scrollspy>
      </ul>
    </nav>
  );
}
