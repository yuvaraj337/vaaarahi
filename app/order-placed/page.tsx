import { Suspense } from "react";
import OrderPlacedContent from "./OrderPlacedContent";

export default function OrderPlacedPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0F0F10] flex items-center justify-center text-white">
          Loading...
        </main>
      }
    >
      <OrderPlacedContent />
    </Suspense>
  );
}