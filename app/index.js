/*eslint-disable import/default */
import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { PersistGate } from "redux-persist/integration/react";
import routes from "./routes";
//Webpack CSS import
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/toastr/build/toastr.min.css";
import "../node_modules/griddle-react-bootstrap/dist/griddle-react-bootstrap.css";
import "./assets/styles/styles.scss";

const { store, persistor } = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history} routes={routes} />
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);
