import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ userName }) => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <NavLink to="/clinics">동물병원 찾기</NavLink>
          </li>
          <li>
            <NavLink to="/reviews">방문 후기</NavLink>
          </li>
          <li>
            <NavLink to="/articles">아티클</NavLink>
          </li>

          <li>
            <NavLink to={`/user/${userName}`}>프로필</NavLink>
          </li>
          <li>
            <NavLink to="/auth?mode=login">로그인</NavLink>
          </li>
          <li>
            <NavLink to="/logout">로그아웃</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
