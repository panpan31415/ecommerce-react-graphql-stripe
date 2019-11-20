import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import SingIn from "./components/SingIn";
import SingUp from "./components/SingUp";
import Checkout from "./components/Checkout";
import NotFoundPage from "./components/NotFoundPage";
import Navbar from "./components/Navbar";
import "gestalt/dist/gestalt.css";

const Root = () => (
  <Router>
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route component={App} exact path="/" />
        <Route component={SingIn} exact path="/signin" />
        <Route component={SingUp} exact path="/signup" />
        <Route component={Checkout} exact path="/checkout" />
        <Route component={NotFoundPage} path="/*" />
      </Switch>
    </React.Fragment>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
