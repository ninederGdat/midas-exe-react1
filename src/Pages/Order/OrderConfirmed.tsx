import React from "react";
import { useParams } from "react-router-dom";

let confirmedImage = require("../../Assets/Images/success.jpg");

function OrderConfirmed() {
  const { id } = useParams();

  return (
    <div className="w-100 text-center d-flex justify-content-center align-items-center">
      <div>
        <i
          style={{ fontSize: "7rem" }}
          className="bi bi-check2-circle text-success"
        ></i>
        <div className="pb-5">
          <h2 className=" text-success">Order has been Confirmed!</h2>
          <h5 className="mt-3">Thank you for choose our store</h5>
          <p>We hope to see you again. </p>
          <img
            src={confirmedImage}
            style={{ width: "40%", borderRadius: "30px" }}
          ></img>
        </div>
      </div>
    </div>
  );
}
export default OrderConfirmed;
