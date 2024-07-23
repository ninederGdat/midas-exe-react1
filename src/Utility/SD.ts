export enum SD_Roles {
  ADMIN = "1",
  CUSTOMER = "2",
}

export enum SD_Gender {
  MALE = "Male",
  FEMALE = "Female",
}

export enum SD_Status {
  PENDING = "Chưa giao",
  CONFIRMED = "Ðang giao",
  BEING_COOKED = "Being Cooked",
  READY_FOR_PICKUP = "Ready for Pickup",
  COMPLETED = "Giao thành công",
  CANCLED = "Cancled",
}

export enum SD_Categories {
  TSHIRT = "1",
  JEANS = "2",
  JACKET = "3",
  DRESS = "4",
  HOODIE = "5",
}

export enum SD_SortTypes {
  PRICE_LOW_HIGH = "Price Low - High",
  PRICE_HIGH_LOW = "Price High - Low",
  NAME_A_Z = "Name A - Z",
  NAME_Z_A = "Name Z - A",
}

export enum SD_ItemSt {
  AVAILABLE = "Available",
  SOLD = "Unavailable",
}
