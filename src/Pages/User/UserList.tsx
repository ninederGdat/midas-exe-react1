import React, { useState } from "react";
import { withAdminAuth } from "../../HOC";
import { userModel } from "../../Interfaces";
import { useGetUsersQuery } from "../../Apis/usersApi";
import { MainLoader } from "../../Components/Page/Common";

const ITEMS_PER_PAGE = 5; // Số lượng mục trên mỗi trang

function UserList() {
  const { data: users, isLoading } = useGetUsersQuery(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <MainLoader />;
  }

  const totalPages = Math.ceil(users?.length / ITEMS_PER_PAGE);
  const currentData = users?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-3">
      <h1 className="p-2 text-primary">Manager Users</h1>
      <div className="table-responsive" style={{ overflowX: "auto" }}>
        <table
          className="table table-bordered"
          style={{ tableLayout: "fixed", width: "1500px" }}
        >
          <thead className="table-light">
            <tr>
              <th style={{ width: "100px" }}>User ID</th>
              <th style={{ width: "200px" }}>Full Name</th>
              <th style={{ width: "300px" }}>Email</th>
              <th style={{ width: "150px" }}>Phone</th>
              <th style={{ width: "250px" }}>Location</th>
              <th style={{ width: "150px" }}>Bank Name</th>
              <th style={{ width: "150px" }}>Bank Number</th>
              <th style={{ width: "100px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((user: userModel) => (
              <tr key={user.accountId}>
                <td>{user.accountId}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.location}</td>
                <td>{user.bankName || "N/A"}</td>
                <td>{user.bankNumber || "N/A"}</td>
                <td>
                  {user.status === "Active" ? (
                    <i className="bi bi-person-fill-check text-success fs-4"></i>
                  ) : (
                    <i className="bi bi-person-lock text-danger fs-4"></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination mt-3">
        <button
          className="btn btn-primary me-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary ms-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default withAdminAuth(UserList);
