import React from 'react';

import Layout from '../components/Layout';
import PageFooter from '../components/PageFooter';
import SideBar from '../components/Sidebar';
import Particles from 'react-particles-js';

import {Container, Row, Col} from 'react-bootstrap';

import pic2 from '../assets/images/pic02.jpg';
import pic3 from '../assets/images/pic03.jpg';
import pic4 from '../assets/images/pic04.jpg';
import pic5 from '../assets/images/pic05.jpg';
import pic6 from '../assets/images/pic06.jpg';
import pic7 from '../assets/images/pic07.jpg';
import pic8 from '../assets/images/pic08.jpg';
import Scroll from '../components/Scroll';

const sections = [
  { id: '/', name: 'Intro', icon: 'fa-home' },
  { id: '/blog', name: 'Posts', icon: 'fa-pen' },
  { id: '/portfolio', name: 'Portfolio', icon: 'fa-th' },
  { id: '/about', name: 'About Me', icon: 'fa-user' },
];

const typewriter_content = [ 
  "I am on my 4th year of studies in Universitas Brawijaya.", 
  "Taking Computer Science major degree and...", 
  "focusing at Artificial Intelligence & Machine Learning interdisciplinary field.", 
  "But, I also loved Web Development both front-end and back-end" , ""  
];



const IndexPage = () => (
  <Layout>
    <Particles 
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#2474A6",
        zIndex: -1,
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
    <SideBar sections={sections} />
    
    <Container
      style={{
        marginTop: '7vh'
      }}
      fluid={false}>
      <Row>
        <Col lg={7} md={7} className="pt-3">
          <Container fluid={true}>
            <h1 style={{
                marginTop: '50vh',
                fontSize: '3em'
              }}>Hi, <br></br>I'm Dese,
            </h1>
            <h3 class="typewrite" data-period="2000" data-type=''></h3>
          </Container>
        </Col>
        <Col lg={5} className="pt-3">
          <Container fluid={true}>
              y
          </Container>
        </Col>
      </Row>
    </Container>


    {/* 
        <div id="main"> 
        <section id="top" className="one dark cover">
          <div className="container">
            <header>
              <h2 className="alt">
                Hi! I'm <strong>Anubhav</strong>
                <br />
                Web developer
              </h2>
              <p>I have made few things check it out.</p>
            </header>

            <footer>
              <Scroll type="id" element={'portfolio'}>
                <a href="#portfolio" className="button">
                  Show me
                </a>
              </Scroll>
            </footer>
          </div>
        </section>

        <section id="portfolio" className="two">
          <div className="container">
            <header>
              <h2>Portfolio</h2>
            </header>

            <p>
              Life will feel it is always a great need for eu valley, the valley
              CNN ridiculous smile at any time chat mainstream clinical homes.
              Mauris floor was very warm and we need it. One customer now nibh
              Bureau dark pools behavior.
            </p>

            <div className="row">
              <div className="col-4 col-12-mobile">
                <article className="item">
                  <a href="/#" className="image fit">
                    <img src={pic2} alt="" />
                  </a>
                  <header>
                    <h3>Ipsum Feugiat</h3>
                  </header>
                </article>
                <article className="item">
                  <a href="/#" className="image fit">
                    <img src={pic3} alt="" />
                  </a>
                  <header>
                    <h3>Rhoncus Semper</h3>
                  </header>
                </article>
              </div>
              <div className="col-4 col-12-mobile">
                <article className="item">
                  <a href="/#" className="image fit">
                    <img src={pic4} alt="" />
                  </a>
                  <header>
                    <h3>Magna Nullam</h3>
                  </header>
                </article>
                <article className="item">
                  <a href="/#" className="image fit">
                    <img src={pic5} alt="" />
                  </a>
                  <header>
                    <h3>Natoque Vitae</h3>
                  </header>
                </article>
              </div>
              <div className="col-4 col-12-mobile">
                <article className="item">
                  <a href="/#" className="image fit">
                    <img src={pic6} alt="" />
                  </a>
                  <header>
                    <h3>Dolor Penatibus</h3>
                  </header>
                </article>
                <article className="item">
                  <a href="/#" className="image fit">
                    <img src={pic7} alt="" />
                  </a>
                  <header>
                    <h3>Orci Convallis</h3>
                  </header>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="three">
          <div className="container">
            <header>
              <h2>About Me</h2>
            </header>

            <a href="/#" className="image featured">
              <img src={pic8} alt="" />
            </a>

            <p>
              Developers football competition in diameter big price to layer the
              pot. Chavez ultricies care who wants to CNN. Lobortis elementum
              aliquet eget a den of which they do not hold it in hatred developers
              nor the mountains of the deposit slip. The element of time, sem ante
              ullamcorper dolor nulla quam placerat viverra environment is not
              with our customers. Free makeup and skirt until the mouse or
              partners or to decorate each targeted.
            </p>
          </div>
        </section>

        <section id="contact" className="four">
          <div className="container">
            <header>
              <h2>Contact</h2>
            </header>

            <p>
              The element of time, sem ante ullamcorper dolor nulla quam placerat
              viverra environment is not with our customers. Free makeup and skirt
              until the mouse. Japan this innovative and ultricies carton salad
              clinical ridiculous now passes from enhanced. Mauris pot innovative
              care for my pain.
            </p>

            <form method="post" action="#">
              <div className="row">
                <div className="col-6 col-12-mobile">
                  <input type="text" name="name" placeholder="Name" />
                </div>
                <div className="col-6 col-12-mobile">
                  <input type="text" name="email" placeholder="Email" />
                </div>
                <div className="col-12">
                  <textarea name="message" placeholder="Message" />
                </div>
                <div className="col-12">
                  <input type="submit" value="Send Message" />
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    */}
    
    {/* <PageFooter /> */}
  </Layout>
);

export default IndexPage;
