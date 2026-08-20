import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";
import { Offer } from "@/types/offer";

const offersRef = collection(db, "offers");

// Get all offers
export async function getOffers(): Promise<Offer[]> {
  const offersQuery = query(
    offersRef,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(offersQuery);

  return snapshot.docs.map((offerDoc) => ({
    id: offerDoc.id,
    ...(offerDoc.data() as Omit<Offer, "id">),
  }));
}

// Add offer
export async function addOffer(
  offer: Omit<Offer, "id" | "createdAt">
) {
  return await addDoc(offersRef, {
    ...offer,
    createdAt: Date.now(),
  });
}

// Update offer
export async function updateOffer(
  id: string,
  data: Partial<Offer>
) {
  return await updateDoc(
    doc(db, "offers", id),
    data
  );
}

// Delete offer
export async function deleteOffer(
  id: string
) {
  return await deleteDoc(
    doc(db, "offers", id)
  );
}