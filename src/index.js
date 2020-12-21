import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from './auth/PrivateRoute';

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import LandingLayout from "layouts/Landing.js"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <PrivateRoute path="/admin" component={AdminLayout} />
      <Route path="/" render={props => <LandingLayout {...props} />} />

    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
