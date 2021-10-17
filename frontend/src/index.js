import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Components from "views/Components/Components.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterPage from "views/RegisterPage/RegisterPage";
import ContactPage from "views/ContactPage/ContactPage";
import WorkPage from "views/WorkPage/WorkPage";
import AboutPage from "views/AboutPage/AboutPage";
import HomePage from "views/HomePage/HomePage";
import { Provider } from "react-redux";
import store from './store';

var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/about" component={AboutPage} />
        <Route path="/components" component={Components} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/jobs" component={WorkPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
