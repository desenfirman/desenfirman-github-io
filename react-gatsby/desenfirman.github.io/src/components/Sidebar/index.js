import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import { StaticQuery } from 'gatsby';
import Nav from './Nav';
import TopNav from './TopNav';
import config from '../../../config';
const pic = require('../../assets/images/avatar.png');



export default function SideBar() {
  const [headerOpen, toggleHeader] = useState(false);

  const sidebar = <StaticQuery query={graphql`
    query sectionsQuery {
      site {
        siteMetadata {
          nav {
            name
            path
          }
        }
      }
    }
    `
  } render={({
    site: {
      siteMetadata: {
        nav
      },
    },
  }) => {
    const sections = nav;


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
  }} />

  return (sidebar);


}
