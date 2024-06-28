import React from "react";
import {
  useDeleteMenuItemMutation,
  useGetMenuItemsQuery,
} from "../../Apis/menuItemApi";
import { MainLoader } from "../../Components/Page/Common";
import { menuItemModel, menuItemShopModel, userModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetStoreByUserIdQuery } from "../../Apis/storeApi";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";

function MenuItemShop() {
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const [deleteMenuItem] = useDeleteMenuItemMutation();
  const { data, isLoading } = useGetStoreByUserIdQuery(userData.UserID);
  const navigate = useNavigate();

  const handleMenuItemDelete = async (id: number) => {
    toast.promise(
      deleteMenuItem(id),
      {
        pending: "Processing your request...",
        success: "Menu Item Deleted successfully 👌",
        error: "Error Encounterd 🤯",
      },
      {
        theme: "light",
      }
    );
  };

  // Tính tổng doanh thu từ các sản phẩm đã bán
  const calculateTotalRevenue = (shop: menuItemShopModel) => {
    return shop.product
      .filter((item) => item.status === "Sold")
      .reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">MenuItem List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/menuitem/menuitemupsert/")}
            >
              Add New Menu Item
            </button>
          </div>
          <div className="d-flex justify-content-left text-info">
            <h1>{data.data[0].storeName}</h1>
            <h2 className="mt-2 ms-3">Store ID: {data.data[0].storeId}</h2>
          </div>

          <div className="p-2">
            <div className="row border">
              <div className="col-2">Image</div>
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Category</div>
              <div className="col-1">Price</div>
              <div className="col-1">Status</div>
              <div className="col-1">Action</div>
            </div>

            {data.data.map((shop: menuItemShopModel) => {
              const totalRevenue = calculateTotalRevenue(shop);
              return (
                <div key={shop.storeId}>
                  {shop.product.map((menuItem: menuItemModel) => {
                    return (
                      <div className="row border" key={menuItem.productId}>
                        <div className="col-2">
                          <img
                            src={menuItem.imageLinks}
                            alt="no content"
                            style={{ width: "100%", maxWidth: "120px" }}
                          />
                        </div>
                        <div className="col-1">{menuItem.productId}</div>
                        <div className="col-2">{menuItem.productName}</div>
                        <div className="col-2">{menuItem.categoryName}</div>
                        <div className="col-1">{menuItem.price}</div>
                        <div className="col-1">{menuItem.status}</div>
                        <div className="col-1">
                          <button className="btn btn-success">
                            <i
                              className="bi bi-pencil-fill"
                              onClick={() =>
                                navigate(
                                  "/menuitem/menuitemupsert/" +
                                    menuItem.productId
                                )
                              }
                            ></i>
                          </button>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() =>
                              handleMenuItemDelete(menuItem.productId)
                            }
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <div className="row border mt-3">
                    <div className="col-12 text-right text-success">
                      <strong className="fs-3">
                        Total Revenue:{" "}
                        {totalRevenue.toLocaleString("vi-VN") + " VNĐ"}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default MenuItemShop;
