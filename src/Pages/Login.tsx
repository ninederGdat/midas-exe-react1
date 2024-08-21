import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { UserAuth } from "../Context/AuthContext";
import { inputHelper } from "../Helper";
import {
  apiResponse,
  loginModel,
  loginResponse,
  userModel,
} from "../Interfaces";
import { useLoginUserMutation } from "../Apis/authApi";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { MainLoader } from "../Components/Page/Common";

function Login() {
  const [error, setError] = useState("");
  const [loginUser] = useLoginUserMutation();
  const { googleSignIn, user } = UserAuth();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: loginResponse = await loginUser({
      email: userInput.email,
      password: userInput.password,
    });
    if (response.data) {
      const token = response.data.data;
      const {
        fullname,
        role,
        email,
        accountId,
        location,
        phoneNumber,
        status,
      }: loginModel = jwt_decode(token);
      localStorage.setItem("token", token);
      dispatch(
        setLoggedInUser({
          fullname,
          role,
          email,
          accountId,
          location,
          phoneNumber,
          status,
        })
      );

      navigate("/");
    } else if (response.error) {
      console.log(response.error.data.message);
      setError(response.error.data.message);
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (user != null) {
  //     navigate("/");
  //   }
  // }, [user]);

  return (
    <div className="container text-center">
      {loading && <MainLoader />}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Login</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              required
              name="email"
              value={userInput.email}
              onChange={handleUserInput}
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
            />
          </div>

          <div className="mt-2">
            {error && <p className="text-danger">{error}</p>}
            <button
              type="submit"
              className="btn btn-success"
              style={{ width: "200px" }}
            >
              Login
            </button>
          </div>
        </div>
      </form>
      {/* <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
        <GoogleButton
          style={{ marginLeft: "auto", marginRight: "auto" }}
          onClick={handleGoogleSignIn}
        />
      </div> */}
    </div>
  );
}

export default Login;
