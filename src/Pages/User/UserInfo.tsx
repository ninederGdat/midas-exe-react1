import React, { useState, ChangeEvent } from "react";
import { withAuth } from "../../HOC";
import { userModel } from "../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import {
  useGetUsersByIdQuery,
  useUpdateInfoUserMutation,
} from "../../Apis/usersApi";
import { MainLoader } from "../../Components/Page/Common";
import Modal from "../../Components/Modal/ModalComponent";
import { toastNotify } from "../../Helper";

interface UserData {
  fullname: string;
  location: string;
  dateOfBirth: string;
  phoneNumber: string;
  bankNumber: string;
  bankName: string;
  gender: string;
}

function UserInfo() {
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const UserId = userData.UserID;
  const { data, isLoading } = useGetUsersByIdQuery(UserId);

  const [show, setShow] = useState(false);
  const [updatedData, setUpdatedData] = useState<UserData>({
    fullname: "",
    location: "",
    dateOfBirth: "",
    phoneNumber: "",
    bankNumber: "",
    bankName: "",
    gender: "",
  });

  const [updateUser] = useUpdateInfoUserMutation();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setUpdatedData({
      fullname: data.fullname,
      location: data.location,
      dateOfBirth: data.dateOfBirth.split("T")[0],
      phoneNumber: data.phoneNumber,
      bankNumber: data.bankNumber,
      bankName: data.bankName,
      gender: data.gender,
    });
    setShow(true);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(UserId);
    const response = await updateUser({ data: updatedData, id: UserId }); // Call the updateUser mutation with updatedData

    console.log(updatedData);
    if (response) {
      toastNotify("Your information updated successfully", "success");
      handleClose();
    }
  };

  if (isLoading) {
    return <MainLoader />;
  }

  console.log(data);

  return (
    <>
      <div className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                      backgroundColor: "#1b4537",
                    }}
                  >
                    <img
                      src="https://avatar.iran.liara.run/public"
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "80px" }}
                    />
                    <h5>{data.fullname}</h5>
                    <p>Location</p>
                    <h6>{data.location}</h6>
                    <button className="btn btn-primary" onClick={handleShow}>
                      <i className="bi bi-pencil-square"></i> Update Information
                    </button>
                  </div>
                  <div className="col-md-8">
                    <div
                      className="card-body p-4"
                      style={{ backgroundColor: "#92ffdac7" }}
                    >
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Date Of Birth</h6>
                          <p className="text-muted">
                            {data.dateOfBirth.split("T")[0]}
                          </p>
                        </div>

                        <div className="col-6 mb-3">
                          <h6>Phone</h6>
                          <p className="text-muted">{data.phoneNumber}</p>
                        </div>
                      </div>
                      <div className="col-8 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{data.email}</p>
                      </div>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Gender</h6>
                          <p className="text-muted">{data.gender}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} handleClose={handleClose} handleSave={handleSubmit}>
        <form>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={updatedData.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={updatedData.location}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date Of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={updatedData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={updatedData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              className="form-control"
              id="gender"
              name="gender"
              value={updatedData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default withAuth(UserInfo);
