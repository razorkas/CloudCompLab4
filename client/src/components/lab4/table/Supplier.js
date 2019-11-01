import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Supplier extends Component {
  render() {
    const { data } = this.props;
    let tableContent;

    const dataItems = data.map(item => (
      <tr key={item._id}>
        <td>{item.supName}</td>
        <td>{item.supFax}</td>
        <td>{item.supTown}</td>
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
              <th>Fax</th>
              <th>Town</th>
            </tr>
          </thead>
          <tbody>{dataItems}</tbody>
        </table>
      );
    }

    return (
      <div>
        <h4>Suppliers</h4>
        {tableContent}
      </div>
    );
  }
}

Supplier.propTypes = {
  data: PropTypes.array.isRequired
};

export default Supplier;
