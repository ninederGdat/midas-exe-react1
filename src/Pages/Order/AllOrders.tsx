import React from "react";
import { withAdminAuth, withAuth } from "../../HOC";

import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import OrderList from "../../Components/Page/Order/OrderList";

function AllOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");

  console.log(data);
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data} isAdmin={true} />
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);
