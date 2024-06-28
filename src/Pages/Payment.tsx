import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "../Components/Page/Payment";
import { OrderSummary } from "../Components/Page/Order";

export default function Payment() {
  const {
    state: { apiResult, userInput },
  } = useLocation();

  console.log(apiResult);

  return (
    // <Elements stripe={stripePromise} options={options}>
    <div className="container m-5 p-5">
      <div className="row">
        <div className="col-md-7">
          <OrderSummary data={apiResult} userInput={userInput} />
        </div>
        <div className="col-md-4 offset-md-1">
          <h3 className="text-success">Payment</h3>
          <PaymentForm data={apiResult} userInput={userInput} />
        </div>
      </div>
    </div>
    // </Elements>
  );
}
