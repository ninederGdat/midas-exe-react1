import React from "react";

function ManageOrders() {
  return (
    <div>
      <div className="table p-3">
        <h1 className="p-2">Manager Orders</h1>
        <div className="p-2">
          <div className="row  border">
            <th className="col-2">Order ID</th>
            <th className="col-3">Customer Name</th>
            <th className="col-2">Total Price</th>
            <th className="col-3">Status</th>
            <th className="col-1">Details</th>
          </div>
          <div className="row border">
            <td className="col-2">1</td>
            <td className="col-3">G Dat</td>
            <td className="col-2">$10</td>
            <td className="col-3">Pending</td>
            <td className="col-1">
              <button className="btn btn-primary">View Details</button>
            </td>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageOrders;
