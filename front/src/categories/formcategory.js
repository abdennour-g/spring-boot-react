import React, { Component, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
//import { show } from "react-bootstrap/Modal";
export default class Formcategory extends Component {
  req = {
    add: {
      variant: "primary",
      gylphicon: "glyphicon glyphicon-plus",
      submit: "POST",
      title: "new category",
    },
    update: {
      variant: "info",
      gylphicon: "glyphicon glyphicon-pencil",
      submit: "PUT",
      title: "update category",
    },
    delete: {
      variant: "danger",
      gylphicon: "glyphicon glyphicon-trash",
      submit: "DELETE",
      title: "are you sure to delete this category?",
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      idCat: props.obj.idCat,
      designCat: props.obj.designCat,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    const requestOptions = {
      method: this.req[this.props.req].submit,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        this.props.req != "delete"
          ? {
              idCat: this.props.req == "add" ? null : this.state.idCat,
              designCat: this.state.designCat,
            }
          : { idCat: this.state.idCat }
      ),
    };
    fetch(
      this.props.req == "add"
        ? this.props.url + "/newCat"
        : this.props.req == "update"
        ? this.props.url + "/updateCat/" + this.state.idCat
        : this.props.url + "/deleteCat/" + this.state.idCat,
      requestOptions
    ).then((response) => {
      console.log(response);
      setTimeout(this.load(), 1000);
      return response.json();
    });

    event.preventDefault();
  };
  load = () => {
    fetch(this.props.url + "/all_categories")
      .then((res) => res.json())
      .then((data) => {
        this.hideModal();
        this.props.ourMethod(data);
      })
      .catch(console.log);
  };
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  modal = (show) => {};
  render() {
    if (this.props.req == "delete")
      return (
        <div>
          <Button
            variant={this.req[this.props.req].variant}
            className="add"
            onClick={this.showModal}
          >
            <span className={this.req[this.props.req].gylphicon}></span>
          </Button>
          <Modal show={this.state.show} onHide={this.hideModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.req[this.props.req].title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>idCat</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.idCat}
                    name="idCat"
                    disabled
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  as="input"
                  type="submit"
                  value="delete"
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.hideModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    else
      return (
        <div>
          <Button
            variant={this.req[this.props.req].variant}
            className="add"
            onClick={this.showModal}
          >
            <span className={this.req[this.props.req].gylphicon}></span>
          </Button>
          <Modal show={this.state.show} onHide={this.hideModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.req[this.props.req].title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>idCat</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.idCat}
                    name="idCat"
                    onChange={this.handleChange}
                    disabled
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>designCat</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.designCat}
                    name="designCat"
                    onChange={this.handleChange}
                    placeholder="designCat"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  as="input"
                  type="submit"
                  value="validate"
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.hideModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
  }
}
