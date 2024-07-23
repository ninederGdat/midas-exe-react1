import React from "react";
import { OrderSummaryProps } from "../../Components/Page/Order/OrderSummaryProps";
import { orderDetailsModel, OrderSummaryProps2 } from "../../Interfaces";
import { OrderItem } from "../../Interfaces/OrderSummaryProps2";
function OrderSum({ data, userInput }: OrderSummaryProps2) {
  return (
    <div className="order-summary">
      <h2>Order Details</h2>
      <div className="order-info">
        <p>
          <strong>Order ID:</strong> {data.id}
        </p>
        <p>
          <strong>Status:</strong> {data.status}
        </p>
        <p>
          <strong>Total Price:</strong>{" "}
          {data.amount.toLocaleString("vi-VN") + " VNĐ"}
        </p>
        <p>
          <strong>Order Date:</strong> {data.createDate}
        </p>
      </div>
      <h3>User Information</h3>
      <div className="user-info">
        <p>
          <strong>Name:</strong> {userInput.name}
        </p>
        <p>
          <strong>Location:</strong> {userInput.location}
        </p>
      </div>
      <h3>Store Information</h3>
      <div className="store-info">
        <p>
          <strong>Store Name:</strong> {data.storeName}
        </p>
      </div>
      <h3>Payment & Shipment</h3>
      <div className="payment-shipment-info">
        <p>
          <strong>Payment Method:</strong> {data.paymentMethod}
        </p>
        <p>
          <strong>Shipment Method:</strong>{" "}
          {data.shipmentMethod || "Not specified"}
        </p>
      </div>
      <h3>Order Items</h3>
      <div className="order-items">
        {data.cartItems.map((item: OrderItem, index: number) => (
          <div key={index} className="order-item">
            <p>
              <strong>Product Name:</strong> {item.productName}
            </p>
            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>
            <p>
              <strong>Price: </strong>{" "}
              {item.price.toLocaleString("vi-VN") + " VNĐ"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderSum;
