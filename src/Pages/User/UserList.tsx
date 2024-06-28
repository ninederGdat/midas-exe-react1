import React from "react";
import { withAdminAuth } from "../../HOC";

function UserList() {
  return (
    <div>
      <div className="table p-3 ">
        <h1 className="p-2 text-primary">Manager Users</h1>
        <div className="p-2">
          <div className="row  border rounded">
            <th className="col-1">User ID</th>
            <th className="col-2">Full Name</th>
            <th className="col-1">Email</th>
            <th className="col-1">Phone</th>
            <th className="col-1">Location</th>
            <th className="col-2">Bank Name</th>
            <th className="col-1">Bank Number</th>
            <th className="col-1">Status</th>
            <th className="col-1">Request</th>
            <th className="col-1">Ban</th>
          </div>
          <div className="row border rounded">
            <div className="col-1">1</div>
            <div className="col-2">Nguyen Gia Dat</div>
            <div className="col-1">dat@gmail.com</div>
            <div className="col-1">011119999</div>
            <div className="col-1">QN, Binh Dinh</div>
            <div className="col-2">Techcombank</div>
            <div className="col-1">79822222111</div>
            <div className="col-1">Can Sell</div>
            <div className="col-1">
              <button className="btn btn-warning" style={{ border: "none" }}>
                <i className="bi bi-check-circle"></i>
              </button>
            </div>
            <div className="col-1">
              {" "}
              <button className="btn btn-danger" style={{ border: "none" }}>
                <i className="bi bi-x-square"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAdminAuth(UserList);
