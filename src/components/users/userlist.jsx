import './userlist.scss';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Col, Container, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';

import { filterUsers, getUsers, setCurrentPage } from '../../actions/useractions';
import AppContainer from '../common/appcontainer';
import UserDetails from './userdetails';

export class UserList extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      userDetails: {},
      searchString: ''
    };
    this.tableRef = React.createRef();
  }
  componentDidMount() {
    this.loadUsers();
    if (this.tableRef && this.tableRef.current) {
      this.tableRef.current.addEventListener('scroll', () => {
        if (
          this.tableRef.current.scrollTop + this.tableRef.current.clientHeight >=
          this.tableRef.current.scrollHeight
        ) {
          this.loadUsers();
        }
      });
    }
  }
  loadUsers() {
    if (this.props) {
      const currentPage = this.props.page + 1;
      this.props.setCurrentPage(currentPage);
      this.props.getUsers(currentPage, this.props.nat);
    }
  }
  loadDetails = event => {
    const findDetails = this.props.users.find(
      p => p.login.uuid === event.currentTarget.id
    );
    this.setState(prevState => ({
      isOpen: true,
      userDetails: findDetails
    }));
  };
  toggle = () => {
    this.setState(prevState => ({
      isOpen: false
    }));
  };
  handleChange = e => {
    const value = e.currentTarget.value;
    this.setState({
      searchString: value
    });
    this.props.filterUsers(value);
  };

  renderUsers = () => {
    const users = this.props.users;
    if (!users) return [];
    return users.map((item, index) => {
      return (
        <tr key={index} className="lead">
          <td>
            <img src={item.picture.thumbnail} alt={item.name} />
          </td>
          <td>{item.name.first}</td>
          <td>{item.name.last}</td>
          <td>{item.login.username}</td>
          <td>{item.email}</td>
          <td>
            <i
              className="fa fa-info-circle icon"
              id={item.login.uuid}
              onClick={this.loadDetails}
            />
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <AppContainer>
        <Container>
          <Row>
            <Col md={12}>
              <h2>Users List </h2>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Col md={3} className="pb-2 float-right mr-n3">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
                  <Input
                    value={this.searchString}
                    onChange={this.handleChange}
                  />
                </InputGroup>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div
                className="table-responsive table-grid my-custom-scrollbar"
                ref={this.tableRef}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th>Picture</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderUsers()}</tbody>
                </table>
                {this.props.isLoading ? (
                  <Loader
                    type="Watch"
                    color="#00BFFF"
                    height="100"
                    width="100"
                  />
                ) : null}
              </div>
            </Col>
          </Row>

          {this.state.isOpen ? (
            <UserDetails
              isOpen={this.state.isOpen}
              toggle={this.toggle}
              userDetails={this.state.userDetails}
            />
          ) : null}
        </Container>
      </AppContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.userReducer.users,
    isLoading: state.userReducer.isLoading,
    page: state.userReducer.page,
    nat: state.userReducer.nat
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUsers: bindActionCreators(getUsers, dispatch),
    setCurrentPage: bindActionCreators(setCurrentPage, dispatch),
    filterUsers: bindActionCreators(filterUsers, dispatch)
  };
};
UserList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
