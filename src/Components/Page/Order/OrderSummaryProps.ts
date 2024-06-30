import {
  ItemOrders,
  cartItemModel,
  shoppingCartModel,
} from "../../../Interfaces";
import { SD_Status } from "../../../Utility/SD";

export interface OrderSummaryProps {
  data: {
    id?: number;
    cartItems: ItemOrders[];
    amount?: number;
    UserID?: string;
    stripePaymentIntentId?: string;
    status?: SD_Status;
    checkoutUrl: string;
    paymentLinkId: string;
  };
  userInput: {
    name: string;
    email?: string;
    phoneNumber: string;
    location: string;
  };
}