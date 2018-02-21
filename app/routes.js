import React from "react";
import { Route, IndexRoute } from "react-router";
import SignedInLayout from "./components/layout/SignedInLayout";
import HomePage from "./components/home/HomePage";
import UsersPageComponent from "./components/users/UsersPage";
import UserAddPage from "./components/users/UserAddPage";
import UserEditPage from "./components/users/UserEditPage";
import AboutPage from "./components/about/AboutPage";
import NotFound from "./components/not_found/NotFound";
import LoginPage from "./components/auth/LoginPage";
import BaseLayout from "./components/layout/BaseLayout";
import SignedOutLayout from "./components/layout/SignedOutLayout";
import CallbackLoading from "./components/auth/CallbackLoading";
import AuthenticationManager from "./components/auth/AuthenticationManager";
import Logout from "./components/auth/Logout";

export default (
  <Route component={AuthenticationManager}>
    <Route component={BaseLayout}>
      <Route component={SignedOutLayout}>
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={Logout} />
        <Route path="/callback" component={CallbackLoading} />
      </Route>
      <Route component={SignedInLayout} path=" /">
        <IndexRoute component={HomePage} />
        <Route path="/app/users" component={UsersPageComponent} />
        <Route path="/app/users/add" component={UserAddPage} />
        <Route path="/app/users/:id/edit" component={UserEditPage} />
        <Route path="/app/about" component={AboutPage} />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  </Route>
);
