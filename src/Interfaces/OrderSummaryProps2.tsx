// src/Components/Page/OrderSummary.types.ts
export interface OrderItem {
  productName: string;
  quantity: string;
  price: string;
}

export default interface OrderSummaryProps2 {
  data: {
    id: number;
    cartItems: OrderItem[];
    amount: number;
    status: string;
    createDate: string;
    paymentMethod: string;
    shipmentMethod: string | null;
    storeName: string;
    checkoutUrl?: string;
    paymentLinkId?: string;
  };
  userInput: {
    name: string;
    location: string;
  };
}
