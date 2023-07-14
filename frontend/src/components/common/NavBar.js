import React, { Component } from "react";
import { Form, Link, NavLink, useRouteLoaderData } from "react-router-dom";
import { getUserId } from "../../util/auth";

const NavBar = () => {
  const token = useRouteLoaderData("root");
  const userId = getUserId();

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

          {token && (
            <>
              <li>
                <NavLink to={`/user/${userId}`}>프로필</NavLink>
              </li>
              <li>
                <Form method="post" action="/logout">
                  <button>로그아웃</button>
                </Form>
              </li>
            </>
          )}
          {!token && (
            <li>
              <NavLink to="/auth?mode=login">로그인</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
