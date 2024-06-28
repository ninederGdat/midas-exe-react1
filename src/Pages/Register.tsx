import React, { useState } from "react";
import { SD_Gender, SD_Roles } from "../Utility/SD";
import { inputHelper, toastNotify } from "../Helper";
import { useRegisterUserMutation } from "../Apis/authApi";
import { apiResponse, registerModel } from "../Interfaces";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../Components/Page/Common";

function Register() {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
    fullname: "",
    location: "",
    dateOfBirth: "",
    email: "",
    gender: "",
    roleId: 2,
    phoneNumber: "",
  });

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: registerModel = await registerUser({
      userName: userInput.userName,
      password: userInput.password,
      phoneNumber: userInput.phoneNumber,
      fullname: userInput.fullname,
      location: userInput.location,
      dateOfBirth: userInput.dateOfBirth,
      email: userInput.email,
      gender: userInput.gender,
      roleId: 2,
    });

    console.log(userInput);
    if (response.data) {
      console.log(response);
      toastNotify("Registeration successful! Please login to continue");
      // navigate("/login");
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
    }

    setLoading(false);
  };

  return (
    <div className="container text-center">
      {loading && <MainLoader />}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              name="userName"
              value={userInput.userName}
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
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Location"
              required
              name="location"
              value={userInput.location}
              onChange={handleUserInput}
            />
          </div>
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
              type="text"
              className="form-control"
              placeholder="Enter Full Name"
              required
              name="fullname"
              value={userInput.fullname}
              onChange={handleUserInput}
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="date"
              className="form-control"
              placeholder="Enter Date Of Birth"
              required
              name="dateOfBirth"
              value={userInput.dateOfBirth}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Phone Number"
              required
              name="phoneNumber"
              value={userInput.phoneNumber}
              onChange={handleUserInput}
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <select
              className="form-control form-select"
              required
              name="gender"
              value={userInput.gender}
              onChange={handleUserInput}
            >
              <option value="">--Select Gender--</option>
              <option value={`${SD_Gender.MALE}`}>Male</option>
              <option value={`${SD_Gender.FEMALE}`}>Female</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success" disabled={loading}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
