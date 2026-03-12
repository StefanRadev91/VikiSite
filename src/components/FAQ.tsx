"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Как получавам файла след покупка?",
    answer:
      "Веднага след успешно плащане ще видиш бутон за изтегляне на страницата. Освен това ще получиш линк за изтегляне на email-а, с който си платил/а.",
  },
  {
    question: "Мога ли да изтегля файла повторно?",
    answer:
      'Да! Отиди на секцията "Вече купих" и въведи email-а, с който си направил/а покупката. Ще получиш нов линк за изтегляне.',
  },
  {
    question: "Какъв формат са ръководствата?",
    answer:
      "Всички ръководства са в PDF формат и могат да бъдат отворени на всяко устройство — компютър, таблет или телефон.",
  },
  {
    question: "Безопасно ли е плащането?",
    answer:
      "Абсолютно. Използваме Stripe — една от най-сигурните платежни платформи в света. Ние нямаме достъп до данните на картата ви.",
  },
  {
    question: "Има ли гаранция за връщане на парите?",
    answer:
      "Да, ако не си доволен/а от ръководството, свържи се с нас до 14 дни след покупката и ще ти възстановим сумата.",
  },
  {
    question: "Нужна ли е регистрация?",
    answer:
      "Не! Не е нужна регистрация. Просто избери ръководство, плати и изтегли. Всичко е обвързано с email-а ти.",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base font-semibold text-gray-900">
          {question}
        </span>
        <span className="ml-4 flex-shrink-0 text-gray-400">
          {isOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <p className="pb-5 text-sm text-gray-600">{answer}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Често задавани въпроси
          </h2>
        </div>
        <div className="mt-12">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
