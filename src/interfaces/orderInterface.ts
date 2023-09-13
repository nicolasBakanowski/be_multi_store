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
  id: number;
  userInfo: UserInfo;
  extraCommentary: string;
  statusId: number;
}
interface OrderData {
  userInfo: UserInfo;
  extraCommentary: string;
}

export { UserInfo, SimplifiedCartItem, OrderAttributes, OrderData };
