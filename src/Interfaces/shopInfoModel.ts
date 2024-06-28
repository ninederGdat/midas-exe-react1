import menuItemShopModel from "./menuItemShopModel";

export default interface shopInfoModel {
  success: boolean;
  message: string;
  data: menuItemShopModel[];
}
