import { SD_Status } from "../Utility/SD";
import accountModel from "./accountModel";
import orderDetailsModel from "./orderDetailsModel";
import paymentMethodModel from "./paymentMethodModel";
import shipmentMethodModel from "./shipmentMethodModel";
import storeModel from "./storeModel";

export default interface orderHeaderModel {
  orderId: number;
  createDate: string;
  totalPrice: number;
  status: SD_Status;
  shippedDate: string;
  account: accountModel;
  paymentMethod: paymentMethodModel;
  shipmentMethod: shipmentMethodModel;
  store: {
    storeId: number;
    storeName: string;
    accountId: number;
    location: string;
  };
  isRefund: boolean;
  orderDetails: orderDetailsModel[];
}
