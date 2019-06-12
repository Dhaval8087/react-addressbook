import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';

import { setLanguage } from '../../actions/useractions';
import AppContainer from '../common/appcontainer';


export class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownValue: 'US',
      dropDownOpen: false
    };
  }
  componentDidMount() {
    this.setState({
      dropDownValue: this.props.nat
    });
  }
  toggle = () => {
    this.setState(prevState => ({
      dropDownOpen: !prevState.dropDownOpen
    }));
  };
  onDropdownItem_Click = sender => {
    var icon = sender.currentTarget.querySelector('i');
    var newState = {
      dropDownValue: sender.currentTarget.getAttribute('dropdownvalue'),
      dropDownIcon: !!icon && icon.getAttribute('class')
    };

    this.setState(newState);
    if (!!this.props.onChange) {
      this.props.onChange(newState.dropDownValue);
    }
  };
  onSave = e => {
      this.props.setLanguage(this.state.dropDownValue);
      this.context.router.history.push('/');
  };
  render() {
    return (
      <AppContainer>
        <Container>
          <Row>
            <span className="pr-5">Select the Language: </span>
            <Dropdown
              isOpen={this.state.dropDownOpen}
              toggle={this.toggle}
              className={'ticket-module-selector ' + this.props.className}
            >
              <DropdownToggle color={this.props.color} caret>
                <i className={this.state.dropDownIcon} />
                {this.state.dropDownValue}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={this.onDropdownItem_Click}
                  dropDownValue="US"
                >
                  <i className="fa fa-flag" />
                  US
                </DropdownItem>
                <DropdownItem
                  onClick={this.onDropdownItem_Click}
                  dropDownValue="CH"
                >
                  <i className="fa fa-flag" />
                  CH
                </DropdownItem>
                <DropdownItem
                  onClick={this.onDropdownItem_Click}
                  dropDownValue="ES"
                >
                  <i className="fa fa-flag" />
                  ES
                </DropdownItem>
                <DropdownItem
                  onClick={this.onDropdownItem_Click}
                  dropDownValue="FR"
                >
                  <i className="fa fa-flag" />
                  FR
                </DropdownItem>
                <DropdownItem
                  onClick={this.onDropdownItem_Click}
                  dropDownValue="GB"
                >
                  <i className="fa fa-flag" />
                  GB
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Row>
          <Row className="pt-5">
            <Button color="primary" onClick={this.onSave}>
              Save
            </Button>
          </Row>
        </Container>
      </AppContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    nat: state.userReducer.nat
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLanguage: bindActionCreators(setLanguage, dispatch)
  };
};
UserSettings.contextTypes = {
  router: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettings);
