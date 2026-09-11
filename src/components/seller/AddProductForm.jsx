
import { useEffect, useState } from "react";
import { ImagePlus, PackagePlus } from "lucide-react";

import {
    createProduct,
    getCategories
} from "../../services/api";

function AddProductForm({ onProductCreated }) {
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        brand: "",
        category_id: "",
        image: null
    });

    const [imagePreview, setImagePreview] = useState("");

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await getCategories();

                setCategories(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingCategories(false);
            }
        }

        loadCategories();
    }, []);


    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));
    }


    function handleImageChange(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            setError("Please select an image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Image size must be less than 5MB.");
            return;
        }

        setError("");

        setFormData((current) => ({
            ...current,
            image: file
        }));

        setImagePreview(
            URL.createObjectURL(file)
        );
    }


    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.name.trim() ||
            !formData.description.trim() ||
            !formData.price ||
            !formData.stock ||
            !formData.brand.trim() ||
            !formData.category_id
        ) {
            setError(
                "Please fill in all required fields."
            );

            return;
        }

        if (!formData.image) {
            setError(
                "Please select a product image."
            );

            return;
        }

        if (Number(formData.price) < 0) {
            setError(
                "Price cannot be negative."
            );

            return;
        }

        if (Number(formData.stock) < 0) {
            setError(
                "Stock cannot be negative."
            );

            return;
        }

        try {
            setLoading(true);

            const product = await createProduct({
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: Number(formData.price),
                stock: Number(formData.stock),
                brand: formData.brand.trim(),
                category_id: Number(
                    formData.category_id
                ),
                image: formData.image
            });

            setSuccess(
                "Product created successfully."
            );

            setFormData({
                name: "",
                description: "",
                price: "",
                stock: "",
                brand: "",
                category_id: "",
                image: null
            });

            setImagePreview("");

            if (onProductCreated) {
                onProductCreated(product);
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
                    <PackagePlus className="h-5 w-5 text-violet-600" />
                </div>

                <div>
                    <h2 className="text-2xl font-black text-slate-900">
                        Add Product
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Add a new product to your store.
                    </p>
                </div>
            </div>


            <form
                onSubmit={handleSubmit}
                className="mt-8 grid gap-6 md:grid-cols-2"
            >

                {/* Product Name */}
                <div>
                    <label
                        htmlFor="product-name"
                        className="text-sm font-bold text-slate-700"
                    >
                        Product Name
                    </label>

                    <input
                        id="product-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Gaming Laptop Pro"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    />
                </div>


                {/* Brand */}
                <div>
                    <label
                        htmlFor="product-brand"
                        className="text-sm font-bold text-slate-700"
                    >
                        Brand
                    </label>

                    <input
                        id="product-brand"
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Lenovo"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    />
                </div>


                {/* Price */}
                <div>
                    <label
                        htmlFor="product-price"
                        className="text-sm font-bold text-slate-700"
                    >
                        Price
                    </label>

                    <input
                        id="product-price"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        placeholder="850.00"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    />
                </div>


                {/* Stock */}
                <div>
                    <label
                        htmlFor="product-stock"
                        className="text-sm font-bold text-slate-700"
                    >
                        Stock
                    </label>

                    <input
                        id="product-stock"
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                        step="1"
                        placeholder="10"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    />
                </div>


                {/* Category */}
                <div>
                    <label
                        htmlFor="product-category"
                        className="text-sm font-bold text-slate-700"
                    >
                        Category
                    </label>

                    <select
                        id="product-category"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        disabled={loadingCategories}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    >
                        <option value="">
                            {loadingCategories
                                ? "Loading categories..."
                                : "Select a category"}
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>


                {/* Image Upload */}
                <div>
                    <label
                        htmlFor="product-image"
                        className="text-sm font-bold text-slate-700"
                    >
                        Product Image
                    </label>

                    <input
                        id="product-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-bold file:text-violet-600"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                        JPG, PNG, WEBP or other image formats. Max 5MB.
                    </p>
                </div>


                {/* Image Preview */}
                {imagePreview && (
                    <div className="md:col-span-2">
                        <p className="mb-3 text-sm font-bold text-slate-700">
                            Image Preview
                        </p>

                        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                            <img
                                src={imagePreview}
                                alt="Product preview"
                                className="h-64 w-full object-contain"
                            />
                        </div>
                    </div>
                )}


                {/* Description */}
                <div className="md:col-span-2">
                    <label
                        htmlFor="product-description"
                        className="text-sm font-bold text-slate-700"
                    >
                        Description
                    </label>

                    <textarea
                        id="product-description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Describe your product..."
                        className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    />
                </div>


                {/* Messages */}
                {(error || success) && (
                    <div className="md:col-span-2">
                        {error && (
                            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
                                {success}
                            </div>
                        )}
                    </div>
                )}


                {/* Submit */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={
                            loading ||
                            loadingCategories
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <PackagePlus className="h-4 w-4" />

                        {loading
                            ? "Creating..."
                            : "Create Product"}
                    </button>
                </div>

            </form>
        </div>
    );
}

export default AddProductForm;

