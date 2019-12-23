import './style.scss'
import React, { useState } from 'react';
// import Footer from './Footer';
import  Header  from './Header';
import { StaticQuery, graphql } from 'gatsby';
import Nav from './Nav';
// const pic = require('../../assets/images/dese-firmansyah.jpg');
// import SearchOverlay from '../Search'



export default function SideBar() {
  const [headerOpen, toggleHeader] = useState(false);
  // const [isOverlayShow, showOverlay] = useState(false);


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
      <>
      <div
        className={`${headerOpen ? 'header-visible' : ' '}`}>
        {/* <TopNav
          title={config.authorName}
        /> */}
        <div id="header">
          <div className="top">
            <Header 
              bar_text={bar_text}
              onMenuClick={() => toggleHeader(!headerOpen)}
              // onSearchClick={() => showOverlay(!isOverlayShow)}
              />
            <Nav sections={sections} />
          </div>
          {/* <Footer socialLinks={config.socialLinks} /> */}
        </div>
      </div>
      {/* {isOverlayShow ? <SearchOverlay /> : null} */}
      </>
    );
  }} />

  return (sidebar);


}
