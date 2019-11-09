import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Order extends Component {
  getOrderItems(ids, orderItems) {
    let items = [];

    orderItems.forEach(item => {
      if (ids.includes(item._id)) {
        items.push(item);
      }
    });

    return items;
  }

  getProducts(orderItems, products) {
    let prods = [];

    orderItems.forEach(item => {
      prods.push(products.find(prod => prod._id === item.product).prodName);
    });

    // console.log(prods);

    return prods.map(prod => <p key={Math.random()}>{prod}</p>);
  }

  getQuantity(orderItems) {
    let quants = [];

    orderItems.forEach(item => {
      quants.push(item.quantity);
    });

    return quants.map(quant => <p key={quant}>{quant}</p>);
  }

  getPrices(orderItems, products) {
    let prices = [];

    orderItems.forEach(item => {
      prices.push(
        item.quantity * products.find(prod => prod._id === item.product).price
      );
    });

    return prices.map(price => <p key={price}>{Math.floor(price)}</p>);
  }

  render() {
    const { data } = this.props;
    let tableContent;

    const dataItems = data.orders.map(item => (
      <tr key={item._id}>
        <td>
          {data.customers.find(cust => cust._id === item.customer).custName}
        </td>
        <td>{item.executed ? <span>&#9745;</span> : <span>&#9746;</span>}</td>
        <td>{item.paid ? <span>&#9745;</span> : <span>&#9746;</span>}</td>
        <td>{new Date(item.date).toLocaleDateString('ru-RU')}</td>

        <td>
          {this.getProducts(
            this.getOrderItems(item.orderItems, data.orderItems),
            data.products
          )}
        </td>
        <td>
          {this.getQuantity(
            this.getOrderItems(item.orderItems, data.orderItems)
          )}
        </td>
        <td>
          {this.getPrices(
            this.getOrderItems(item.orderItems, data.orderItems),
            data.products
          )}
        </td>
      </tr>
    ));

    if (data.length === 0) {
      tableContent = <p>Have No Data</p>;
    } else {
      tableContent = (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Executed</th>
              <th>Paid</th>
              <th>Date</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>{dataItems}</tbody>
        </table>
      );
    }

    return (
      <div>
        <h4>{this.props.heading ? this.props.heading + ' ' : ''}Orders</h4>
        {tableContent}
      </div>
    );
  }
}

Order.propTypes = {
  data: PropTypes.object.isRequired
};

export default Order;
