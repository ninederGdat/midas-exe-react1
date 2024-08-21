import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastNotify } from "../../../Helper";
import { OrderSummaryProps } from "../Order/OrderSummaryProps";
import { cartItemModel, userModel } from "../../../Interfaces";
import { useCreateOrderMutation } from "../../../Apis/orderApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useGetStoreByaccountIdQuery } from "../../../Apis/storeApi";
import { useRemoveProductMutation } from "../../../Apis/shoppingCartApi";

const PaymentForm: React.FC<OrderSummaryProps> = ({ data, paymentLinkId }) => {
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  const [removeProduct] = useRemoveProductMutation(); // Destructure the removeProduct mutation
  const [isProcessing, setIsProcessing] = useState(false);

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const shopData = useGetStoreByaccountIdQuery(userData.accountId);

  const accountId = userData.accountId;
  const cartId = shoppingCartFromStore[0]?.cartId; // Assuming all items have the same cartId

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);

    const orderDetails = shoppingCartFromStore.map((item) => ({
      productId: item.productId,
      quantity: 1, // You need to determine how quantity is managed
    }));

    const returnUrl = `https://midas-exe.store/order/orderconfirmed/?paymentLinkId=${paymentLinkId}&accountId=${accountId}`;

    const orderData = {
      paymentMethodID: 1, // Replace with actual payment method ID
      shipmentMethodID: 2, // Replace with actual shipment method ID or null
      orderDetails: orderDetails,
      accountID: accountId,
      storeId: shopData.data.data[0].storeId,
      paymentLinkId: paymentLinkId,
      returnUrl: returnUrl,
    };

    try {
      const response: any = await createOrder(orderData);
      console.log(response);

      // Remove the cart using cartId
      if (cartId) {
        await removeProduct(cartId);
      }

      if (data.checkoutUrl) {
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
