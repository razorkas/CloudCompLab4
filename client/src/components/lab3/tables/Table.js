import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';

import { addRecord, deleteRecord } from '../../../actions/lab3Actions';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      monthprice: '',
      yearprice: '',
      ssdcapacity: '',
      sites: '',
      mysqldbs: '',
      ramlimit: '',
      cpulimit: '',
      freedomain: '',
      freessl: '',
      siteconstr: '',
      scrinstall: '',
      hostplace: '',
      freetest: '',
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

    const recordData = {
      name: this.state.name,
      monthprice: this.state.monthprice,
      yearprice: this.state.yearprice,
      ssdcapacity: this.state.ssdcapacity,
      sites: this.state.sites,
      mysqldbs: this.state.mysqldbs,
      ramlimit: this.state.ramlimit,
      cpulimit: this.state.cpulimit,
      freedomain: this.state.freedomain,
      freessl: this.state.freessl,
      siteconstr: this.state.siteconstr,
      scrinstall: this.state.scrinstall,
      hostplace: this.state.hostplace,
      freetest: this.state.freetest
    };

    this.setState({
      name: '',
      monthprice: '',
      yearprice: '',
      ssdcapacity: '',
      sites: '',
      mysqldbs: '',
      ramlimit: '',
      cpulimit: '',
      freedomain: '',
      freessl: '',
      siteconstr: '',
      scrinstall: '',
      hostplace: '',
      freetest: ''
    });

    this.props.addRecord(recordData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDeleteClick(name) {
    this.props.deleteRecord(name);
  }

  render() {
    const { errors } = this.state;
    const { data } = this.props;
    let tableContent;

    const dataItems = data.map(item => (
      <tr key={item.name}>
        <td>{item.name}</td>
        <td>{item.monthprice}</td>
        <td>{item.yearprice}</td>
        <td>{item.ssdcapacity}</td>
        <td>{item.sites}</td>
        <td>{item.mysqldbs}</td>
        <td>{item.ramlimit}</td>
        <td>{item.cpulimit}</td>
        <td>{item.freedomain}</td>
        <td>{item.freessl}</td>
        <td>{item.siteconstr}</td>
        <td>{item.scrinstall}</td>
        <td>{item.hostplace}</td>
        <td>{item.freetest}</td>

        <td>
          <button
            onClick={this.onDeleteClick.bind(this, item.name)}
            className="btn btn-danger"
          >
            Delete
          </button>
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
              <th>name</th>
              <th>month price</th>
              <th>year price</th>
              <th>ssd capacity</th>
              <th>sites</th>
              <th>mysqldbs</th>
              <th>ram limit</th>
              <th>cpu limit</th>
              <th>free domain</th>
              <th>free ssl</th>
              <th>site constr</th>
              <th>scr install</th>
              <th>host place</th>
              <th>free test</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {dataItems}
            <tr>
              <td>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
              </td>
              <td>
                <TextFieldGroup
                  placeholder="Month"
                  name="monthprice"
                  value={this.state.monthprice}
                  onChange={this.onChange}
                  error={errors.monthprice}
                />
              </td>
              <td>
                <TextFieldGroup
                  placeholder="Year"
                  name="yearprice"
                  value={this.state.yearprice}
                  onChange={this.onChange}
                  error={errors.yearprice}
                />
              </td>
              <td>
                <TextFieldGroup
                  placeholder="SSD"
                  name="ssdcapacity"
                  value={this.state.ssdcapacity}
                  onChange={this.onChange}
                  error={errors.ssdcapacity}
                />
              </td>
              <td>
                <TextFieldGroup
                  placeholder="Sites"
                  name="sites"
                  value={this.state.sites}
                  onChange={this.onChange}
                  error={errors.sites}
                />
              </td>
              <td>
                <TextFieldGroup
                  placeholder="MySQL"
                  name="mysqldbs"
                  value={this.state.mysqldbs}
                  onChange={this.onChange}
                  error={errors.mysqldbs}
                />
              </td>
              <td>
                <TextFieldGroup
                  placeholder="RAM"
                  name="ramlimit"
                  value={this.state.ramlimit}
                  onChange={this.onChange}
                  error={errors.ramlimit}
                />
              </td>
              <td>
                <TextFieldGroup
                  placeholder="CPU"
                  name="cpulimit"
                  value={this.state.cpulimit}
                  onChange={this.onChange}
                  error={errors.cpulimit}
                />
              </td>
              <td>
                <TextFieldGroup
                  placeholder="Domain"
                  name="freedomain"
                  value={this.state.freedomain}
                  onChange={this.onChange}
                  error={errors.freedomain}
                />
              </td>
              <td>
                <TextFieldGroup
                  placeholder="SSL"
                  name="freessl"
                  value={this.state.freessl}
                  onChange={this.onChange}
                  error={errors.freessl}
                />
              </td>
              <td>
                <TextFieldGroup
                  placeholder="Constr"
                  name="freeconstr"
                  value={this.state.freeconstr}
                  onChange={this.onChange}
                  error={errors.freeconstr}
                />
              </td>
              <td>
                <TextFieldGroup
                  placeholder="Script"
                  name="scrinstall"
                  value={this.state.scrinstall}
                  onChange={this.onChange}
                  error={errors.scrinstall}
                />
              </td>
              <td>
                <TextFieldGroup
                  placeholder="Host"
                  name="hostplace"
                  value={this.state.hostplace}
                  onChange={this.onChange}
                  error={errors.hostplace}
                />
              </td>
              <td>
                <TextFieldGroup
                  placeholder="Period"
                  name="freetest"
                  value={this.state.freetest}
                  onChange={this.onChange}
                  error={errors.freetest}
                />
              </td>
              <td>
                <button onClick={this.onSubmit} className="btn btn-submit">
                  ADD
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    return (
      <div>
        <h4>{'<DATA NAME>'}</h4>
        {tableContent}
      </div>
    );
  }
}

Table.propTypes = {
  deleteRecord: PropTypes.func.isRequired,
  addRecord: PropTypes.func.isRequired
};

export default connect(
  null,
  { addRecord, deleteRecord }
)(Table);
