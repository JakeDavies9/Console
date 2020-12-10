import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import ForgotPassword from "views/examples/ForgotPassword"
import "config/config"
import Login from "views/examples/Login"

class App extends Component {
    render() {
        return (  
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/auth" component={Login} />
      <Route path="/reset/:id" component={ForgotPassword} />
      <Redirect from="/" to="admin/index" />
    </Switch>
  </BrowserRouter>
        );
    }
}

export default App