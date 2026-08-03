export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id?: string;

  orderId: string;

  customerName: string;

  phone: string;

  address: string;

  location: string;

  paymentMethod: string;

  paymentStatus: string;

  orderStatus: string;

  total: number;

  createdAt: number;

  items: OrderItem[];
}