import React, { Component } from "react";
//import { Glyphicon } from "react-bootstrap";
import Formcategory from "./formcategory";
//import Exemple from "./exemple";
export default class Listcategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: [],
      obj0: {
        idProd: "",
        design: "",
        amount: "",
        price: "",
        category: {
          idCat: "",
          designCat: "",
        },
      },
      cates: [],
    };
    this.row = this.row.bind(this);
    //   this.state.tab = this.state.tab.bind(this);
  }
  componentDidMount() {
    fetch(this.props.url + "/all_categories")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ cates: data });
      })
      .catch(console.log);
    this.row();
  }

  row = (el) => {
    fetch(this.props.url + "/all_categories")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tab: data });
      })
      .catch(console.log);
  };
  ourMethod() {
    this.setState({ state: this.state });
  }
  render() {
    return (
      <div>
        <h1>categories List</h1>
        <Formcategory
          req={"add"}
          obj={this.state.obj0}
          cates={this.state.cates}
          url={this.props.url}
          ourMethod={(a) => {
            this.state.tab = a;
            this.ourMethod();
          }}
        />

        <table className="table table-striped">
          <caption></caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">DESIGN</th>
              <th scope="col">UPDATE</th>
              <th scope="col">DEL</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tab.map((el) => {
              return (
                <tr key={el.idCat}>
                  <td>{el.idCat}</td>
                  <td>{el.designCat}</td>
                  <td>
                    <Formcategory
                      obj={el}
                      req={"update"}
                      cates={this.state.cates}
                      url={this.props.url}
                      ourMethod={(a) => {
                        this.state.tab = a;
                        this.ourMethod();
                      }}
                    />
                  </td>
                  <td>
                    <Formcategory
                      req={"delete"}
                      obj={el}
                      cates={this.state.cates}
                      url={this.props.url}
                      ourMethod={(a) => {
                        this.state.tab = a;
                        this.ourMethod();
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
