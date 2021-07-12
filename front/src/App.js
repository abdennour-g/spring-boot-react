import { BrowserRouter, Route, Link } from "react-router-dom";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.css";
//import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Listcategory from "./categories/listcategory";
import Listproduct from "./products/listproduct";
function App(props) {
  const url = "http://localhost:2000";
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <nav className="col-xs-12 navbar navbar-inverse">
            <ul className="nav navbar-nav">
              <li className="active">
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/product">product</Link>
              </li>
              <li>
                <Link to="/category">category</Link>
              </li>
              <li>
                <a href="http://localhost:2000/swagger-ui.html">
                  documentation
                </a>
              </li>
            </ul>
          </nav>

          <div className="main-route-place col-xs-12">
            <Route exact path="/">
              <Listproduct url={url} id={-1} />
            </Route>
            <Route exact path="/product/">
              <Listproduct url={url} />
            </Route>
            <Route exact path="/category">
              <Listcategory url={url} />
            </Route>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
