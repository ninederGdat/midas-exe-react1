import cartItemModel from "./cartItemModel";

export default interface shoppingCartModel {
  productId?: number;
  UserID?: string;
  cartItems?: cartItemModel[];
  cartTotal?: number;
  stripePaymentIntentId?: any;
  clientSecret?: any;

  // success: boolean;
  // message: string;
  // cartItems?: cartItemModel[];
}
