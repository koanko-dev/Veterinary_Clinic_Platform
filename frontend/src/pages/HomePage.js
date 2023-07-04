import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import JoinPage from "./AuthPage";

class HomePage extends Component {
  render() {
    return (
        <div>
          HOME PAGE
        </div>
    )
  }
}

export default HomePage;
