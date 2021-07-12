import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
//import { show } from "react-bootstrap/Modal";
export default class Formproduct extends Component {
  redirect = false;
  req = {
    add: {
      variant: "primary",
      gylphicon: "glyphicon glyphicon-plus",
      submit: "POST",
      title: "new product",
    },
    update: {
      variant: "info",
      gylphicon: "glyphicon glyphicon-pencil",
      submit: "PUT",
      title: "update product",
    },
    delete: {
      variant: "danger",
      gylphicon: "glyphicon glyphicon-trash",
      submit: "DELETE",
      title: "are you sure to delete this product?",
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      idProd: props.obj.idProd,
      design: props.obj.design,
      amount: props.obj.amount,
      price: props.obj.price,
      idCat: props.obj.idCat,
      devc: 0,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deviceChange = this.deviceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  deviceChange = (event) => {
    this.state.price = (
      parseFloat(this.state.price) / parseFloat(event.target.value)
    ).toFixed(2);
  };
  //parseFloat(
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  refr = () => {
    //this.props.refr();
  };
  handleSubmit = (event) => {
    const requestOptions = {
      method: this.req[this.props.req].submit,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        this.props.req != "delete"
          ? {
              idProd: this.props.req == "add" ? null : this.state.idProd,
              design: this.state.design,
              amount: this.state.amount,
              price: this.state.price,
              idCat: this.state.idCat,
            }
          : { idProd: this.state.idProd }
      ),
    };
    fetch(
      this.props.req == "add"
        ? this.props.url + "/newPro"
        : this.props.req == "update"
        ? this.props.url + "/updatePro/" + this.state.idProd
        : this.props.url + "/deletePro/" + this.state.idProd,
      requestOptions
    ).then((response) => {
      console.log(response);
      setTimeout(this.load(), 1000);
      return response.json();
    });

    event.preventDefault();
  };
  load = () => {
    fetch(this.props.url + "/all_products")
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
    if (this.redirect) {
      return <Redirect to={"/category"} />;
    } else {
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
                    <Form.Label>idProd</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.idProd}
                      name="idProd"
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
                    <Form.Label>idProd</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.idProd}
                      name="idProd"
                      onChange={this.handleChange}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>category</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.idCat}
                      name="idCat"
                      onChange={this.handleChange}
                    >
                      <option value="">--------------</option>
                      {this.props.cates.map((cat) => {
                        return (
                          <option value={cat.idCat}>{cat.designCat}</option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>design</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.design}
                      name="design"
                      onChange={this.handleChange}
                      placeholder="design"
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>amount</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.amount}
                      name="amount"
                      onChange={this.handleChange}
                      placeholder="amount"
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>price</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.price}
                      name="price"
                      onChange={this.handleChange}
                      placeholder="price"
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>device</Form.Label>
                    <Form.Control
                      as="select"
                      //value={this.state.devc}
                      name="device"
                      onChange={this.deviceChange}
                    >
                      <option value={this.props.device.EUR}>
                        EURO ({this.props.device.EUR})
                      </option>
                      <option value={this.props.device.USD}>
                        DOLLAR ({this.props.device.USD})
                      </option>
                      <option value={this.props.device.MAD}>
                        DIRHAM ({this.props.device.MAD})
                      </option>
                    </Form.Control>
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
}
