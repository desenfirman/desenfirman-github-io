import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import TopNav from './TopNav';
import config from '../../../config';
const pic = require('../../assets/images/avatar.png');

const sections_data = [
  { id: '/', name: 'Intro', icon: 'fa-home' },
  { id: '/blog', name: 'Posts', icon: 'fa-pen' },
  { id: '/portfolios', name: 'Portfolio', icon: 'fa-th' },
  { id: '/about', name: 'About Me', icon: 'fa-user' },
];

export default function SideBar({ sections = sections_data }) {
  const [headerOpen, toggleHeader] = useState(false);
  return (
    <div
      className={`${headerOpen ? 'header-visible' : ' '}`}>
      <TopNav
        title={config.authorName}
        onMenuClick={() => toggleHeader(!headerOpen)}
      />
      <div id="header">
        <div className="top">
          <Header 

            // avatar={pic}
            // title={config.authorName}
            // heading={config.heading}
          />
          <Nav sections={sections} />
        </div>
        {/* <Footer socialLinks={config.socialLinks} /> */}
      </div>

      {/* <section id="header">
        <Header
          avatar={pic}
          title={config.authorName}
          heading={config.heading}
        />
        <Nav sections={sections} />
        <Footer socialLinks={config.socialLinks} />
      </section> */}
    </div>
  );
}
