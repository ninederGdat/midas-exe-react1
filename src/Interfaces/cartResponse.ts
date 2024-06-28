import cartItemModel from "./cartItemModel";

export default interface cartResponse {
  data?: {
    success: boolean;
    message: string;
    data: cartItemModel[];
  };
  error?: any;
}
