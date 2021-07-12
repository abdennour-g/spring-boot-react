import React, { Component } from "react";

export default class Tableau extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: [
        {
          id: "22",
          cin: "9120",
          nom: "mimiche",
          prenom: "",
          tel: "0600000",
          email: "",
        },
        {
          id: "21",
          cin: "89000",
          nom: "minouche",
          prenom: "",
          tel: "7845888",
          email: "",
        },
        {
          id: "19",
          cin: "458",
          nom: "hoummad",
          prenom: "",
          tel: "7412",
          email: "",
        },
        {
          id: "18",
          cin: "789",
          nom: "serghouchni",
          prenom: "",
          tel: "1234",
          email: "",
        },
        {
          id: "17",
          cin: "4587",
          nom: "HOUWARI",
          prenom: "",
          tel: "47854",
          email: "",
        },
      ],
    };
  }

  render() {
    const { tab } = this.state;

    //  console.log(tab)
    return (
      <table className="table table-striped">
        <caption> </caption>
        <thead>
          <tr>
            <th scope="col"> ID </th> <th scope="col"> CIN </th>
            <th scope="col"> NOM </th> <th scope="col"> PRENOM </th>
            <th scope="col"> TEL </th> <th scope="col"> EMAIL </th>
          </tr>
        </thead>
        <tbody>
          {tab &&
            tab.map((item) => {
              return (
                <tr key={item.id}>
                  <td> {item.id} </td> <td> {item.cin} </td>
                  <td> {item.nom} </td> <td> {item.prenom} </td>
                  <td> {item.tel} </td> <td> {item.email} </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

// {tab.map((el) => {
//     <tr>
//       <td>{el.id}</td>
//       <td>{el.cin}</td>
//       <td>{el.nom}</td>
//       <td>{el.prenom}</td>
//       <td>{el.tel}</td>
//       <td>{el.email}</td>
//     </tr>;
//   })}
