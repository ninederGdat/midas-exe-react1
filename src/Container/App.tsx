import React, { useState } from "react";
import { Footer, Header } from "../Components/Layout";
import {
  AccessDenied,
  AllOrders,
  AuthenticationTest,
  AuthenticationTestAdmin,
  Home,
  Login,
  ManageOrders,
  MenuItemDetail,
  MenuItemList,
  MenuItemShop,
  MenuItemUpsert,
  MyOrders,
  NotFound,
  OrderConfirmed,
  OrderDetails,
  Payment,
  Register,
  ShoppingCart,
  UserInfo,
  UserList,
} from "../Pages";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { userModel } from "../Interfaces";
import jwt_decode from "jwt-decode";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { RootState } from "../Storage/Redux/store";
import { AuthContextProvider } from "../Context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetStoreByUserIdQuery } from "../Apis/storeApi";

function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { data, isLoading } = useGetShoppingCartQuery(userData.UserID, {
    skip: skip,
  });

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const {
        unique_name,
        UserID,
        email,
        role,
        location,
        phoneNumber,
      }: userModel = jwt_decode(localToken);
      dispatch(
        setLoggedInUser({
          unique_name,
          UserID,
          email,
          role,
          location,
          phoneNumber,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setShoppingCart(data.data));
    }
  }, [data]);

  useEffect(() => {
    if (userData.UserID) setSkip(false);
  }, [userData]);

  return (
    <AuthContextProvider>
      <div>
        <Header />
        <div className="pb-5">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/menuItemDetails/:menuitemId"
              element={<MenuItemDetail />}
            ></Route>
            <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/authentication"
              element={<AuthenticationTest />}
            ></Route>
            <Route
              path="/authorization"
              element={<AuthenticationTestAdmin />}
            ></Route>
            <Route path="/accessDenied" element={<AccessDenied />}></Route>
            <Route path="/payment" element={<Payment />}></Route>
            <Route
              path="order/orderconfirmed/:id"
              element={<OrderConfirmed />}
            ></Route>
            <Route path="/order/myOrders" element={<MyOrders />}></Route>
            <Route path="/order/allOrders" element={<AllOrders />}></Route>
            <Route
              path="/order/manageOrders"
              element={<ManageOrders />}
            ></Route>
            <Route
              path="/order/orderDetails/:id"
              element={<OrderDetails />}
            ></Route>
            <Route
              path="/menuItem/menuitemlist"
              element={<MenuItemList />}
            ></Route>
            <Route
              path="/menuItem/menuItemUpsert/:id"
              element={<MenuItemUpsert />}
            ></Route>
            <Route
              path="/menuItem/menuItemUpsert"
              element={<MenuItemUpsert />}
            ></Route>
            <Route path="/user/userList" element={<UserList />}></Route>
            <Route path="/user/userinfo" element={<UserInfo />}></Route>
            <Route
              path="/menuItem/menuItemShop"
              element={<MenuItemShop />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>

        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;