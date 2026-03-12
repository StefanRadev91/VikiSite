export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h3 className="text-lg font-bold text-white">
              HR Interview Guide
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Подготви се за интервюто на мечтите си
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="#products"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Ръководства
            </a>
            <a
              href="#about"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              За мен
            </a>
            <a
              href="#faq"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              FAQ
            </a>
            <a
              href="/redownload"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Вече купих
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} HR Interview Guide. Всички права
            запазени.
          </p>
        </div>
      </div>
    </footer>
  );
}
