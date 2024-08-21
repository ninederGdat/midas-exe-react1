import { orderHeaderModel } from "../../../Interfaces";

export default interface OrderListProps {
  isLoading: boolean;
  orderData: orderHeaderModel[];
  isAdmin: boolean; // Thêm thuộc tính này
}
