import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import JoinPage from "./JoinPage";

class HomePage extends Component {
  render() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<p>home page</p>} />
                <Route path='join' element={<JoinPage/>} />
            </Routes>
        </Router>
    )
  }
}

export default HomePage;
