import React from "react";
import {
  useDeleteMenuItemMutation,
  useGetMenuItemsQuery,
} from "../../Apis/menuItemApi";
import { MainLoader } from "../../Components/Page/Common";
import { menuItemModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MenuItemList() {
  const [deleteMenuItem] = useDeleteMenuItemMutation();
  const { data, isLoading } = useGetMenuItemsQuery(null);
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

  console.log(data);

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

            {data.map((menuItem: menuItemModel) => {
              return (
                <div className="row border" key={menuItem.productId}>
                  <div className="col-2">
                    <img
                      src={menuItem.imageLinks[0]}
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
                            "/menuitem/menuitemupsert/" + menuItem.productId
                          )
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleMenuItemDelete(menuItem.productId)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
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

export default MenuItemList;
