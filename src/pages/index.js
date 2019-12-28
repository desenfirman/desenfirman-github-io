import React from 'react';

import { CoreLayout as Layout } from '../components/Layout/CoreLayout';
import SideBar from '../components/Sidebar';
import Particles from 'react-particles-js';

import { Container, Row, Col } from 'react-bootstrap';
import SEO from '../components/SEO';

import { H3Typewriter, H1Typewriter, CodeTypewriter } from '../components/Typewriter'

const typewriter_heading = [
  "Hi,",
  <br key={'tybr1'} />,
  "I'm Dese",
]

const typewriter_summary = [
  "I recently graduated from Universitas Brawijaya as Bachelor of Computer Science.",
  "During college, I took AI & Machine Learning interdisciplinary field",
  "But, I also loved Web Development both front-end and back-end",
  "",
];

const date_time = new Date().toLocaleString();

const sc_information = [
  "import some_db_connector as db \n\n" +
  "class MyInformation: \n" +
  "   conn = db.connect('SOMEHOST', 'guest', \n" +
  "               '*******', 'SOMEDATABASE') \n" +
  "   query = 'SELECT email, twitter, linkedin, \n" +
  "               github FROM user_table \n" + 
  "               WHERE role=\"admin\"' \n\n" +
  "   def __init__(self): \n" +
  "      cursor = conn.cursor() \n" +
  "      cursor.execute(query) \n" +
  "      self.__result = cursor.fetchone() \n\n" +
  "   def getInformation(self): \n" +
  "      return self.__result \n\n" +
  ":qs\n" +
  "Saved as my_information.py !"
  ,
  "$ ipython\n" +
  "Python 3.x.x (default, " + date_time +")\n" +
  "IPython 7.x.x -- An enhanced Interactive Python.\n\n" +
  "In [1]: import my_information as my_i\n" +
  "In [2]: my_info = my_i.MyInformation()\n" +
  "In [3]: print(my_info.getInformation())\n\n"
  ,
  <ul style={{listStyleType: 'none', paddingLeft: '3rem'}}>
    <li>
      [
    </li>
    <li>&nbsp; "email": <a className={'myinfo'} href="mailto:desenfirman@gmail.com">"desenfirman@gmail.com"</a>,</li>
    <li>&nbsp; "twitter": <a className={'myinfo'} href="https://twitter.com/desenfirman">"@desenfirman"</a>,</li>
    <li>&nbsp; "linkedin": <a className={'myinfo'} href="https://www.linkedin.com/in/desenfirman/">"Dese Narfa Firmansyah"</a>,</li>
    <li>&nbsp; "github": <a className={'myinfo'} href="https://github.com/desenfirman">"desenfirman"</a>"</li>
    <li>
      ]
    </li>
  </ul>
]


const IndexPage = () => (
  <Layout style={{
    backgroundColor: "#1C3B59",
    zIndex: -2
  }}>
    <SEO />
    <Particles
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        backgroundColor: "#1C3B59",
      }}
      params={{
        particles: {
          number: {
            value: 40,
            density: { enable: false, value_area: 962.0472365193136 }
          },
          color: { value: "#b3b3b3" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 3 },
            image: { src: "img/github.svg", width: 100, height: 100 }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 12.181158184520175,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false, mode: "repulse" },
            onclick: { enable: false, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      }}
    />
    <SideBar />

    <Container
      fluid={false}>
      <Row>
        <Col lg={7} md={7} className="pt-3">
          <Container fluid={true}>
            <H1Typewriter
              className={'main-typewriter'}
              content={typewriter_heading} />
            <H3Typewriter is_repeat={true} content={typewriter_summary} />
          </Container>
        </Col>
        <Col lg={5} className="pt-3">
          <Container fluid={true}>
            <CodeTypewriter type_speed={1} speed_variance={10} content={sc_information} should_replaced={true} />
          </Container>
        </Col>
      </Row>
    </Container>
  </Layout>
);


export default IndexPage;
