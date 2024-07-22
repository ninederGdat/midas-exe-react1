import React from "react";
import { useParams } from "react-router-dom";
import { useGetAllOrdersByIdQuery } from "../../Apis/orderApi";
import { OrderSummary } from "../../Components/Page/Order";
import { OrderSum } from "..";

function OrderDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetAllOrdersByIdQuery(id);
  let userInput, orderDetails;
  // console.log(data);

  if (!isLoading && data) {
    userInput = {
      name: data.account.accountName,
      location: data.account.location,
    };
    orderDetails = {
      id: data.orderId,
      cartItems: data.orderDetails.map((item: any) => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
      })),
      amount: data.totalPrice,
      status: data.status,
      createDate: data.createDate,
      paymentMethod: data.paymentMethod.paymentMethodName,
      shipmentMethod: data.shipmentMethod.shipmentMethodName,
      storeName: data.store.storeName,
    };
  }

  return (
    <div
      className="container my-5 mx-auto p-5 w-100"
      style={{ maxWidth: "750px" }}
    >
      {!isLoading && orderDetails && userInput && (
        <OrderSum data={orderDetails} userInput={userInput} />
      )}
    </div>
  );
}

export default OrderDetails;
