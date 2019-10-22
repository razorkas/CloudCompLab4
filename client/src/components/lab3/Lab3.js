import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getDatasets } from '../../actions/lab3Actions';
import Table from './tables/Table';
import Spinner from '../common/Spinner';

import './tables/Table.css';
import './Lab3.css';

class Lab3 extends Component {
  componentDidMount() {
    this.props.getDatasets();
  }

  render() {
    const { filedata, loading } = this.props.lab3;

    let content;
    if (loading) {
      content = <Spinner />;
    } else {
      content = (
        <div className="container">
          <h1>Laboratory work 3</h1>
          <Link to="/" className="link-button">
            <span>Back To Main Page</span>
          </Link>
          <Table data={filedata} />
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

Lab3.propTypes = {
  getDatasets: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lab3: state.lab3
});

export default connect(
  mapStateToProps,
  { getDatasets }
)(Lab3);
