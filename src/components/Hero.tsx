export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            10+ години опит в HR
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Подготви се за{" "}
            <span className="text-blue-600">интервюто</span> на мечтите си
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Практични ръководства, написани от HR професионалист с над 10 години
            опит. Научи какво наистина търсят работодателите и как да се
            представиш по най-добрия начин.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#products"
              className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Виж ръководствата
            </a>
            <a
              href="#about"
              className="text-base font-semibold leading-6 text-gray-900 transition hover:text-blue-600"
            >
              За мен <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-100 opacity-30 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-100 opacity-30 blur-3xl" />
    </section>
  );
}
