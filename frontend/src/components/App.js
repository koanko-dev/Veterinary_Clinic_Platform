import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";

import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="auth/" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
