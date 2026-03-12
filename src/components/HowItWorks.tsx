export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Избери ръководство",
      description:
        "Разгледай нашите ръководства и избери това, което отговаря на твоя тип интервю.",
      icon: "📋",
    },
    {
      step: "2",
      title: "Плати сигурно",
      description:
        "Плащането става чрез Stripe — сигурна и бърза платформа. Не съхраняваме данни за карти.",
      icon: "💳",
    },
    {
      step: "3",
      title: "Изтегли веднага",
      description:
        "Веднага след плащане получаваш бутон за изтегляне + линк на email-а си.",
      icon: "📥",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Как работи?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Три лесни стъпки до твоето ръководство
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                {item.icon}
              </div>
              <div className="mt-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {item.step}
              </div>
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
