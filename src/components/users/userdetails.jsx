import React, { Component } from 'react';
import { Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

export default class UserDetails extends Component {
  render() {
    const user = this.props.userDetails;
    if (!user) return null;
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader>
          {`${user.name.first} ${user.name.last}'s Details`}
        </ModalHeader>
        <ModalBody>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label>Street :  <b>{user.location.street}</b></Label>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>City : <b>{user.location.city}</b></Label>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label>State :  <b>{user.location.state}</b></Label>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>PostalCode : <b>{user.location.postcode}</b></Label>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label>Cell :  <b>{user.cell}</b></Label>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Phone : <b>{user.phone}</b></Label>
            </FormGroup>
          </Col>
        </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
