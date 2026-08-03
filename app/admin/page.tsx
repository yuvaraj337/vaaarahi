"use client";

import { useEffect, useState } from "react";
import {
  getMenu,
  addFood,
  updateFood,
  deleteFood,
} from "@/lib/menuService";

import { MenuItem } from "@/types/menu";

import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export default function AdminPage() {

  const router = useRouter();

  const [foods, setFoods] =
    useState<MenuItem[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [checkingAuth, setCheckingAuth] =
    useState(true);

  const [form, setForm] =
    useState<MenuItem>({
      name: "",
      description: "",
      category: "Salads",
      price: 0,
      image: "",
      rating: 4.8,
      calories: 0,
      protein: "",
      isVegetarian: true,
    });

  async function loadFoods() {
  const data = await getMenu();

  console.log("Firestore Menu:", data);

  setFoods(data);
}

  useEffect(() => {
    loadFoods();
  }, []);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(auth, (user) => {

        if (!user) {

          router.replace("/login");

        } else {

          setCheckingAuth(false);

        }

      });

    return () => unsubscribe();

  }, [router]);

  if (checkingAuth) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F10] text-white">
        Checking Login...
      </div>
    );

  }

  async function handleSubmit() {

    try {

      setLoading(true);

      if (editingId) {

        await updateFood(editingId, form);

      } else {

        await addFood(form);

      }

      await loadFoods();

      setEditingId(null);

      setForm({
        name: "",
        description: "",
        category: "Salads",
        price: 0,
        image: "",
        rating: 4.8,
        calories: 0,
        protein: "",
        isVegetarian: true,
      });

    } finally {

      setLoading(false);

    }

  }
    async function handleDelete(id: string) {
    if (!confirm("Delete this food item?")) return;

    await deleteFood(id);

    await loadFoods();
  }

  function handleEdit(food: MenuItem) {
    if (!food.id) return;

    setEditingId(food.id);

    setForm({
      name: food.name,
      description: food.description,
      category: food.category,
      price: food.price,
      image: food.image,
      rating: food.rating,
      calories: food.calories,
      protein: food.protein,
      isVegetarian: food.isVegetarian,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen bg-[#0F0F10] text-white p-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-5xl font-bold">
            Restaurant Dashboard
          </h1>

          <button
            onClick={async () => {
              await signOut(auth);
              router.replace("/login");
            }}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold"
          >
            Logout
          </button>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Add Food */}

          <div className="bg-[#171717] rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">

              {editingId
                ? "Edit Food"
                : "Add Food"}

            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Food Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full bg-[#252525] rounded-xl p-4 outline-none"
              />

              <textarea
                rows={4}
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className="w-full bg-[#252525] rounded-xl p-4 outline-none"
              />

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
                className="w-full bg-[#252525] rounded-xl p-4 outline-none"
              >
                <option>Salads</option>
                <option>Protein Shakes</option>
                <option>Soups</option>
                <option>Rolls</option>
                <option>Eggs</option>
              </select>

              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: Number(e.target.value),
                  })
                }
                className="w-full bg-[#252525] rounded-xl p-4 outline-none"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) =>
                  setForm({
                    ...form,
                    image: e.target.value,
                  })
                }
                className="w-full bg-[#252525] rounded-xl p-4 outline-none"
              />

              <input
                type="number"
                placeholder="Calories"
                value={form.calories}
                onChange={(e) =>
                  setForm({
                    ...form,
                    calories: Number(e.target.value),
                  })
                }
                className="w-full bg-[#252525] rounded-xl p-4 outline-none"
              />

              <input
                type="text"
                placeholder="Protein"
                value={form.protein}
                onChange={(e) =>
                  setForm({
                    ...form,
                    protein: e.target.value,
                  })
                }
                className="w-full bg-[#252525] rounded-xl p-4 outline-none"
              />

              <label className="flex gap-3 items-center">

                <input
                  type="checkbox"
                  checked={form.isVegetarian}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isVegetarian: e.target.checked,
                    })
                  }
                />

                Vegetarian

              </label>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[#E63946] hover:bg-red-600 rounded-xl py-4 font-bold text-lg"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Save Changes"
                  : "Add Food"}
              </button>

            </div>

          </div>
                    {/* Food Items */}

          <div className="bg-[#171717] rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Food Items
            </h2>

            <div className="space-y-5">

              {foods.length === 0 ? (

                <p className="text-white/50">
                  No food items found.
                </p>

              ) : (

                foods.map((food) => (

                  <div
                    key={food.id}
                    className="flex items-center justify-between bg-[#252525] rounded-2xl p-5"
                  >

                    <div className="flex gap-4 items-center">

                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-24 h-24 rounded-xl object-cover"
                      />

                      <div>

                        <h3 className="text-2xl font-bold">
                          {food.name}
                        </h3>

                        <p className="text-white/50 mt-1">
                          {food.description}
                        </p>

                        <p className="text-[#E63946] font-bold mt-2">
                          ₹{food.price}
                        </p>

                        <p className="text-white/40">
                          {food.category}
                        </p>

                        <p className="text-white/40 text-sm mt-1">
                          ⭐ {food.rating}
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-3">

                      <button
                        onClick={() => handleEdit(food)}
                        className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          if (!food.id) return;
                          handleDelete(food.id);
                        }}
                        className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-semibold"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>
          </main>
  );
}