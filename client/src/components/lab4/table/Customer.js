import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Customer extends Component {
  render() {
    const { data } = this.props;
    let tableContent;

    const dataItems = data.map(item => (
      <tr key={item._id}>
        <td>{item.custName}</td>
        <td>{item.custFax}</td>
        <td>{item.custTown}</td>
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
        <h4>{this.props.heading ? this.props.heading + ' ' : ''}Customers</h4>
        {tableContent}
      </div>
    );
  }
}

Customer.propTypes = {
  data: PropTypes.array.isRequired
};

export default Customer;
