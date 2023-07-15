import {
  faReorder,
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import authToken from "../utils/authToken";

const NavBar = () => {
  if (localStorage.getItem("jwtToken")) {
    authToken(localStorage.getItem("jwtToken"));
  }

  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const guestLinks = (
    <>
      <Link to="/login" className="nav-link text-black">
        <FontAwesomeIcon icon={faSignInAlt} /> Đăng nhập
      </Link>
    </>
  );

  const userLinks = (
    <>
      <Link to="/ordered" className="nav-link text-black">
        <FontAwesomeIcon icon={faReorder} /> Đã mua
      </Link>
      <Link to="/logout" className="nav-link text-black" onClick={logout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Đăng xuất
      </Link>
    </>
  );

  return (
    <Navbar bg="light" variant="dark">
      <Link to="/" className="navbar-brand">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          height="20%"
          width="20%"
          alt="Logo"
          className="ms-4"
        />
      </Link>
      <>
        <Nav className="ms-auto">
          {localStorage.getItem("jwtToken") ? userLinks : guestLinks}
          <Link to="/cart" className="nav-link text-black">
            <FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng
          </Link>
        </Nav>
      </>
    </Navbar>
  );
};

export default NavBar;
