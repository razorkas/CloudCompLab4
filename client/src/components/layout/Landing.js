import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <Link to="/lab3" className="link-tab">
          To laboratory work 3
        </Link>

        <Link to="/lab4" className="link-tab">
          To laboratory work 4
        </Link>
      </div>
    );
  }
}

export default Landing;
