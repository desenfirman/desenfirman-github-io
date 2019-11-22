import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';


export default function PageFooter() {
  return (
    <Row id="footer">
      <ul className="copyright">
        <li>&copy; Untitled. All rights reserved.</li>
        <li>
          Design: <a href="http://html5up.net">HTML5 UP</a>
        </li>
        <li>
          Demo Images: <a href="http://unsplash.com/">Unsplash</a>
        </li>
      </ul>
    </Row>
  );
}
