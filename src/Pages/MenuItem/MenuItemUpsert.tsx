import React, { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import {
  useCreateMenuItemMutation,
  useGetMenuItemByIdQuery,
  useUpdateMenuItemMutation,
} from "../../Apis/menuItemApi";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import { SD_Categories } from "../../Utility/SD";
import { useGetStoreByaccountIdQuery } from "../../Apis/storeApi";
import { userModel } from "../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";

const Categories = [
  SD_Categories.DRESS,
  SD_Categories.HOODIE,
  SD_Categories.JACKET,
  SD_Categories.JEANS,
  SD_Categories.TSHIRT,
];

const CategoryDisplayNames: { [key: string]: string } = {
  [SD_Categories.TSHIRT]: "T-Shirt",
  [SD_Categories.JEANS]: "Jeans",
  [SD_Categories.JACKET]: "Jacket",
  [SD_Categories.DRESS]: "Dress",
  [SD_Categories.HOODIE]: "Hoodie",
};

const menuItemData = {
  productName: "",
  description: "",
  categoryId: Categories[0],
  price: "",
  storeId: "",
  quantity: "",
};

function MenuItemUpsert() {
  const { id } = useParams();
  const [imageToBeStore, setImageToBeStore] = useState<any>();
  const [imageToBeDisplay, setImageToBeDisplay] = useState<string>("");
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [loading, setLoading] = useState(false);

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const { data } = useGetMenuItemByIdQuery(id);

  const shopData = useGetStoreByaccountIdQuery(userData.accountId);

  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const tempData = {
        productName: data.productName,
        description: data.description,
        quantity: data.quantity,
        storeId: shopData.data.data[0].storeId,
        categoryId: data.categoryId,
        price: data.price,
      };
      setMenuItemInputs(tempData);
      setImageToBeDisplay(data.imageLinks);
    }
  }, [data]);

  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];
      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToBeStore("");
        toastNotify("File must be less than 1 MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToBeStore("");
        toastNotify("File Must be in jpeg, jpg or png", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToBeStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToBeDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!imageToBeStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("ProductName", menuItemInputs.productName);
    formData.append("Description", menuItemInputs.description);
    formData.append("Quantity", menuItemInputs.quantity);
    formData.append("StoreId", menuItemInputs.storeId);
    formData.append("CategoryId", menuItemInputs.categoryId as string); // Use type assertion

    formData.append("Price", menuItemInputs.price);
    if (imageToBeStore) formData.append("Images", imageToBeStore);
    if (id) formData.append("Id", id);

    // Log FormData contents
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    let response;
    if (id) {
      response = await updateMenuItem({ data: formData, id });
      toastNotify("Menu Item updated successfully", "success");
    } else {
      response = await createMenuItem(formData);
      toastNotify("Menu Item created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/menuItem/menuitemShop");
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className="px-2 text-success">
        {id ? "Edit Menu Item" : "Add Menu Item"}
      </h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="productName"
              value={menuItemInputs.productName}
              onChange={handleMenuItemInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              name="description"
              value={menuItemInputs.description}
              rows={10}
              onChange={handleMenuItemInput}
            ></textarea>
            <input
              type="number"
              className="form-control mt-3"
              placeholder="Store ID"
              name="storeId"
              value={menuItemInputs.storeId}
              onChange={handleMenuItemInput}
            />
            <input
              type="number"
              className="form-control mt-3"
              placeholder="Enter Quantity"
              name="quantity"
              value={menuItemInputs.quantity}
              onChange={handleMenuItemInput}
            />
            <select
              className="form-control mt-3 form-select"
              name="categoryId"
              value={menuItemInputs.categoryId}
              onChange={handleMenuItemInput}
            >
              {Object.entries(SD_Categories).map(([key, value]) => (
                <option key={value} value={value}>
                  {CategoryDisplayNames[value]}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              value={menuItemInputs.price}
              onChange={handleMenuItemInput}
            />
            <input
              type="file"
              className="form-control mt-3"
              onChange={handleFileChange}
            />
            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  // onClick={() => navigate("/menuItem/menuitemlist")}
                  onClick={() => navigate(-1)}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back To Menu Items
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToBeDisplay}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MenuItemUpsert;
