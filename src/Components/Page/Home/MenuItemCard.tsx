import React from "react";
import {
  apiResponse,
  cartResponse,
  menuItemModel,
  userModel,
} from "../../../Interfaces";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";
import { MiniLoader } from "../Common";
import { toastNotify } from "../../../Helper";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";

interface Props {
  menuItem: menuItemModel;
}

function MenuItemCart(props: Props) {
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.UserID) {
      navigate("/login");
      return;
    }

    setIsAddingToCart(true);

    const response: cartResponse = await updateShoppingCart({
      productid: menuItemId,
      quantity: 1,
      accountId: userData.UserID,
    });

    if (response.data && response.data.success) {
      toastNotify("Item added to cart successfully");
    }
    setIsAddingToCart(false);
  };

  if (props.menuItem.status == "Available") {
    console.log("Duyet " + props.menuItem.productName);
  }
  return (
    <>
      {props.menuItem.status === "Available" && (
        <div className="col-md-4 col-12 p-4">
          <div
            className="card"
            style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
          >
            <div className="card-body pt-2">
              <div className="row col-10 offset-1 p-4">
                <Link to={`/menuItemDetails/${props.menuItem.productId}`}>
                  <img
                    src={props.menuItem.imageLinks[0]}
                    style={{ borderRadius: "50%" }}
                    alt=""
                    className="w-100 mt-5 image-box"
                  />
                </Link>
              </div>
              {props.menuItem.quantity && props.menuItem.quantity > 0 && (
                <i
                  className="bi bi-star btn btn-success"
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    padding: "5px 10px",
                    borderRadius: "3px",
                    outline: "none !important",
                    cursor: "pointer",
                  }}
                >
                  &nbsp; {props.menuItem.quantity}
                </i>
              )}

              {isAddingToCart ? (
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                  }}
                >
                  <MiniLoader />
                </div>
              ) : (
                <i
                  className="bi bi-cart-plus btn btn-outline-danger"
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    padding: "5px 10px",
                    borderRadius: "3px",
                    outline: "none !important",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAddToCart(props.menuItem.productId)}
                ></i>
              )}

              <div className="text-center">
                <p className="card-title m-0 text-success fs-3">
                  <Link
                    to={`/menuItemDetails/${props.menuItem.productId}`}
                    style={{ textDecoration: "none", color: "green" }}
                  >
                    {props.menuItem.productName}
                  </Link>
                </p>
                <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
                  {props.menuItem.categoryName}
                </p>
              </div>
              <p className="card-text" style={{ textAlign: "center" }}>
                {props.menuItem.description}
              </p>
              <div className="row text-center">
                <h4>{props.menuItem.price.toLocaleString("vi-VN") + " VNĐ"}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    // <div className="col-md-4 col-12 p-4">
    //   <div
    //     className="card"
    //     style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
    //   >
    //     <div className="card-body pt-2">
    //       <div className="row col-10 offset-1 p-4">
    //         <Link to={`/menuItemDetails/${props.menuItem.productId}`}>
    //           <img
    //             src={props.menuItem.imageLinks[0]}
    //             style={{ borderRadius: "50%" }}
    //             alt=""
    //             className="w-100 mt-5 image-box"
    //           />
    //         </Link>
    //       </div>
    //       {props.menuItem.quantity && props.menuItem.quantity > 0 && (
    //         <i
    //           className="bi bi-star btn btn-success"
    //           style={{
    //             position: "absolute",
    //             top: "15px",
    //             left: "15px",
    //             padding: "5px 10px",
    //             borderRadius: "3px",
    //             outline: "none !important",
    //             cursor: "pointer",
    //           }}
    //         >
    //           &nbsp; {props.menuItem.quantity}
    //         </i>
    //       )}

    //       {isAddingToCart ? (
    //         <div
    //           style={{
    //             position: "absolute",
    //             top: "15px",
    //             right: "15px",
    //           }}
    //         >
    //           <MiniLoader />
    //         </div>
    //       ) : (
    //         <i
    //           className="bi bi-cart-plus btn btn-outline-danger"
    //           style={{
    //             position: "absolute",
    //             top: "15px",
    //             right: "15px",
    //             padding: "5px 10px",
    //             borderRadius: "3px",
    //             outline: "none !important",
    //             cursor: "pointer",
    //           }}
    //           onClick={() => handleAddToCart(props.menuItem.productId)}
    //         ></i>
    //       )}

    //       <div className="text-center">
    //         <p className="card-title m-0 text-success fs-3">
    //           <Link
    //             to={`/menuItemDetails/${props.menuItem.productId}`}
    //             style={{ textDecoration: "none", color: "green" }}
    //           >
    //             {props.menuItem.productName}
    //           </Link>
    //         </p>
    //         <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
    //           {props.menuItem.categoryName}
    //         </p>
    //       </div>
    //       <p className="card-text" style={{ textAlign: "center" }}>
    //         {props.menuItem.description}
    //       </p>
    //       <div className="row text-center">
    //         <h4>{props.menuItem.price.toLocaleString("vi-VN") + " VNĐ"}</h4>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default MenuItemCart;
