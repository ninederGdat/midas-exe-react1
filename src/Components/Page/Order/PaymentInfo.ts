import ItemPayment from "./ItemPayment";

export default interface PaymentInfo {
  amount: number;
  description: string;
  items: ItemPayment[];
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerAddress: string;
  status: string;
}
