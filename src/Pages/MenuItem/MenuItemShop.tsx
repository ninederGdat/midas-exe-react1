import React, { useState, useEffect } from "react";
import mammoth from "mammoth";
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
import Modal from "react-modal";
import { useUpdateStatusUserMutation } from "../../Apis/usersApi";

const ITEMS_PER_PAGE = 6;

function MenuItemShop() {
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [deleteMenuItem] = useDeleteMenuItemMutation();
  const { data, isLoading } = useGetStoreByUserIdQuery(userData.UserID);
  const navigate = useNavigate();
  const [updateStatusUser] = useUpdateStatusUserMutation(); // Hook for updateStatusUser API

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [termsContent, setTermsContent] = useState("");

  useEffect(() => {
    fetch("/term.docx")
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => mammoth.convertToHtml({ arrayBuffer }))
      .then((result) => setTermsContent(result.value))
      .catch((error) => console.error("Error loading terms:", error));
  }, []);

  const handleMenuItemDelete = async (id: number) => {
    toast.promise(
      deleteMenuItem(id),
      {
        pending: "Processing your request...",
        success: "Menu Item Deleted successfully 👌",
        error: "Error Encountered 🤯",
      },
      {
        theme: "light",
      }
    );
  };

  const calculateTotalRevenue = (shop: menuItemShopModel) => {
    return shop?.product
      .filter((item) => item.status === "Sold")
      .reduce((total, item) => total + item.price, 0);
  };

  const totalItems = data
    ? data.data.reduce((acc: any, shop: any) => acc + shop.product.length, 0)
    : 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const currentData = data
    ? data.data
        .reduce((acc: menuItemModel[], shop: menuItemShopModel) => {
          return [...acc, ...shop.product];
        }, [])
        .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : [];

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  const handleAgree = async () => {
    if (isAgreed) {
      try {
        await updateStatusUser({
          id: userData.UserID,
          data: { status: "Active" }, // Update status to Active
        });
        closeModal(); // Close modal on success
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    }
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">MenuItem List</h1>

            {data?.data.length > 0 ? (
              userData.status === "Active" && (
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/menuitem/menuitemupsert/")}
                >
                  Add New Menu Item
                </button>
              )
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/menuItem/registStore")}
              >
                Create Store
              </button>
            )}
          </div>
          <div className="d-flex justify-content-left text-info">
            <h1>{data?.data[0]?.storeName}</h1>
            <h2 className="mt-2 ms-3">Store ID: {data?.data[0]?.storeId}</h2>
          </div>

          <div className="p-2">
            {userData.status === "Inactive" && data?.data.length === 0 && (
              <button className="btn btn-primary mb-3" onClick={openModal}>
                Đăng ký bán hàng
              </button>
            )}
            <div className="row border">
              <div className="col-2">Image</div>
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Category</div>
              <div className="col-1">Price</div>
              <div className="col-1">Status</div>
              <div className="col-1">Action</div>
            </div>

            {currentData.length > 0 ? (
              currentData.map((menuItem: menuItemModel) => {
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
              })
            ) : (
              <div className="row border mt-3">
                <div className="col-12 text-center text-danger">
                  <strong className="fs-3">
                    Không có sản phẩm hoặc bạn chưa được đăng ký thành người
                    bán.
                  </strong>
                </div>
              </div>
            )}

            <div className="pagination mt-3">
              <button
                className="btn btn-primary me-2"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-primary ms-2"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            {currentData.length > 0 && (
              <div className="row border mt-3">
                <div className="col-12 text-right text-success">
                  <strong className="fs-3">
                    Total Revenue:{" "}
                    {calculateTotalRevenue(data?.data[0]).toLocaleString(
                      "vi-VN"
                    ) + " VNĐ"}
                  </strong>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Đăng ký bán hàng"
      >
        <h2>Điều khoản</h2>
        <div dangerouslySetInnerHTML={{ __html: termsContent }} />
        <div>
          <input
            type="checkbox"
            id="agree"
            checked={isAgreed}
            onChange={handleAgreeChange}
          />
          <label htmlFor="agree">Tôi đồng ý với điều khoản</label>
        </div>
        <button
          className="btn btn-success"
          onClick={handleAgree}
          disabled={!isAgreed}
        >
          Đồng ý
        </button>
        <button className="btn btn-secondary" onClick={closeModal}>
          Đóng
        </button>
      </Modal>
    </>
  );
}

export default MenuItemShop;
