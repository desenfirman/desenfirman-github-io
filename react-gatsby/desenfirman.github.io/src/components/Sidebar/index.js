import './style.scss'
import React, { useState } from 'react';
// import Footer from './Footer';
import  Header  from './Header';
import { StaticQuery } from 'gatsby';
import Nav from './Nav';
import TopNav from './TopNav';
import config from '../../../config';
// const pic = require('../../assets/images/dese-firmansyah.jpg');




export default function SideBar() {
  const [headerOpen, toggleHeader] = useState(false);

  const sidebar = <StaticQuery query={graphql`
    query sectionsQuery {
      site {
        siteMetadata {
          url
          nav {
            name
            path
            icon
          }
        }
      }
    }
    `
  } render={({
    site: {
      siteMetadata: {
        url,
        nav
      },
    },
  }) => {
    const sections = nav;
    const bar_text = url;


    return (
      <div
        className={`${headerOpen ? 'header-visible' : ' '}`}>
        {/* <TopNav
          title={config.authorName}
        /> */}
        <div id="header">
          <div className="top">
            <Header 
              bar_text={bar_text}
              onMenuClick={() => toggleHeader(!headerOpen)}/>
            <Nav sections={sections} />
          </div>
          {/* <Footer socialLinks={config.socialLinks} /> */}
        </div>
      </div>
    );
  }} />

  return (sidebar);


}
