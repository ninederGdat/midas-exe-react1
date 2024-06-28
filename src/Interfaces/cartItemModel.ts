import cartDetailsModel from "./cartDetailsModel";
import menuItemModel from "./menuItemModel";

export default interface cartItemModel {
  cartId: number;
  productId: number;
  productName: string;
  price: number;
  imageLinks: string[];

  quantity?: 1;
}
