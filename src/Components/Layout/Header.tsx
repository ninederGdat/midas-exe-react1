import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { cartItemModel, userModel } from "../../Interfaces";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { UserAuth } from "../../Context/AuthContext";
import {
  emtyUserState,
  setLoggedInUser,
} from "../../Storage/Redux/userAuthSlice";
import { SD_Roles } from "../../Utility/SD";
let logo = require("../../Assets/Images/midas-01 1.png");

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  console.log(shoppingCartFromStore);

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  console.log(userData);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emtyUserState }));
    navigate("/");
  };

  const { user, logOut } = UserAuth();

  const handleLogoutGG = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <NavLink className="nav-link " aria-current="page" to="/">
            <img
              src={logo}
              style={{ height: "60px", paddingTop: "15px" }}
              className="m-1"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {userData.role === SD_Roles.ADMIN ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin Panel
                  </a>
                  <ul className="dropdown-menu">
                    <li
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/menuItem/menuitemlist")}
                    >
                      Menu Item
                    </li>
                    <li
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("order/myorders")}
                    >
                      My Orders
                    </li>
                    <li
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("order/allOrders")}
                    >
                      All Orders
                    </li>
                    <li
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("order/manageOrders")}
                    >
                      Manage Orders
                    </li>
                    <li
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("user/userList")}
                    >
                      Manage Users
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="/order/myorders"
                  >
                    My Orders
                  </NavLink>
                </li>
              )}

              {/* <li className="nav-item">
                <NavLink
                  className="nav-link "
                  aria-current="page"
                  to="/authentication"
                >
                  Authentication
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  aria-current="page"
                  to="/authorization"
                >
                  Authorization
                </NavLink>
              </li> */}

              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  aria-current="page"
                  to="/shoppingCart"
                >
                  <i className="bi bi-cart"></i>
                  {""}
                  {userData.UserID && `(${shoppingCartFromStore.length})`}
                </NavLink>
              </li>

              <div className="d-flex" style={{ marginLeft: "auto" }}>
                {userData.UserID && (
                  <>
                    <li className="nav-item dropdown">
                      <button
                        className="nav-link active"
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          border: 0,
                        }}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Welcome, {userData.unique_name}
                      </button>
                      <ul className="dropdown-menu">
                        <li
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate("/menuItem/menuitemShop")}
                        >
                          My Shop
                        </li>
                        <li
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate("/user/userinfo")}
                        >
                          My Info
                        </li>
                      </ul>
                    </li>{" "}
                    <li className="nav-item ">
                      <button
                        className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}

                {!userData.UserID && !user?.displayName && (
                  <>
                    {" "}
                    <li className="nav-item text-white">
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item text-white">
                      <NavLink
                        className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                )}

                {user?.displayName && (
                  <>
                    <li className="nav-item dropdown">
                      <button
                        className="nav-link active"
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          border: 0,
                        }}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Welcome, {user?.displayName}
                      </button>
                      <ul className="dropdown-menu">
                        <li
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate("/menuItem/menuitemlist")}
                        >
                          Menu Item
                        </li>
                        <li
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate("order/myorders")}
                        >
                          My Orders
                        </li>
                      </ul>
                    </li>{" "}
                    <button
                      className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                      onClick={handleLogoutGG}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
