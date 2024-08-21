import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetPaymentInfoQuery } from "../../Apis/paymentApi"; // Đảm bảo import đúng
import { MainLoader } from "../../Components/Page/Common";

let confirmedImage = require("../../Assets/Images/success.jpg");

function OrderConfirmed() {
  const [searchParams] = useSearchParams();

  // Lấy paymentLinkId và accountId từ tham số URL
  const paymentLinkId = searchParams.get("id");
  const accountid = searchParams.get("accountId");

  console.log(paymentLinkId);
  console.log(accountid);

  // Chuyển accountId thành số nếu cần
  const accountId = accountid ? Number(accountid) : undefined;

  // Gọi API để lấy thông tin thanh toán
  const { data, error, isLoading, refetch } = useGetPaymentInfoQuery({
    paymentLinkId: paymentLinkId!,
    accountId: accountId!,
  });

  if (isLoading) {
    return <MainLoader />;
  }

  if (error) {
    return (
      <div>
        <div>Error fetching payment info</div>
        <button onClick={refetch}>Try Again</button>
      </div>
    );
  }

  // Kiểm tra kiểu dữ liệu trả về từ API
  const paymentInfo = data;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Phần thông tin thanh toán thành công */}
        <div className="col-md-6 text-center d-flex justify-content-center align-items-center">
          <div>
            <i
              style={{ fontSize: "7rem" }}
              className="bi bi-check2-circle text-success"
            ></i>
            <div className="pb-5">
              <h2 className="text-success">Order has been Confirmed!</h2>
              <h5 className="mt-3">Thank you for choosing our store</h5>
              <p>We hope to see you again.</p>
              <img
                src={confirmedImage}
                style={{ width: "40%", borderRadius: "30px" }}
                alt="Order Confirmed"
              />
            </div>
          </div>
        </div>

        {/* Phần thông tin thanh toán */}
        <div className="col-md-6">
          <div className="border p-4 rounded">
            <h4 className="mb-3">Payment Information</h4>
            {paymentInfo ? (
              <ul className="list-unstyled">
                <li>
                  <strong>Amount:</strong> ${paymentInfo.amount}
                </li>
                <li>
                  <strong>Description:</strong> {paymentInfo.description}
                </li>
                <li>
                  <strong>Buyer Name:</strong> {paymentInfo.buyerName}
                </li>
                <li>
                  <strong>Buyer Phone:</strong> {paymentInfo.buyerPhone}
                </li>
                <li>
                  <strong>Buyer Email:</strong> {paymentInfo.buyerEmail}
                </li>
                <li>
                  <strong>Buyer Address:</strong> {paymentInfo.buyerAddress}
                </li>
                <li>
                  <strong>Status:</strong> {paymentInfo.status}
                </li>
                {/* Thêm thông tin khác nếu cần */}
              </ul>
            ) : (
              <p>No payment information available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmed;
