import React from "react";
import { useParams } from "react-router-dom";
import { useGetAllOrdersByIdQuery } from "../../Apis/orderApi";
import { OrderSummary } from "../../Components/Page/Order";

function OrderDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetAllOrdersByIdQuery(id);
  let userInput, orderDetails;

  if (!isLoading && data) {
    userInput = {
      name: data.account.accountName,
      phoneNumber: data.createDate,
      location: data.account.location,
    };
    orderDetails = {
      id: data.orderId,
      cartItems: data.orderDetails,
      amount: data.totalPrice,
      status: data.status,
      checkoutUrl: data.checkoutUrl,
      paymentLinkId: data.paymentLinkId,
    };
  }
  console.log(data);
  return (
    <div
      className="container my-5 mx-auto p-5 w-100"
      style={{ maxWidth: "750px" }}
    >
      {!isLoading && orderDetails && userInput && (
        <OrderSummary data={orderDetails} userInput={userInput} />
      )}
    </div>
  );
}

export default OrderDetails;
