import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import "./styles/main.scss";

import AppReducers from "./reducers";
import Layout from "./containers/Layout";

let store = createStore(AppReducers);

ReactDOM.render(
    <Provider store={store}>
        <Layout/>
    </Provider>,
    document.getElementById("app")
);
