export interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export type OrderStatus =
  | "NEW"
  | "PAYMENT_PENDING"
  | "PAYMENT_VERIFIED"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id?: string;

  orderId: string;

  name: string;

  phone: string;

  address: string;

  location: string;

  items: OrderItem[];

  total: number;

  paymentMethod: string;

  /*
   * Customer says that payment was completed.
   */
  paymentDone: boolean;

  /*
   * Restaurant has actually verified the payment.
   */
  paymentVerified: boolean;

  status: OrderStatus;

  /*
   * Firebase serverTimestamp()
   * can be a Timestamp, null, or undefined.
   */
  createdAt?: unknown;

  updatedAt?: unknown;
}