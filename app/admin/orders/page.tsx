"use client";

import { useEffect, useState } from "react";

import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "@/lib/orderService";

import { Order } from "@/types/order";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<Order[]>([]);

  async function loadOrders() {
    const data = await getOrders();

    setOrders(data);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function changeStatus(
    id: string,
    status: string
  ) {
    await updateOrderStatus(id, status);

    loadOrders();
  }

  async function removeOrder(id: string) {

    if (!confirm("Delete this order?")) return;

    await deleteOrder(id);

    loadOrders();
  }

  return (

    <main className="min-h-screen bg-[#0F0F10] text-white p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">

          Orders Dashboard

        </h1>

        <div className="space-y-8">
        {orders.length === 0 ? (

  <p className="text-white/50">
    No Orders Yet
  </p>

) : (

  orders.map((order) => (

    <div
      key={order.id}
      className="bg-[#171717] rounded-3xl p-8 border border-white/10"
    >

      <div className="flex justify-between items-start flex-wrap gap-6">

        <div>

          <h2 className="text-3xl font-bold text-[#E63946]">
            {order.orderId}
          </h2>

          <p className="mt-4">
            <span className="font-bold">Customer:</span>{" "}
            {order.customerName}
          </p>

          <p>
            <span className="font-bold">Phone:</span>{" "}
            {order.phone}
          </p>

          <p>
            <span className="font-bold">Address:</span>{" "}
            {order.address}
          </p>

          <p>
            <span className="font-bold">Payment:</span>{" "}
            {order.paymentMethod}
          </p>

          <p>
            <span className="font-bold">Payment Status:</span>{" "}
            {order.paymentStatus}
          </p>

          <p className="mt-3 text-2xl font-bold">
            ₹{order.total}
          </p>

        </div>

        <div>

          <h3 className="text-xl font-bold mb-3">
            Ordered Items
          </h3>

          <div className="space-y-2">

            {order.items.map((item, index) => (

              <div key={index}>

                {item.name} × {item.quantity}

                {" - "}

                ₹{item.price}

              </div>

            ))}

          </div>

        </div>

        <div className="space-y-4">

          <label className="block text-sm mb-2">
            Order Status
          </label>

          <select
            value={order.orderStatus}
            onChange={(e) => {
              if (!order.id) return;

              changeStatus(
                order.id,
                e.target.value
              );
            }}
            className="bg-[#252525] rounded-xl p-3"
          >
            <option>Pending</option>
            <option>Preparing</option>
            <option>Out For Delivery</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          <button
            onClick={() => {
              if (!order.id) return;

              removeOrder(order.id);
            }}
            className="w-full bg-red-600 hover:bg-red-700 rounded-xl py-3 font-bold"
          >
            Delete Order
          </button>

        </div>

      </div>

    </div>

  ))

)}
        </div>

      </div>

    </main>

  );

}