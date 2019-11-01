import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
  render() {
    const { data } = this.props;
    let tableContent;

    const dataItems = data.products.map(item => (
      <tr key={item._id}>
        <td>{item.prodName}</td>
        <td>
          {item.price} per {item.unit}
        </td>
        <td>{item.stock}</td>
        <td>{data.suppliers.find(sup => sup._id === item.supplier).supName}</td>
      </tr>
    ));

    if (data.length === 0) {
      tableContent = <p>Have No Data</p>;
    } else {
      tableContent = (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Supplier</th>
            </tr>
          </thead>
          <tbody>{dataItems}</tbody>
        </table>
      );
    }

    return (
      <div>
        <h4>Products</h4>
        {tableContent}
      </div>
    );
  }
}

Product.propTypes = {
  data: PropTypes.object.isRequired
};

export default Product;
