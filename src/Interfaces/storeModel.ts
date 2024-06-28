export default interface storeModel {
  success: boolean;
  message: string;
  data: {
    storeId: number;
    storeName: string;
    accountId: number;
    location: string;
  };
}
