import menuItemModel from "./menuItemModel";

export default interface menuItemShopModel {
  storeId: number;
  storeName: string;
  accountId: number;
  location: string;
  product: menuItemModel[];
}
