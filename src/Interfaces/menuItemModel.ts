import { SD_ItemSt } from "../Utility/SD";

export default interface menuItemModel {
  productId: number;
  categoryName: string;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  status: SD_ItemSt;
  imageLinks: string;
}
