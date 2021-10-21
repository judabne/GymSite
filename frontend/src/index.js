import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Components from "views/Components/Components.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/AccountPages/LoginPage/LoginPage.js";
import RegisterPage from "views/AccountPages/RegisterPage/RegisterPage";
import AccountPage from "views/AccountPages/AccountPage/AccountPage";
import ContactPage from "views/FooterPages/ContactPage/ContactPage";
import WorkPage from "views/FooterPages/WorkPage/WorkPage";
import AboutPage from "views/FooterPages/AboutPage/AboutPage";
import HomePage from "views/HomePage/HomePage";
import PlansPage from "views/AdminPages/PlansPage/PlansPage.js";
import PlanBuyPage from "views/AccountPages/PlanBuyPage/PlanBuyPage";
import { Provider } from "react-redux";
import store from './store';

var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {/* optimize so that header and footer don't rerender unnecessarily*/}
        <Route path="/admin/plans" component={PlansPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/components" component={Components} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/jobs" component={WorkPage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/purchase" component={PlanBuyPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
