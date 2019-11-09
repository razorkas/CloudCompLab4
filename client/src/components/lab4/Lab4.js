import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getData } from '../../actions/lab4Actions';
import CustomerTable from './table/Customer';
import SupplierTable from './table/Supplier';
import ProductTable from './table/Product';
import OrderTable from './table/Order';

import Spinner from '../common/Spinner';

import './table/Table.css';

class Lab4 extends Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    const {
      customers,
      orderItems,
      orders,
      products,
      suppliers,
      loading
    } = this.props.lab4;

    let content;
    if (loading) {
      content = <Spinner />;
    } else {
      content = (
        <div className="container">
          <h1>Laboratory work 4</h1>
          <Link to="/" className="link-button">
            <span>Back To Main Page</span>
          </Link>
          <Link to="/lab4/orders" className="link-button">
            <span>Find Orders</span>
          </Link>
          <div className="raw">
            <div className="left">
              <CustomerTable data={customers} />
            </div>
            <div className="right">
              <SupplierTable data={suppliers} />
            </div>
          </div>
          <ProductTable data={{ products, suppliers }} />
          <OrderTable data={{ orders, customers, orderItems, products }} />
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

Lab4.propTypes = {
  getData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lab4: state.lab4
});

export default connect(
  mapStateToProps,
  { getData }
)(Lab4);
