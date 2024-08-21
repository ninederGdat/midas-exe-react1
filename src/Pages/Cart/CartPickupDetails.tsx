import React, { useEffect, useState } from "react";
import { apiResponse, cartItemModel } from "../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { inputHelper } from "../../Helper";
import { MiniLoader } from "../../Components/Page/Common";
import { useInitiatePaymentMutation } from "../../Apis/paymentApi";
import { useNavigate } from "react-router-dom";

function CartPickupDetails() {
  const [loading, setLoading] = useState(false);
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const userData = useSelector((state: RootState) => state.userAuthStore);

  console.log(shoppingCartFromStore);

  let grandTotal = 0;
  let totalItems = 0;

  const initialUserData = {
    name: userData.fullname,
    phoneNumber: userData.phoneNumber,
    location: userData.location,
    email: userData.email,
  };

  shoppingCartFromStore?.map((cartItem: cartItemModel) => {
    totalItems += 1;
    grandTotal += (cartItem.price ?? 0) * 1;
    return null;
  });

  // console.log(shoppingCartFromStore[0].price);

  const navigate = useNavigate();
  const [userInput, setUserInput] = useState(initialUserData);
  const [initatePayment] = useInitiatePaymentMutation();
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  useEffect(() => {
    setUserInput({
      name: userData.fullname,
      location: userData.location,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
    });
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data }: any = await initatePayment(userData.accountId);

    console.log(data);
    const paymentLinkId = data?.paymentLinkId;
    console.log(paymentLinkId);
    navigate("/payment", {
      state: { apiResult: data, paymentLinkId },
    });
  };

  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        Pickup Details
      </h1>
      <hr />
      <form onSubmit={handleSubmit} className="col-10 mx-auto">
        <div className="form-group mt-3">
          Pickup Name
          <input
            type="text"
            value={userInput.name}
            className="form-control"
            placeholder="name..."
            name="name"
            onChange={handleUserInput}
            required
          />
        </div>

        <div className="form-group mt-3">
          Pickup Phone Number
          <input
            type="number"
            value={userInput.phoneNumber}
            className="form-control"
            placeholder="phone number..."
            name="phoneNumber"
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="form-group mt-3">
          Pickup Location
          <input
            type="text"
            value={userInput.location}
            className="form-control"
            placeholder="location..."
            name="location"
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="form-group mt-3">
          Pickup Email
          <input
            type="text"
            value={userInput.email}
            className="form-control"
            placeholder="Email..."
            name="email"
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: "ghostwhite" }}>
            <h5>Grand Total : {grandTotal.toLocaleString("vi-VN")} VNĐ</h5>
            <h5>No of items : {totalItems}</h5>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-success form-control mt-3"
          disabled={loading}
        >
          {loading ? <MiniLoader /> : "Looks Good? Place Order!"}
        </button>
      </form>
    </div>
  );
}

export default CartPickupDetails;
