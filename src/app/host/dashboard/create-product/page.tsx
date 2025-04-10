'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function CreateProductPage() {
    const { data: session } = useSession();
    const [form, setForm] = useState({
        title: '',
        smallDesc: '',
        desc: '',
        price: '',
        salePrice: '',
        size: 'M',
        status: 'IN_STOCK',
        category: 'MAN',
    });
    const [images, setImages] = useState<FileList | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!images || images.length === 0) {
            alert("Please select at least one image");
            return;
        }

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });
        Array.from(images).forEach((file) => {
            formData.append("image", file);
        });

        try {
            setLoading(true);
            const res = await fetch("/api/product", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            if (res.ok) {
                alert("Product created successfully!");
                setForm({
                    title: '',
                    smallDesc: '',
                    desc: '',
                    price: '',
                    salePrice: '',
                    size: 'M',
                    status: 'IN_STOCK',
                    category: 'MAN',
                });
                setImages(null);
            } else {
                alert("Error: " + result.message);
            }
        } catch (err) {
            console.error("Failed to create product", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Product</h1>

            {!session ? (
                <p className="text-red-500">You must be signed in to create a product.</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />

                    <input
                        type="text"
                        name="smallDesc"
                        placeholder="Small Description"
                        value={form.smallDesc}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />

                    <textarea
                        name="desc"
                        placeholder="Full Description"
                        value={form.desc}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />

                    <input
                        type="number"
                        name="salePrice"
                        placeholder="Sale Price"
                        value={form.salePrice}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />

                    <select
                        name="size"
                        value={form.size}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="IN_STOCK">In Stock</option>
                        <option value="OUT_OF_STOCK">Out of Stock</option>
                    </select>

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="ALL">ALL</option>
                        <option value="MAN">MAN</option>
                        <option value="WOMEN">WOMEN</option>
                        {/* Add your categories */}
                    </select>

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="w-full"
                    />


                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        {loading ? "Submitting..." : "Create Product"}
                    </button>
                </form>
            )}
        </div>
    );
}
