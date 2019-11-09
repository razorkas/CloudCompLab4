import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import isEmpty from '../../validation/is-empty';
import Spinner from '../common/Spinner';
import { getData, findOrders } from '../../actions/lab4Actions';

import OrderTable from './table/Order';

import './table/Table.css';
import './Orders.css';

class Orders extends Component {
  componentDidMount() {
    this.props.getData();
  }

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // may change on hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  // mbmb

  onSubmit(e) {
    e.preventDefault();

    const { date } = this.state;
    console.log(date);

    if (!isEmpty(date)) {
      this.props.findOrders(date);
    } else {
      console.log('NO FULL ENTERED VALUES');
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      products,
      foundOrders,
      customers,
      orderItems,
      fetchError,
      loading
    } = this.props.lab4;

    const { errors } = this.state;

    let content;
    if (loading) {
      content = <Spinner />;
    } else {
      if (!isEmpty(fetchError)) {
        content = <p>{fetchError}</p>;
      } else {
        if (foundOrders.length !== 0) {
          content = (
            <OrderTable
              heading="Found"
              data={{ orders: foundOrders, customers, orderItems, products }}
            />
          );
        }
      }
    }

    return (
      <div className="container">
        <h3>
          Press find to search for orders made by customers after entered date
        </h3>
        <Link to="/lab4" className="link-button">
          <span>Back To Lab 4 Page</span>
        </Link>
        <div className="form-group">
          <input
            type="date"
            placeholder="Enter date"
            name="date"
            min={new Date(1960, 0, 1).toLocaleDateString('ru-RU')}
            max={new Date(Date.now()).toLocaleDateString('ru-RU')}
            onChange={this.onChange}
          />

          <button className="submit" onClick={this.onSubmit}>
            Find Orders
          </button>
        </div>
        <div>{content}</div>
      </div>
    );
  }
}

Orders.propTypes = {
  getData: PropTypes.func.isRequired,
  findOrders: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lab4: state.lab4
});

export default connect(
  mapStateToProps,
  { getData, findOrders }
)(Orders);
