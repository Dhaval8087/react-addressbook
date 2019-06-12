import './header.scss';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';

export default class Header extends Component {
  
  onAttributeClick = e => {
    this.context.router.history.push(`/${e.currentTarget.id}`);
  };
  render() {
    return (
      <Navbar color="gray" fixed={'top'} expand="md">
        <NavbarBrand>Address Book</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavItem
              onClick={this.onAttributeClick}
              id=""
            >
              Home
            </NavItem>
          </NavItem>
          <NavItem>
            <NavItem
              onClick={this.onAttributeClick}
              id="settings"
            >
              Settings
            </NavItem>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
Header.contextTypes = {
  router: PropTypes.object.isRequired
};
