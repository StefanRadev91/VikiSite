"use client";

import { useState } from "react";
import Link from "next/link";

export default function RedownloadPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: `Изпратихме ${data.count} линк(а) за изтегляне на ${email}. Провери пощата си!`,
        });
      } else if (response.status === 404) {
        setMessage({
          type: "error",
          text: "Не намерихме покупки с този email. Увери се, че използваш email-а, с който си платил/а.",
        });
      } else {
        setMessage({
          type: "error",
          text: "Възникна грешка. Моля, опитай отново по-късно.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Възникна грешка. Моля, опитай отново по-късно.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="mx-auto w-full max-w-md px-6">
        <div className="text-center">
          <div className="text-5xl">📧</div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Вече купих
          </h1>
          <p className="mt-4 text-gray-600">
            Въведи email-а, с който си направил/а покупката, и ще ти изпратим
            нов линк за изтегляне.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email адрес
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@email.com"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Изпращане..." : "Изпрати линк за изтегляне"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 rounded-lg p-4 ${
              message.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-gray-900"
          >
            &larr; Обратно към началната страница
          </Link>
        </div>
      </div>
    </div>
  );
}
