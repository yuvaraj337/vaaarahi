import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";
import { Order } from "@/types/order";

const ordersRef = collection(db, "orders");

// Add Order
export async function addOrder(order: Omit<Order, "id">) {
  return await addDoc(ordersRef, order);
}

// Get All Orders
export async function getOrders() {
  const snapshot = await getDocs(ordersRef);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...(docItem.data() as Order),
  }));
}

// Update Order Status
export async function updateOrderStatus(
  id: string,
  status: string
) {
  return await updateDoc(doc(db, "orders", id), {
    orderStatus: status,
  });
}

// Delete Order
export async function deleteOrder(id: string) {
  return await deleteDoc(doc(db, "orders", id));
}