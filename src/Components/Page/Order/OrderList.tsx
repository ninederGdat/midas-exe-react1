import React, { useState } from "react";
import { MainLoader } from "../Common";
import { orderHeaderModel } from "../../../Interfaces";
import { useNavigate } from "react-router-dom";
import OrderListProps from "./OrderListType";
import { getStatusColor } from "../../../Helper";

const ITEMS_PER_PAGE = 6;

function OrderList({ isLoading, orderData, isAdmin }: OrderListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Calculate the total number of pages
  const totalPages = Math.ceil(orderData?.length / ITEMS_PER_PAGE);

  // Get the data to be displayed on the current page
  const currentData = orderData?.slice(
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
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <h1 className="text-success">Orders List</h1>
          <div className="p-2">
            <div className="table-responsive" style={{ overflowX: "auto" }}>
              <table
                className="table table-bordered"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <thead className="table-light">
                  <tr>
                    <th
                      className="text-success fw-bold"
                      style={{ width: "150px" }}
                    >
                      ID
                    </th>
                    <th
                      className="text-success fw-bold"
                      style={{ width: "200px" }}
                    >
                      Name
                    </th>
                    <th
                      className="text-success fw-bold"
                      style={{ width: "250px" }}
                    >
                      Location
                    </th>
                    <th
                      className="text-success fw-bold"
                      style={{ width: "180px" }}
                    >
                      Total
                    </th>
                    {isAdmin && (
                      <>
                        <th
                          className="text-success fw-bold"
                          style={{ width: "180px" }}
                        >
                          Commission
                        </th>
                        <th
                          className="text-success fw-bold"
                          style={{ width: "180px" }}
                        >
                          Revenue Share
                        </th>
                        <th
                          className="text-success fw-bold"
                          style={{ width: "180px" }}
                        >
                          Payment Status
                        </th>
                      </>
                    )}
                    <th
                      className="text-success fw-bold"
                      style={{ width: "150px" }}
                    >
                      Date
                    </th>
                    <th
                      className="text-success fw-bold"
                      style={{ width: "250px" }}
                    >
                      Store Name
                    </th>
                    <th
                      className="text-success fw-bold"
                      style={{ width: "150px" }}
                    >
                      Status
                    </th>
                    <th
                      className="text-success fw-bold"
                      style={{ width: "150px" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData?.map((orderItem: orderHeaderModel) => {
                    const badgeColor = getStatusColor(orderItem.status!);
                    return (
                      <tr key={orderItem.orderId}>
                        <td>{orderItem.orderId}</td>
                        <td>{orderItem.account.accountName}</td>
                        <td>{orderItem.account.location}</td>
                        <td>
                          {orderItem.totalPrice!.toLocaleString("vi-VN") +
                            " VNĐ"}
                        </td>
                        {isAdmin && (
                          <>
                            <td>
                              {(orderItem.totalPrice! * 0.07).toLocaleString(
                                "vi-VN"
                              ) + " VNĐ"}
                            </td>
                            <td>
                              {(orderItem.totalPrice! * 0.93).toLocaleString(
                                "vi-VN"
                              ) + " VNĐ"}
                            </td>
                            <td className="d-flex justify-content-center align-items-center">
                              {orderItem.isRefund ? (
                                <i className="bi bi-check-square-fill text-success fs-2"></i>
                              ) : (
                                <i className="bi bi-hourglass-split text-warning fs-2"></i>
                              )}
                            </td>
                          </>
                        )}
                        <td>
                          {new Date(orderItem.createDate!).toLocaleDateString()}
                        </td>
                        <td>{orderItem.store.storeName}</td>
                        <td>
                          <span className={`badge bg-${badgeColor}`}>
                            {orderItem.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              navigate(
                                "/order/orderDetails/" + orderItem.orderId
                              )
                            }
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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
        </div>
      )}
    </>
  );
}

export default OrderList;
