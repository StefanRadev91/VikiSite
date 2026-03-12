"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

interface PurchaseInfo {
  productId: string;
  productTitle: string;
  email: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [purchase, setPurchase] = useState<PurchaseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Невалиден линк.");
      setLoading(false);
      return;
    }

    // Verify session on the client by checking the download endpoint
    // We'll use a simple verify endpoint approach
    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setPurchase(data);
        }
      })
      .catch(() => setError("Възникна грешка при проверката."))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          <p className="mt-4 text-gray-600">Проверяваме плащането...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto max-w-md text-center">
          <div className="text-6xl">❌</div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">{error}</h1>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-500"
          >
            Обратно към началната страница
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="mx-auto max-w-lg text-center px-6">
        <div className="text-6xl">🎉</div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Благодарим за покупката!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Успешно закупи <strong>{purchase?.productTitle}</strong>.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Изпратихме линк за изтегляне и на <strong>{purchase?.email}</strong>
        </p>

        <div className="mt-8">
          <a
            href={`/api/download/${purchase?.productId}?session_id=${sessionId}`}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-green-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Изтегли файла
          </a>
        </div>

        <div className="mt-8 rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Съвет:</strong> Запази файла на сигурно място. Ако имаш
            нужда от повторно изтегляне, използвай{" "}
            <Link href="/redownload" className="underline">
              тази страница
            </Link>
            .
          </p>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block text-sm text-gray-500 transition hover:text-gray-900"
        >
          &larr; Обратно към началната страница
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
