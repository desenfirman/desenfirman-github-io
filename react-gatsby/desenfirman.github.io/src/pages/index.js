import React from 'react';

import { CoreLayout as Layout } from '../components/Layout/CoreLayout';
import SideBar from '../components/Sidebar';
import Particles from 'react-particles-js';

import { Container, Row, Col } from 'react-bootstrap';
import SEO from '../components/SEO';

import { H3Typewriter, H1Typewriter, CodeTypewriter } from '../components/Typewriter'

// import pic2 from '../assets/images/pic02.jpg';
// import pic3 from '../assets/images/pic03.jpg';
// import pic4 from '../assets/images/pic04.jpg';
// import pic5 from '../assets/images/pic05.jpg';
// import pic6 from '../assets/images/pic06.jpg';
// import pic7 from '../assets/images/pic07.jpg';
// import pic8 from '../assets/images/pic08.jpg';
// import Scroll from '../components/Scroll';

const typewriter_heading = [
  "Hi,",
  <br key={'tybr1'} />,
  "I'm Dese",
]

const typewriter_summary = [
  "I am on my 4th year of studies in Universitas Brawijaya.",
  "Taking Computer Science major degree and...",
  "focusing at Artificial Intelligence & Machine Learning interdisciplinary field.",
  "But, I also loved Web Development both front-end and back-end",
  "",
];

const sc_information = [
  "import SomeDBConnector as db \n\n" +
  "class MyInformation: \n" +
  "   conn = db.connect('SOMEHOST', 'guest', \n" +
  "               '*******', 'SOMEDATABASE') \n" +
  "   cursor = conn.cursor() \n\n" +
  "   query = 'SELECT email, instagram, twitter, \n" +  
  "               linkedin, github FROM user_table \n" + 
  "               WHERE username=\"desenfirman\"' \n\n" +
  "   def __init__(self): \n" +
  "      cursor.execute(query) \n" +
  "      self.__result = cursor.fetchone() \n\n" +
  "   def getEmailData(): \n" +
  "      return self.__result[0] \n\n" +
  "   def getInstagramData(): \n" +
  "      return self.__result[1] \n\n" +
  "   def getTwitterData(): \n" +
  "      return self.__result[2] \n\n" +
  "   def getLinkedInData(): \n" +
  "      return self.__result[3] \n\n" +
  "   def getGithubData(): \n" +
  "      return self.__result[4]"
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
            <CodeTypewriter type_speed={10} speed_variance={50} content={sc_information} />
          </Container>
        </Col>
      </Row>
    </Container>
  </Layout>
);


export default IndexPage;
