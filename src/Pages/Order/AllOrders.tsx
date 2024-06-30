import React from "react";
import { withAdminAuth, withAuth } from "../../HOC";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import { orderDetailsModel, orderHeaderModel } from "../../Interfaces";
import OrderList from "../../Components/Page/Order/OrderList";

function AllOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && <OrderList isLoading={isLoading} orderData={data} />}
    </>
  );
}

export default withAdminAuth(AllOrders);