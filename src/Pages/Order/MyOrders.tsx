import React from "react";
import { withAuth } from "../../HOC";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { useGetAllOrdersByUserQuery } from "../../Apis/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import { orderDetailsModel, orderHeaderModel } from "../../Interfaces";
import OrderList from "../../Components/Page/Order/OrderList";

function MyOrders() {
  const UserID = useSelector((state: RootState) => state.userAuthStore.UserID);
  const { data, isLoading } = useGetAllOrdersByUserQuery(UserID);

  console.log(data);
  console.log(isLoading);

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && <OrderList isLoading={isLoading} orderData={data} />}
    </>
  );
}

export default withAuth(MyOrders);
