import React, { useState } from "react";
import {
  useCreateFeebackMutation,
  useDeleteFeedbackMutation,
  useGetAllFeedbacksQuery,
  useGetFeedbackByStoreIdQuery,
} from "../../../Apis/feedbackApi";
import { useGetStoreByUserIdQuery } from "../../../Apis/storeApi";
import { userModel } from "../../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useGetMenuItemByIdQuery } from "../../../Apis/menuItemApi";

interface FeedbackProps {
  menuItemId: number;
}

function Feedback({ menuItemId }: FeedbackProps) {
  console.log(menuItemId);

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const [content, setContent] = useState<string>("");
  const [createFeedback, { isLoading: isPosting }] = useCreateFeebackMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isShopError,
  } = useGetMenuItemByIdQuery(menuItemId);

  const shopId = productData?.store?.storeID;

  console.log(shopId);

  const {
    data: feedbackData,
    isLoading: isFeedbackLoading,
    isError: isFeedbackError,
  } = useGetFeedbackByStoreIdQuery(shopId, {
    skip: !shopId,
  });

  console.log(feedbackData?.data);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handlePostClick = async () => {
    const newFeedback = {
      accountId: userData.UserID,
      content,
      storeId: shopId,
    };
    console.log(newFeedback);
    try {
      await createFeedback(newFeedback).unwrap();

      setContent(""); // Clear input after posting
    } catch (error) {
      console.error("Failed to post feedback", error);
    }
  };

  const handleDeleteClick = async (feedbackId: number) => {
    try {
      await deleteFeedback(feedbackId).unwrap();
    } catch (error) {
      console.error("Failed to delete feedback", error);
    }
  };

  if (isProductLoading || isFeedbackLoading) {
    return <div>Loading...</div>;
  }

  if (isShopError || isFeedbackError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="mt-5">
      <div
        className="card border-secondary-subtle  border-3 rounded "
        style={{ height: "250px" }}
      >
        <div className="mb-3 card-body">
          <h5 className="card-title">Feedbacks of Store</h5>
          <div className="list-group list-group-flush">
            {feedbackData?.data?.map((feedback: any) => (
              <div
                key={feedback.feedbackId}
                className="d-flex align-items-center justify-content-between"
              >
                <li className="list-group-item flex-grow-1">
                  {feedback.username}: {feedback.content}
                </li>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleDeleteClick(feedback.feedbackId)}
                >
                  <i className="bi bi-x-circle-fill"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-12 mt-3 mb-3">
        {" "}
        <input
          type="text"
          className="form-control"
          placeholder="Write a comment..."
          value={content}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={handlePostClick}
        disabled={isPosting}
      >
        {isPosting ? "Posting..." : "Post"}
      </button>
    </div>
  );
}

export default Feedback;
