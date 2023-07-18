import React from "react";
import { Form, Link, NavLink, useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";

import { getUserId } from "../../util/auth";
import palette from "../../lib/styles/palette";
import Button from "../UI/Button";
import Responsive from "../UI/Responsive";

const NavBar = () => {
  const token = useRouteLoaderData("root");
  const userId = getUserId();

  return (
    <Header>
      <Wrapper>
        <NavBox>
          <HomeLinkBox>
            <Link to="/">HOME</Link>
          </HomeLinkBox>

          <NavListBox>
            <NavLi>
              <NavLink
                to="/clinics"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Clinics
              </NavLink>
            </NavLi>
            <NavLi>
              <NavLink
                to="/reviews"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Reviews
              </NavLink>
            </NavLi>
            <NavLi>
              <NavLink
                to="/articles"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Articles
              </NavLink>
            </NavLi>
            {token && (
              <>
                <NavLi>
                  <NavLink
                    to={`/user/${userId}`}
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                  >
                    Profile
                  </NavLink>
                </NavLi>
                <NavLi>
                  <Form method="post" action="/logout">
                    <Button theme="navBtn">Logout</Button>
                  </Form>
                </NavLi>
              </>
            )}
            {!token && (
              <NavLi>
                <NavLink
                  to="/auth?mode=login"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  <Button theme="navBtn">Login</Button>
                </NavLink>
              </NavLi>
            )}
          </NavListBox>
        </NavBox>
      </Wrapper>
    </Header>
  );
};

export default NavBar;

const Header = styled.header`
  border-radius: 20px;
  width: 100%;
  height: 7rem;
  position: fixed;
  top: 0;
  z-index: 10;
`;

const Wrapper = styled(Responsive)``;

const NavBox = styled.nav`
  font-weight: 400;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
`;

const HomeLinkBox = styled.div`
  height: 40px;
  margin-top: 38px;
`;

const NavListBox = styled.ul`
  width: 480px;
  height: 40px;
  position: absolute;
  top: 30px;
  left: 50%;
  background-color: #fff;
  transform: translateX(-50%);
  color: ${palette.gray[8]};
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0 32px;
  border-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const NavLi = styled.li`
  a {
    height: 100%;

    &:hover,
    &:active,
    &.active {
      color: ${palette.yellow[0]};
    }
  }
`;
