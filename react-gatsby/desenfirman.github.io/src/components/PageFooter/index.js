import './style.scss'
import React from 'react';

export default function PageFooter() {
  return (
      <footer className='container-fluid' role="contentinfo">
        <p>
          Copyright © 2018 - Created with ♥ by desenfirman
        <br />
          <span className="credit">Powered by <a href="https://pages.github.com">Jekyll x GitHub Pages</a> | For more, more and more credit <a href="/about#credit">just click here</a></span>
        </p>
      </footer>
  );
}
