import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastNotify } from "../../../Helper";
import { OrderSummaryProps } from "../Order/OrderSummaryProps";
import { cartItemModel, userModel } from "../../../Interfaces";
import { useCreateOrderMutation } from "../../../Apis/orderApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useGetStoreByUserIdQuery } from "../../../Apis/storeApi";

const PaymentForm: React.FC<OrderSummaryProps> = ({ data, paymentLinkId }) => {
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation(); // Destructuring the mutation function
  const [isProcessing, setIsProcessing] = useState(false);

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const shopData = useGetStoreByUserIdQuery(userData.UserID);

  const accountId = userData.UserID;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);

    // Prepare order details from shopping cart items
    const orderDetails = shoppingCartFromStore.map((item) => ({
      productId: item.productId,
      quantity: 1, // You need to determine how quantity is managed
    }));

    // Construct the ReturnUrl with paymentLinkId and accountId
    const returnUrl = `http://localhost:3000/order/orderconfirmed/?paymentLinkId=${paymentLinkId}&accountId=${accountId}`;

    // Call API to create order
    const orderData = {
      paymentMethodID: 1, // Replace with actual payment method ID
      shipmentMethodID: 2, // Replace with actual shipment method ID or null
      orderDetails: orderDetails,
      accountID: accountId,
      storeId: shopData.data.data[0].storeId,
      paymentLinkId: paymentLinkId, // Include paymentLinkId in the order data
      returnUrl: returnUrl, // Include the constructed ReturnUrl
    };

    try {
      const response: any = await createOrder(orderData);

      if (data.checkoutUrl) {
        // Redirect to the checkout URL
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("Checkout URL not found");
      }
    } catch (error) {
      toastNotify("An unexpected error occurred.", "error");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="btn btn-success mt-5 w-100">
        <span id="button-text">
          {isProcessing ? "Processing..." : "Submit Order"}
        </span>
      </button>
    </form>
  );
};

export default PaymentForm;
