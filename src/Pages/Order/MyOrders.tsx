import React from "react";
import { withAuth } from "../../HOC";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { useGetAllOrdersByUserQuery } from "../../Apis/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import { orderDetailsModel, orderHeaderModel } from "../../Interfaces";
import OrderList from "../../Components/Page/Order/OrderList";

function MyOrders() {
  const accountId = useSelector(
    (state: RootState) => state.userAuthStore.accountId
  );
  const { data, isLoading } = useGetAllOrdersByUserQuery(accountId);

  console.log(data);
  console.log(isLoading);

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data} isAdmin={false} />
      )}
    </>
  );
}

export default withAuth(MyOrders);
