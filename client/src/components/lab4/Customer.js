import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import isEmpty from '../../validation/is-empty';
import Spinner from '../common/Spinner';
import TextFieldGroup from '../common/TextFieldGroup';
import { getData, findCustomers } from '../../actions/lab4Actions';

import CustomerTable from './table/Customer';

import './table/Table.css';
import './Customer.css';

class Customer extends Component {
  componentDidMount() {
    this.props.getData();
  }

  constructor(props) {
    super(props);
    this.state = {
      productId: '',
      price: '',
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

    const { productId, price } = this.state;
    if (!isEmpty(productId) && !isEmpty(price)) {
      this.props.findCustomers(productId, price);
    } else {
      console.log('NO FULL ENTERED VALUES');
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { products, foundCustomers, fetchError, loading } = this.props.lab4;

    const { errors } = this.state;

    let content;
    if (loading) {
      content = <Spinner />;
    } else {
      if (!isEmpty(fetchError)) {
        content = <p>{fetchError}</p>;
      } else {
        if (foundCustomers.length !== 0) {
          content = <CustomerTable heading={'Found'} data={foundCustomers} />;
        }
      }
    }

    return (
      <div className="container">
        <h3>
          Press find to search for customers with orders on specified summary
        </h3>
        <Link to="/lab4" className="link-button">
          <span>Back To Lab 4 Page</span>
        </Link>
        <div className="form-group">
          <select name="productId" onChange={this.onChange}>
            <option value="NO_VALUE">Choose a product</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>
                {product.prodName}
              </option>
            ))}
          </select>
          <TextFieldGroup
            placeholder="Price"
            name="price"
            value={this.state.price}
            onChange={this.onChange}
            error={errors.price}
          />
          <button onClick={this.onSubmit}>Find Customers</button>
        </div>
        <div>{content}</div>
      </div>
    );
  }
}

Customer.propTypes = {
  getData: PropTypes.func.isRequired,
  findCustomers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lab4: state.lab4
});

export default connect(
  mapStateToProps,
  { getData, findCustomers }
)(Customer);
