import React from "react";
import { MainLoader } from "../Common";
import { orderHeaderModel } from "../../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useGetAllOrdersQuery } from "../../../Apis/orderApi";
import OrderListProps from "./OrderListType";
import { useNavigate } from "react-router-dom";
import { getStatusColor } from "../../../Helper";

function OrderList({ isLoading, orderData }: OrderListProps) {
  const navigate = useNavigate();

  console.log(orderData);

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <h1 className="text-success">Orders List</h1>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Location</div>
              <div className="col-2">Total</div>
              <div className="col-1">Date</div>
              <div className="col-1">Store Name</div>

              <div className="col-2">Status</div>
              <div className="col-1"></div>
            </div>
            {orderData.map((orderItem: orderHeaderModel) => {
              const badgeColor = getStatusColor(orderItem.status!);
              return (
                <div className="row border" key={orderItem.orderId}>
                  <div className="col-1">{orderItem.orderId}</div>
                  <div className="col-2">{orderItem.account.accountName}</div>
                  <div className="col-2">{orderItem.account.location}</div>
                  <div className="col-2">
                    {orderItem.totalPrice!.toLocaleString("vi-VN") + " VNĐ"}
                  </div>
                  {/* <div className="col-1"># {orderItem.totalItems}</div> */}
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
          </div>
        </div>
      )}
    </>
  );
}

export default OrderList;
