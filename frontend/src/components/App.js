import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";

import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import ToolBar from "./common/ToolBar";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ToolBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/:authPath" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
