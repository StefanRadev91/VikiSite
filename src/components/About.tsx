export default function About() {
  const highlights = [
    {
      icon: "🎯",
      title: "1000+ интервюта",
      description: "Провела съм над хиляда интервюта в различни индустрии",
    },
    {
      icon: "🏢",
      title: "Корпоративен опит",
      description:
        "Работила съм с водещи български и международни компании",
    },
    {
      icon: "📈",
      title: "95% успеваемост",
      description:
        "Хората, следвали моите съвети, преминават успешно интервютата си",
    },
    {
      icon: "💡",
      title: "Практични съвети",
      description:
        "Реални примери и стратегии, а не обща теория",
    },
  ];

  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            За мен
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Аз съм HR професионалист с над 10 години опит в подбора на
            персонал. Преминала съм през хиляди интервюта от двете страни на
            масата и знам точно какво прави разликата между добър и отличен
            кандидат. Сега споделям тези знания с теб.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center transition hover:shadow-md"
            >
              <div className="text-4xl">{item.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
