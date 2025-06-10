// orderInterface.ts

interface UserInfo {
  name: string;
  phoneNumber: string;
  address: string;
}

interface SimplifiedCartItem {
  id: number;
  cantidad: number;
}

interface OrderAttributes {
  id?: number;
  name: string | null;
  phone: string | null;
  address: string | null;
  extraCommentary: string;
  delivery: boolean;
  totalAmount: number; 
  totalCostPriceAmount: number;
  statusId: number;
  createdAt?: Date;  
  updatedAt?: Date; 
}

interface OrderData {
  userInfo: UserInfo;
  extraCommentary: string;
}

export { UserInfo, SimplifiedCartItem, OrderAttributes, OrderData };
