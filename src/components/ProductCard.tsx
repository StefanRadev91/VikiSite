"use client";

import { Product } from "@/data/products";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Възникна грешка. Моля, опитай отново.");
      }
    } catch {
      alert("Възникна грешка. Моля, опитай отново.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="text-4xl">{product.icon}</div>
      <h3 className="mt-4 text-xl font-bold text-gray-900">{product.title}</h3>
      <p className="mt-2 flex-1 text-sm text-gray-600">{product.description}</p>

      <ul className="mt-4 space-y-2">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-center text-sm text-gray-700">
            <svg
              className="mr-2 h-4 w-4 flex-shrink-0 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">
          {product.price.toFixed(2)} &euro;
        </span>
        <button
          onClick={handleBuy}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Зареждане..." : "Купи"}
        </button>
      </div>
    </div>
  );
}
