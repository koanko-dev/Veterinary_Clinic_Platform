import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class ToolBar extends Component {
  render() {
    return (
      <nav>
        <a href="/">HOME</a>
        <a href="/auth/login">Login</a>
        <a href="/auth/signup">Signup</a>
        {/* <Link to="/">HOME</Link>
        <NavLink to="/auth/login">Login</NavLink>
        <NavLink to="/auth/logout">Logout</NavLink>
        <NavLink to="/auth/signup">Signup</NavLink> */}
      </nav>
    );
  }
}

export default ToolBar;
