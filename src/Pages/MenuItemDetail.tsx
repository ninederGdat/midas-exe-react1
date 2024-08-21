import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMenuItemByIdQuery } from "../Apis/menuItemApi";
import { useUpdateShoppingCartMutation } from "../Apis/shoppingCartApi";
import { MainLoader, MiniLoader } from "../Components/Page/Common";
import { apiResponse, cartResponse, userModel } from "../Interfaces";
import { toastNotify } from "../Helper";
import { RootState } from "../Storage/Redux/store";
import {
  useGetStoreByIdQuery,
  useGetStoreByaccountIdQuery,
} from "../Apis/storeApi";
import Feedback from "../Components/Page/Feeback/Feedback";

function MenuItemDetail() {
  const { menuitemId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const {
    data: menuItemData,
    isLoading: isMenuItemLoading,
    isError: isMenuItemError,
  } = useGetMenuItemByIdQuery(menuitemId);

  const shopId = menuItemData?.store?.storeID;

  const {
    data: shopData,
    isLoading: isShopLoading,
    isError: isShopError,
  } = useGetStoreByIdQuery(shopId);

  // console.log(menuItemData);
  // console.log(menuItemData.store.storeID);

  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.accountId) {
      navigate("/login");
      return;
    }

    setIsAddingToCart(true);

    const response: cartResponse = await updateShoppingCart({
      productid: menuItemId,
      quantity: 1,
      accountId: userData.accountId,
    });
    if (response.data && response.data.success) {
      toastNotify("Item added to cart successfully ");
    }
    setIsAddingToCart(false);
  };

  if (isShopLoading || isMenuItemLoading) {
    return (
      <div className="d-flex justify-content-center" style={{ width: "100%" }}>
        <MainLoader />
      </div>
    );
  }

  if (isShopError || isMenuItemError) {
    return (
      <div className="d-flex justify-content-center" style={{ width: "100%" }}>
        <div>Error loading data</div>
      </div>
    );
  }

  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        <div className="col-7">
          <h2 className="text-success">{menuItemData.productName}</h2>
          <span>
            <span
              className="badge text-bg-info text-white pt-2 mt-2"
              style={{ height: "50px", fontSize: "30px" }}
            >
              Store Name: {shopData.data[0].storeName}
            </span>

            <span
              className="badge text-bg-dark pt-2 ms-5"
              style={{ height: "40px", fontSize: "20px" }}
            >
              {menuItemData.categoryName}
            </span>
          </span>
          <p style={{ fontSize: "20px" }} className="pt-2">
            {menuItemData.description}
          </p>
          <span className="h3">
            {menuItemData.price.toLocaleString("vi-VN")} VNĐ
          </span>{" "}
          &nbsp;&nbsp;&nbsp;
          <div className="row pt-4">
            <div className="col-5">
              {isAddingToCart ? (
                <button disabled className="btn btn-success form-control">
                  <MiniLoader />
                </button>
              ) : (
                <button
                  className="btn btn-success form-control"
                  onClick={() => handleAddToCart(menuItemData.productId)}
                >
                  Add to Cart
                </button>
              )}
            </div>

            <div className="col-5 ">
              <button
                className="btn btn-secondary form-control"
                onClick={() => navigate(-1)}
              >
                Back to Home
              </button>
            </div>
          </div>
          <div className="col-7 mb-3 mt-3">
            <Feedback menuItemId={Number(menuitemId)} />
          </div>
        </div>
        <div className="col-5">
          <img
            src={menuItemData.imageLinks}
            width="100%"
            style={{ borderRadius: "50%" }}
            alt="No content"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default MenuItemDetail;
