import React, { useState } from "react";
import { MainLoader } from "../Common";
import { orderHeaderModel } from "../../../Interfaces";
import { useNavigate } from "react-router-dom";
import OrderListProps from "./OrderListType";
import { getStatusColor } from "../../../Helper";

const ITEMS_PER_PAGE = 10;

function OrderList({ isLoading, orderData }: OrderListProps) {
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
            <div className="row border rounded  border-3">
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Location</div>
              <div className="col-2">Total</div>
              <div className="col-1">Date</div>
              <div className="col-1">Store Name</div>
              <div className="col-2">Status</div>
              <div className="col-1"></div>
            </div>
            {currentData?.map((orderItem: orderHeaderModel) => {
              const badgeColor = getStatusColor(orderItem.status!);
              return (
                <div
                  className="row border border-success-subtle "
                  key={orderItem.orderId}
                >
                  <div className="col-1">{orderItem.orderId}</div>
                  <div className="col-2">{orderItem.account.accountName}</div>
                  <div className="col-2">{orderItem.account.location}</div>
                  <div className="col-2">
                    {orderItem.totalPrice!.toLocaleString("vi-VN") + " VNĐ"}
                  </div>
                  <div className="col-1">
                    {new Date(orderItem.createDate!).toLocaleDateString()}
                  </div>
                  <div className="col-1">{orderItem.store.storeName}</div>
                  <div className="col-2">
                    <span className={`badge bg-${badgeColor}`}>
                      {orderItem.status}
                    </span>
                  </div>
                  <div className="col-1">
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate("/order/orderDetails/" + orderItem.orderId)
                      }
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
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
