import React, { Component } from "react";
//import { Glyphicon } from "react-bootstrap";
import Formproduct from "./formproduct";
//import Exemple from "./exemple";
export default class Listproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ebs: 1,
      reload: false,
      id: 1,
      tab: [],
      obj0: {
        idProd: "",
        design: "",
        amount: "",
        price: "",
        priceMAD: "",
        priceUSD: "",
        category: {
          idCat: "",
          designCat: "",
        },
      },
      cates: [],
      device: {
        rates: {
          MAD: "",
          EUR: "",
          USD: "",
        },
      },
    };
    this.row = this.row.bind(this);
  }

  componentDidMount() {
    fetch(this.props.url + "/all_categories")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ cates: data });
      })
      .catch(console.log);
    this.row();
    this.getDevice();
  }
  select = (i) => {
    this.state.id = i;
    this.row();
  };
  row = () => {
    fetch(this.props.url + "/all_products/" + this.state.id)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tab: data });
      })
      .catch(console.log);
  };
  getDevice = (el) => {
    fetch(
      "http://data.fixer.io/api/latest?access_key=792f64d38dcebb14724ed714462dc978&format=1"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ device: data });
      })
      .catch(console.log);
  };
  changeDevice = (event) => {
    this.state.ebs = parseFloat(event.target.value);
    this.ourMethod();
  };
  ourMethod() {
    this.setState({ state: this.state });
  }
  render() {
    return (
      <div>
        <h1>Products List {this.props.test}</h1>
        <Formproduct
          req={"add"}
          obj={this.state.obj0}
          cates={this.state.cates}
          device={this.state.device.rates}
          url={this.props.url}
          ourMethod={(a) => {
            this.state.tab = a;
            this.ourMethod();
          }}
        />
        <select className="selectDevice" onChange={this.changeDevice}>
          <option value={this.state.device.rates.EUR}>
            EURO ({this.state.device.rates.EUR})
          </option>
          <option value={this.state.device.rates.USD}>
            DOLLAR ({this.state.device.rates.USD})
          </option>
          <option value={this.state.device.rates.MAD}>
            DIRHAM ({this.state.device.rates.MAD})
          </option>
        </select>
        <div className="col-xs-12">
          <ul className="arbo col-sm-2 col-xs-12">
            <h3>Categories</h3>
            {this.state.cates.map((el) => {
              return (
                <li key={el.idCat}>
                  <button onClick={() => this.select(el.idCat)}>
                    {el.designCat}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="col-sm-10 col-xs-12">
            <table className="table table-striped">
              <caption></caption>
              <thead>
                <tr>
                  <th scope="col">IDPROD</th>
                  <th scope="col">DESIGN</th>
                  <th scope="col">AMOUNT</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">CATEGORY</th>
                  <th scope="col">UPDATE</th>
                  <th scope="col">DEL</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tab.map((el) => {
                  return (
                    <tr key={el.idProd}>
                      <td>{el.idProd}</td>
                      <td>{el.design}</td>
                      <td>{el.amount}</td>
                      <td>
                        {(parseFloat(el.price) * this.state.ebs).toFixed(2)}
                      </td>
                      <td>{el.category.designCat}</td>
                      <td>
                        <Formproduct
                          obj={el}
                          req={"update"}
                          cates={this.state.cates}
                          device={this.state.device.rates}
                          url={this.props.url}
                          ourMethod={(a) => {
                            this.state.tab = a;
                            this.ourMethod();
                          }}
                        />
                      </td>
                      <td>
                        <Formproduct
                          req={"delete"}
                          obj={el}
                          cates={this.state.cates}
                          device={this.state.device.rates}
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
        </div>
      </div>
    );
  }
}
