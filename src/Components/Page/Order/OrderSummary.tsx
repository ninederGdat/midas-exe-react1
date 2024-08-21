import React, { useState } from "react";
import { OrderSummaryProps } from "./OrderSummaryProps";
import { cartItemModel, cartResponse } from "../../../Interfaces";
import { getStatusColor } from "../../../Helper";
import { useNavigate } from "react-router-dom";
import { SD_Roles, SD_Status } from "../../../Utility/SD";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useUpdateOrderHeaderMutation } from "../../../Apis/orderApi";
import { MainLoader } from "../Common";
import { useGetPaymentInfoQuery } from "../../../Apis/paymentApi";
import PaymentInfo from "./PaymentInfo";
import ItemPayment from "./ItemPayment";

function OrderSummary({ data, paymentLinkId }: OrderSummaryProps) {
  console.log(data);

  const badgeTypeColor = getStatusColor(data?.status!);
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const [loading, setIsLoading] = useState(false);

  const paymentData = useGetPaymentInfoQuery({
    paymentLinkId: data.paymentLinkId,
    accountId: userData.accountId,
  });

  console.log(paymentData);

  const [updateOrderHeader] = useUpdateOrderHeaderMutation();
  const nextStatus: any =
    data.status! === SD_Status.CONFIRMED
      ? { color: "info", value: SD_Status.BEING_COOKED }
      : data.status! === SD_Status.BEING_COOKED
      ? { color: "warning", value: SD_Status.READY_FOR_PICKUP }
      : data.status! === SD_Status.READY_FOR_PICKUP && {
          color: "success",
          value: SD_Status.COMPLETED,
        };

  const handleNextStatus = async () => {
    setIsLoading(true);
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: nextStatus.value,
    });
    setIsLoading(false);
  };

  const handleCancle = async () => {
    setIsLoading(true);
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: SD_Status.CANCLED,
    });
    setIsLoading(false);
  };

  const navigate = useNavigate();
  return (
    <div>
      {loading && <MainLoader />}
      {!loading && (
        <>
          {/* <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success">Order Summary</h3>
          </div>
          <div className="mt-3">
            <div className="border py-3 px-2">Name : {userInput.name}</div>
            <div className="border py-3 px-2">
              Phone : {userInput.phoneNumber}
            </div>
            <div className="border py-3 px-2">
              Location : {userInput.location}
            </div>
            <div className="border py-3 px-2">
              <h4 className="text-success">Menu Items </h4>
              <div className="p-3">
                <hr />
                <h4 className="text-danger" style={{ textAlign: "right" }}>
                  {data.amount?.toLocaleString("vi-VN")} VNĐ
                </h4>
              </div>
            </div>
          </div> */}
          {paymentData?.isLoading && <div>Loading payment information...</div>}
          {paymentData?.error && <div>Error loading payment information</div>}
          {paymentData?.data && (
            <div className="mt-3">
              <h4 className="text-success">Payment Information</h4>
              <span className={`m-3 btn btn-outline-${badgeTypeColor} fs-6`}>
                {data.status}
              </span>
              <div className="border py-3 px-2">
                <p>
                  Amount: {paymentData.data.amount.toLocaleString("vi-VN")} VNĐ
                </p>
                <p>Description: {paymentData.data.description}</p>
                <p>Buyer Name: {paymentData.data.buyerName}</p>
                <p>Buyer Phone: {paymentData.data.buyerPhone}</p>
                <p>Buyer Email: {paymentData.data.buyerEmail}</p>
                <p>Buyer Address: {paymentData.data.buyerAddress}</p>
                <p>Status: {paymentData.data.status}</p>
                <h5>Items:</h5>
                <ul className="d-flex flex-column list-unstyled">
                  {paymentData.data.items.map(
                    (item: ItemPayment, index: number) => (
                      <li
                        className="d-flex  justify-content-between"
                        key={index}
                      >
                        <p>{item.name.toLocaleUpperCase()}</p>
                        <p>{item.price.toLocaleString("vi-VN")} VNĐ</p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-between align-item-center mt-3">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back To Order
            </button>
            {userData.role == SD_Roles.ADMIN && (
              <div className="d-flex">
                {data.status! !== SD_Status.CANCLED &&
                  data.status! !== SD_Status.COMPLETED && (
                    <button
                      className="btn btn-danger mx-2"
                      onClick={handleCancle}
                    >
                      Cancle
                    </button>
                  )}
                <button
                  className={`btn btn-${nextStatus.color}`}
                  onClick={handleNextStatus}
                >
                  {nextStatus.value}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderSummary;
