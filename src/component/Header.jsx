import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { getAuth } from "firebase/auth";

const Header = () => {
  const cartItems = useSelector(state => state.cartReducer.cartItems);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const auth = getAuth();
  const navigator = useNavigate();
  const logOut = () => {
    localStorage.removeItem("currentUser");
    auth.signOut();
    navigator("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg px-5 bg-dark navbar-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          fireCommerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                {currentUser
                  ? currentUser.email.substring(
                      0,
                      currentUser.email.length - 10
                    )
                  : "User"}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FaCartPlus /> {cartItems.length}
              </Link>
            </li>
            <li className="nav-item mx-2">
              <button className="nav-link" onClick={logOut}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
