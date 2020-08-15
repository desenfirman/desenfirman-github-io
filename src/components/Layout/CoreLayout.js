import '../../assets/sass/main.scss';
import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'


library.add(fas)


class CoreLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreloaded: true,
    };
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ isPreloaded: false });
    }, 100);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    const { children } = this.props;
    const { isPreloaded } = this.state;
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              meta={[
                { name: 'keywords', content: 'desenfirman, developer, backend dev, data scientist, machine learning' },
                
              ]}
            >
              <html lang="en" />
              
            </Helmet>
            <div
              className={isPreloaded ? 'main-body is-preload' : 'main-body'}
              style={this.props.style}>
              
              {children}
            </div>

            
          </>
        )}
      />
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CoreLayout };
