import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateStoreMutation } from "../../Apis/storeApi";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";

const RegistStore = () => {
  const [storeName, setStoreName] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const [createStore, { isLoading }] = useCreateStoreMutation();
  const userData = useSelector((state: RootState) => state.userAuthStore);

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createStore({
        storeName,
        accountId: userData.UserID,
        location,
      }).unwrap();
      toast.success("Store created successfully!");
      navigate("/menuItem/menuItemShop");
    } catch (error) {
      toast.error("Failed to create store. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Store</h2>
      <form onSubmit={handleCreateStore}>
        <div className="mb-3">
          <label htmlFor="storeName" className="form-label">
            Store Name
          </label>
          <input
            type="text"
            className="form-control"
            id="storeName"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Store"}
        </button>
      </form>
    </div>
  );
};

export default RegistStore;
