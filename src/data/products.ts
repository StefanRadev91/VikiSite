export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  stripePriceId: string;
  pdfFile: string;
  icon: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: "technical-interview",
    title: "Техническо интервю",
    description:
      "Подготви се за техническо интервю с най-често задаваните въпроси, примерни отговори и стратегии за успех.",
    price: 19.99,
    currency: "EUR",
    stripePriceId: "price_technical", // Replace with real Stripe Price ID
    pdfFile: "technical-interview.pdf",
    icon: "💻",
    features: ["50+ въпроса с отговори", "Технически задачи", "Чеклист за подготовка"],
  },
  {
    id: "behavioral-interview",
    title: "Поведенческо интервю",
    description:
      "Научи STAR метода и как да отговаряш на въпроси за твоя опит, умения за работа в екип и лидерство.",
    price: 17.99,
    currency: "EUR",
    stripePriceId: "price_behavioral", // Replace with real Stripe Price ID
    pdfFile: "behavioral-interview.pdf",
    icon: "🤝",
    features: ["STAR метод", "30+ примерни ситуации", "Готови отговори"],
  },
  {
    id: "hr-screening",
    title: "HR скрийнинг",
    description:
      "Първото впечатление е ключово. Научи как да се представиш по телефона и да преминеш първия филтър.",
    price: 14.99,
    currency: "EUR",
    stripePriceId: "price_screening", // Replace with real Stripe Price ID
    pdfFile: "hr-screening.pdf",
    icon: "📞",
    features: ["Телефонен етикет", "Типични въпроси", "Как да говориш за заплата"],
  },
  {
    id: "case-interview",
    title: "Case интервю",
    description:
      "Подготви се за case study интервюта в консултантски и корпоративни компании с реални примери.",
    price: 22.99,
    currency: "EUR",
    stripePriceId: "price_case", // Replace with real Stripe Price ID
    pdfFile: "case-interview.pdf",
    icon: "📊",
    features: ["10 реални case studies", "Frameworks", "Стъпка по стъпка решения"],
  },
  {
    id: "cv-optimization",
    title: "Оптимизация на CV",
    description:
      "Създай CV, което преминава ATS системите и привлича вниманието на рекрутърите за секунди.",
    price: 15.99,
    currency: "EUR",
    stripePriceId: "price_cv", // Replace with real Stripe Price ID
    pdfFile: "cv-optimization.pdf",
    icon: "📄",
    features: ["ATS оптимизация", "Шаблони", "Примери за различни индустрии"],
  },
  {
    id: "salary-negotiation",
    title: "Преговори за заплата",
    description:
      "Научи как да преговаряш за по-висока заплата с конкретни тактики и фрази, които работят.",
    price: 18.99,
    currency: "EUR",
    stripePriceId: "price_salary", // Replace with real Stripe Price ID
    pdfFile: "salary-negotiation.pdf",
    icon: "💰",
    features: ["Тактики за преговори", "Примерни диалози", "Пазарни данни"],
  },
  {
    id: "management-interview",
    title: "Мениджърско интервю",
    description:
      "Специализирана подготовка за интервюта за ръководни позиции — лидерство, стратегия, управление на екипи.",
    price: 24.99,
    currency: "EUR",
    stripePriceId: "price_management", // Replace with real Stripe Price ID
    pdfFile: "management-interview.pdf",
    icon: "👔",
    features: ["Лидерски въпроси", "Стратегически сценарии", "360° оценка"],
  },
  {
    id: "remote-interview",
    title: "Онлайн интервю",
    description:
      "Всичко за успешно онлайн интервю — технически настройки, body language пред камера, виртуален етикет.",
    price: 12.99,
    currency: "EUR",
    stripePriceId: "price_remote", // Replace with real Stripe Price ID
    pdfFile: "remote-interview.pdf",
    icon: "🖥️",
    features: ["Настройка на средата", "Камера и микрофон", "Виртуален етикет"],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
