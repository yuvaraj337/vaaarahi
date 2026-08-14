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

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function AdminPage() {
  const router = useRouter();

  const [foods, setFoods] = useState<MenuItem[]>([]);

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [checkingAuth, setCheckingAuth] =
    useState(true);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imageUploading, setImageUploading] =
    useState(false);

  const [form, setForm] = useState<MenuItem>({
    name: "",
    description: "",
    category: "Salads",
    price: 0,
    image: "",
    rating: 4.8,
    calories: 0,
    protein: "",
    // Kept internally so the existing MenuItem type
    // and menu service are not changed.
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

  /* =========================================
     UPLOAD IMAGE TO FIREBASE STORAGE
  ========================================= */

  async function uploadImage(
    file: File
  ): Promise<string> {
    const storage = getStorage(auth.app);

    const safeFileName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "-");

    const fileName =
      `${Date.now()}-${safeFileName}`;

    const storageRef = ref(
      storage,
      `food-images/${fileName}`
    );

    await uploadBytes(storageRef, file);

    const downloadURL =
      await getDownloadURL(storageRef);

    return downloadURL;
  }

  /* =========================================
     SUBMIT FOOD
  ========================================= */

  async function handleSubmit() {
    try {
      setLoading(true);

      let imageUrl = form.image;

      /* ---------------------------------------
         Upload selected image if available
      --------------------------------------- */

      if (imageFile) {
        setImageUploading(true);

        imageUrl = await uploadImage(imageFile);

        setImageUploading(false);
      }

      /* ---------------------------------------
         Require an image
      --------------------------------------- */

      if (!imageUrl.trim()) {
        alert(
          "Please upload an image or enter an online image URL."
        );

        setLoading(false);
        return;
      }

      const foodData: MenuItem = {
        ...form,
        image: imageUrl,
      };

      /* ---------------------------------------
         EDIT
      --------------------------------------- */

      if (editingId) {
        await updateFood(
          editingId,
          foodData
        );
      }

      /* ---------------------------------------
         ADD
      --------------------------------------- */

      else {
        await addFood(foodData);
      }

      /* ---------------------------------------
         Refresh list
      --------------------------------------- */

      await loadFoods();

      /* ---------------------------------------
         Reset form
      --------------------------------------- */

      setEditingId(null);

      setImageFile(null);

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

    } catch (error) {
      console.error(
        "Error saving food:",
        error
      );

      alert(
        "Failed to save food item. Please try again."
      );
    } finally {
      setImageUploading(false);
      setLoading(false);
    }
  }

  /* =========================================
     DELETE
  ========================================= */

  async function handleDelete(id: string) {
    if (!confirm("Delete this food item?"))
      return;

    await deleteFood(id);

    await loadFoods();
  }

  /* =========================================
     EDIT
  ========================================= */

  function handleEdit(food: MenuItem) {
    if (!food.id) return;

    setEditingId(food.id);

    setImageFile(null);

    setForm({
      name: food.name,
      description: food.description,
      category: food.category,
      price: food.price,
      image: food.image,
      rating: food.rating,
      calories: food.calories,
      protein: food.protein,
      isVegetarian:
        food.isVegetarian ?? true,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen bg-[#0F0F10] text-white p-10">

      <div className="max-w-7xl mx-auto">

        {/* =====================================
            HEADER
        ===================================== */}

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

          {/* =====================================
              ADD FOOD
          ===================================== */}

          <div className="bg-[#171717] rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              {editingId
                ? "Edit Food"
                : "Add Food"}
            </h2>

            <div className="space-y-5">

              {/* FOOD NAME */}

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

              {/* DESCRIPTION */}

              <textarea
                rows={4}
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description:
                      e.target.value,
                  })
                }
                className="w-full bg-[#252525] rounded-xl p-4 outline-none"
              />

              {/* CATEGORY */}

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category:
                      e.target.value,
                  })
                }
                className="w-full bg-[#252525] rounded-xl p-4 outline-none"
              >
                <option>Salads</option>
                <option>
                  Protein Shakes
                </option>
                <option>Soups</option>
                <option>Rolls</option>
                <option>Eggs</option>
              </select>

              {/* PRICE */}

              <input
                type="number"
                min="0"
                placeholder="Price (₹)"
                value={
                  form.price === 0
                    ? ""
                    : form.price
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    price:
                      Number(
                        e.target.value
                      ) || 0,
                  })
                }
                className="w-full bg-[#252525] rounded-xl p-4 outline-none"
              />

              {/* CALORIES */}

              <input
                type="number"
                min="0"
                placeholder="Calories (kcal)"
                value={
                  form.calories === 0
                    ? ""
                    : form.calories
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    calories:
                      Number(
                        e.target.value
                      ) || 0,
                  })
                }
                className="w-full bg-[#252525] rounded-xl p-4 outline-none"
              />

              {/* PROTEIN */}

              <input
                type="text"
                placeholder="Protein (g)"
                value={form.protein}
                onChange={(e) =>
                  setForm({
                    ...form,
                    protein:
                      e.target.value,
                  })
                }
                className="w-full bg-[#252525] rounded-xl p-4 outline-none"
              />

              {/* =================================
                  DEVICE IMAGE UPLOAD
              ================================= */}

              <div className="bg-[#252525] rounded-xl p-5">

                <label className="block text-white font-semibold mb-3">
                  Food Image
                </label>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => {
                    const file =
                      e.target.files?.[0] ||
                      null;

                    setImageFile(file);
                  }}
                  className="w-full text-white/70 text-sm
                  file:mr-4
                  file:rounded-lg
                  file:border-0
                  file:bg-[#E63946]
                  file:px-4
                  file:py-2
                  file:text-white
                  file:font-semibold
                  file:cursor-pointer"
                />

                {imageFile && (
                  <p className="text-green-400 text-sm mt-3">
                    Selected:{" "}
                    {imageFile.name}
                  </p>
                )}

              </div>

              {/* =================================
                  OR ONLINE IMAGE URL
              ================================= */}

              <div>

                <p className="text-white/50 text-sm mb-2">
                  Or use an online image
                </p>

                <input
                  type="url"
                  placeholder="Online Image URL (https://...)"
                  value={form.image}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      image:
                        e.target.value,
                    });

                    // If online URL is entered,
                    // remove selected file so URL
                    // becomes the image source.
                    setImageFile(null);
                  }}
                  className="w-full bg-[#252525] rounded-xl p-4 outline-none"
                />

              </div>

              {/* =================================
                  IMAGE PREVIEW
              ================================= */}

              {(form.image ||
                imageFile) && (
                <div className="bg-[#252525] rounded-xl p-4">

                  <p className="text-white/50 text-sm mb-3">
                    Image Preview
                  </p>

                  {imageFile ? (
                    <img
                      src={URL.createObjectURL(
                        imageFile
                      )}
                      alt="Selected food"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  ) : form.image ? (
                    <img
                      src={form.image}
                      alt="Food preview"
                      className="w-full h-48 object-cover rounded-xl"
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />
                  ) : null}

                </div>
              )}

              {/* =================================
                  ADD / SAVE
              ================================= */}

              <button
                onClick={handleSubmit}
                disabled={
                  loading ||
                  imageUploading
                }
                className="w-full bg-[#E63946] hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl py-4 font-bold text-lg"
              >
                {imageUploading
                  ? "Uploading Image..."
                  : loading
                  ? "Saving..."
                  : editingId
                  ? "Save Changes"
                  : "Add Food"}
              </button>

            </div>

          </div>

          {/* =====================================
              FOOD ITEMS
          ===================================== */}

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
                        onClick={() =>
                          handleEdit(food)
                        }
                        className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          if (!food.id)
                            return;

                          handleDelete(
                            food.id
                          );
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