import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  Package,
  ClipboardList,
  CalendarClock,
  Factory,
  HardHat,
  Truck,
  Building2,
  ArrowRight,
  Mail,
  Phone,
  Send,
  Globe,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";

const BRAND = {
  name: "BioClean Workwear",
  tagline: "Учет спецодежды и СИЗ без Excel",
  domainHint: "bioclean.ru / bioclean.app",
  email: "market@bioclean.ru",
  logo: "/bioclean-logo.png",
  telegramUrl: "https://t.me/BiocleanWorkWear_bot?start=landing",
};

function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <div className="mb-3 flex items-center justify-center">
          <Badge variant="gray">{eyebrow}</Badge>
        </div>
      ) : null}
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base sm:text-lg text-slate-600">{subtitle}</p>
      ) : null}
    </div>
  );
}

function SmoothLink({ href, children, className }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        const id = href?.startsWith("#") ? href.slice(1) : null;
        const el = id ? document.getElementById(id) : null;
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
    >
      {children}
    </a>
  );
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative w-full max-w-lg rounded-3xl bg-white shadow-soft border border-slate-100"
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-lg font-semibold">{title}</div>
              <div className="mt-1 text-sm text-slate-600">
                Оставьте контакты — проведем демонстрацию возможностей, ответим
                на вопросы и обсудим пилотный запуск за 50% стоимости первого
                месяца.
              </div>
            </div>
            <button
              className="rounded-xl px-3 py-2 text-slate-600 hover:bg-slate-100"
              onClick={onClose}
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>

          <div className="mt-5">{children}</div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Закрыть
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white shadow-soft p-5">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-50 p-3 text-blue-700 border border-blue-100">
            <Icon size={18} />
          </div>
          <div className="font-semibold">{title}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
      </CardContent>
    </Card>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="overflow-hidden">
      <button
        className="w-full text-left p-6 hover:bg-slate-50 transition flex items-start justify-between gap-4"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="font-semibold">{q}</div>
        <div className="text-slate-500">{open ? "–" : "+"}</div>
      </button>
      {open ? (
        <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed">
          {a}
        </div>
      ) : null}
    </Card>
  );
}

export function Home() {
  const [leadForm, setLeadForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  const [leadLoading, setLeadLoading] = useState(false);
  const [leadMessage, setLeadMessage] = useState("");

  async function handleLeadSubmit(e) {
    e.preventDefault();

    setLeadLoading(true);
    setLeadMessage("");

    try {
      const res = await fetch("/api/leads/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadForm),
      });

      if (!res.ok) {
        throw new Error("Ошибка отправки формы");
      }

      setLeadMessage("Спасибо! Заявка отправлена.");

      setLeadForm({
        name: "",
        company: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      setLeadMessage("Ошибка отправки. Попробуйте позже.");
    } finally {
      setLeadLoading(false);
    }
  }

  const [demoOpen, setDemoOpen] = useState(false);

  const nav = useMemo(
    () => [
      { label: "Кому подходит", href: "#audience" },
      { label: "Возможности", href: "#features" },
      { label: "Интерфейсы", href: "#screens" },
      { label: "Эффект", href: "#roi" },
      { label: "Закупки", href: "#procurement" },
      { label: "Внедрение", href: "#demo" },
      { label: "Тарифы", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    [],
  );

  const features = useMemo(
    () => [
      {
        icon: ClipboardList,
        title: "Выдача и история",
        text: "Оформляйте выдачу сотруднику, фиксируйте размеры/рост, количество и срок эксплуатации. История всегда под рукой.",
      },
      {
        icon: CalendarClock,
        title: "Контроль сроков",
        text: "Система отслеживает срок эксплуатации и помогает не пропустить замену: меньше рисков и меньше авралов.",
      },
      {
        icon: Package,
        title: "Склад и остатки",
        text: "Актуальные остатки на складе, прозрачное движение и быстрый ответ на вопрос «что и сколько осталось».",
      },
      {
        icon: Factory,
        title: "Планирование закупок",
        text: "Формируйте план заказа по данным выдачи и срокам. Закупки становятся прогнозируемыми, без лишних запасов.",
      },
      {
        icon: HardHat,
        title: "Нормы выдачи",
        text: "Настраивайте нормы по должностям и службам, проверяйте обеспеченность сотрудников и быстро видьте, чего не хватает.",
      },
      {
        icon: ShieldCheck,
        title: "Резервные копии",
        text: "Ежедневное резервное копирование снижает риск потери данных и помогает спокойнее вести учет в рабочем режиме.",
      },
      {
        icon: ShieldCheck,
        title: "Учет СИЗ",
        text: "Ведите учет СИЗ вместе со спецодеждой: единая логика, единые отчеты, меньше ручной работы.",
      },
    ],
    [],
  );

  const industries = useMemo(
    () => [
      { icon: Building2, label: "Строительство" },
      { icon: Factory, label: "Производство" },
      { icon: Truck, label: "Логистика" },
      { icon: HardHat, label: "Подрядчики" },
    ],
    [],
  );

  const interfaceScreens = useMemo(
    () => [
      {
        title: "Каталог одежды",
        text: "Справочник позиций с типами, размерами и быстрым доступом к редактированию.",
        image: "/screenshots/clothes-catalog.png",
      },
      {
        title: "Нормы выдачи",
        text: "Нормы по должностям и службам: состав комплекта, количество и срок эксплуатации.",
        image: "/screenshots/issue-norms.png",
      },
      {
        title: "Должности",
        text: "Справочник должностей помогает связать нормы выдачи с рабочими ролями.",
        image: "/screenshots/positions.png",
      },
      {
        title: "Остатки на складе",
        text: "Контроль размеров, ростов, количества и движения позиций по складу.",
        image: "/screenshots/stock-balance.png",
      },
      {
        title: "Планирование заказа",
        text: "Отчет показывает потребность по размерам и ростам без раскрытия данных сотрудников.",
        image: "/screenshots/order-report.png",
      },
    ],
    [],
  );

  const pricing = useMemo(
    () => [
      {
        name: "Start",
        price: "1700 ₽ / месяц",
        desc: "До 50 сотрудников",
        bullets: [
          "учет выдачи",
          "контроль сроков эксплуатации",
          "нормы выдачи",
          "складские остатки",
          "отчеты",
        ],
        cta: "Запустить Start",
      },
      {
        name: "Standard",
        price: "4500 ₽ / месяц",
        desc: "До 300 сотрудников",
        bullets: [
          "все функции Start",
          "планирование закупок",
          "импорт Excel",
          "ежедневные резервные копии",
          "поддержка",
        ],
        featured: true,
        cta: "Выбрать Standard",
      },
      {
        name: "Pro",
        price: "9900 ₽ / месяц",
        desc: "До 1000 сотрудников",
        bullets: [
          "все функции Standard",
          "расширенные отчеты",
          "отчеты по обеспеченности",
          "приоритетная поддержка",
        ],
        cta: "Выбрать Pro",
      },
      {
        name: "Enterprise",
        price: "по запросу",
        desc: "1000+ сотрудников",
        bullets: [
          "индивидуальная настройка",
          "локальная установка",
          "расширенные права доступа",
          "SLA",
        ],
        cta: "Обсудить Enterprise",
      },
    ],
    [],
  );

  const faqs = useMemo(
    () => [
      {
        q: "Это облачный сервис или можно локально?",
        a: "Основной формат — SaaS. По запросу возможна версия для работы в локальной сети/внутреннем контуре (Enterprise).",
      },
      {
        q: "Как лучше начать знакомство с системой?",
        a: "Начните с демо: покажем интерфейс, нормы выдачи, отчеты и сценарии по вашим данным. Если нужен пилот, согласуем формат отдельно.",
      },
      {
        q: "Можно ли загрузить сотрудников и позиции из Excel?",
        a: "Да. Поддерживается импорт/экспорт Excel. При необходимости добавим импорт из ваших шаблонов.",
      },
      {
        q: "Нормы выдачи у нас сложные — это поддерживается?",
        a: "Да. Нормы выдачи уже реализованы: можно вести нормы по должностям и службам, контролировать обеспеченность и формировать потребность.",
      },
      {
        q: "Какие отчеты есть?",
        a: "Есть отчеты по выдаче, обеспеченности СИЗ и заказу спецодежды на основании норм, остатков и сроков эксплуатации.",
      },
      {
        q: "Что с сохранностью данных?",
        a: "В системе предусмотрено ежедневное резервное копирование. Это помогает снизить риск потери данных и спокойнее вести регулярный учет.",
      },
    ],
    [],
  );

  return (
  <>
    <Helmet>
      <title>
        Программа учета спецодежды и СИЗ для предприятий — BioClean
      </title>
      <meta
        name="description"
        content="Программа учета спецодежды и СИЗ для предприятий. Учет выдачи сотрудникам, контроль сроков эксплуатации, складской учет и планирование закупок."
      />
      <link rel="canonical" href="https://bioclean.ru/" />
    </Helmet>

    <div className="min-h-screen">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
        <Container>
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-col items-center leading-tight shrink-0">
              <img
                src={BRAND.logo}
                alt="BioClean Workwear"
                className="h-14 md:h-12 w-auto object-contain"
              />

              <div className="text-xs text-slate-500 text-center ml-1">
                {BRAND.tagline}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm text-slate-700">
              {nav.map((n) => (
                <SmoothLink
                  key={n.href}
                  href={n.href}
                  className="hover:text-slate-900"
                >
                  {n.label}
                </SmoothLink>
              ))}
            </div>

            <div className="flex items-center">
              <Button
                size="md"
                className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
                onClick={() => setDemoOpen(true)}
              >
                Запросить демо <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Container>
        <div className="h-[1px] w-full bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600"></div>
      </div>

      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(21,101,192,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(76,175,80,0.12),transparent_30%)]" />

        <Container className="relative py-12 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
                SaaS для охраны труда, склада и закупок
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-5 text-3xl sm:text-5xl font-semibold tracking-tight"
              >
                Учет спецодежды и СИЗ на предприятии
                <span className="bg-gradient-to-r from-blue-700 to-emerald-600 bg-clip-text text-transparent">
                  {" "}
                  без Excel и пропущенных сроков
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl"
              >
                BioClean Workwear — программа учета спецодежды и СИЗ для
                предприятий. Контролируйте выдачу сотрудникам, сроки
                эксплуатации, нормы выдачи, складские остатки и планирование
                закупок в одной системе.
              </motion.p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Выдача спецодежды сотрудникам и история по каждому работнику
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Контроль сроков эксплуатации и замены
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Учет СИЗ и складских остатков
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Нормы выдачи, отчеты и планирование закупок
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
                  onClick={() => setDemoOpen(true)}
                >
                  Запросить демо
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    const el = document.getElementById("features");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Смотреть возможности
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                <span>Демо по вашим сценариям</span>
                <span>Нормы выдачи уже в системе</span>
                <span>Ежедневные резервные копии</span>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Stat label="Быстрый старт" value="5 минут" />
                <Stat label="Подходит для" value="до 1000+" />
                <Stat label="Backup данных" value="каждый день" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="relative"
            >
              <div className="rounded-3xl border border-slate-100 bg-white shadow-soft overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <div className="ml-2 text-xs text-slate-600">
                    Интерфейс системы
                  </div>
                </div>

                <img
                  src="/screenshots/order-report.png"
                  alt="Отчет для заказа спецодежды"
                  className="w-full h-auto block"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Card>
                  <CardHeader className="pb-0">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <CalendarClock size={16} className="text-emerald-600" />
                      Контроль сроков
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <div className="text-sm text-slate-600">
                      Система заранее показывает, кому требуется замена.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-0">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Package size={16} className="text-emerald-600" />
                      Нормы выдачи
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <div className="text-sm text-slate-600">
                      Проверяйте комплекты по должности и службе.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Кому подходит */}
      <div id="audience" className="py-14">
        <Container>
          <SectionTitle
            eyebrow="Кому подходит"
            title="Кому подходит система учета спецодежды и СИЗ"
            subtitle="Решение для предприятий, где важно контролировать выдачу, сроки эксплуатации, остатки и закупки."
          />

          <div className="mt-10 grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <div className="font-semibold">
                  Специалистам по охране труда
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>✔ контроль сроков эксплуатации</li>
                  <li>✔ учет СИЗ</li>
                  <li>✔ отчеты для проверок</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="font-semibold">Кладовщикам</div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>✔ складские остатки</li>
                  <li>✔ выдача сотрудникам</li>
                  <li>✔ история движения</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="font-semibold">Руководителям</div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>✔ контроль расходов</li>
                  <li>✔ план закупки спецодежды</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>

      {/* Проблемы Excel */}
      <div className="py-14">
        <Container>
          <SectionTitle
            eyebrow="Почему это важно"
            title="Проблемы учета спецодежды в Excel и вручную"
            subtitle="Когда учет ведется в таблицах и бумажных журналах, растут ошибки, перерасход и риск пропустить сроки эксплуатации."
          />

          <div className="mt-10 grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <div className="font-semibold">Потери и перерасход</div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-slate-600">
                  Сложно понять реальные остатки и что нужно заказывать —
                  закупки идут «на глаз».
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="font-semibold">Риски по срокам</div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-slate-600">
                  Без системного контроля легко пропустить замену по сроку
                  эксплуатации.
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="font-semibold">Отчеты и проверки</div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-slate-600">
                  Сводить данные из разных источников долго и неудобно —
                  особенно когда отчет нужен срочно.
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>

      {/* Возможности */}
      <div
        id="features"
        className="py-14 bg-[linear-gradient(to_bottom,#f8fbff,#f6fcf7)] border-y border-slate-100"
      >
        <Container>
          <SectionTitle
            eyebrow="Возможности"
            title="Возможности программы учета спецодежды и СИЗ"
            subtitle="Все ключевые процессы в одной системе: выдача, учет СИЗ, склад, сроки эксплуатации и планирование закупок."
          />

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <Feature
                key={f.title}
                icon={f.icon}
                title={f.title}
                text={f.text}
              />
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="text-lg font-semibold">
                  Нормы выдачи, Excel и ежедневный backup уже есть
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Переносите данные из текущих таблиц, ведите нормы выдачи,
                  выгружайте отчеты и сохраняйте данные через регулярное
                  резервное копирование.
                </div>
              </div>
              <Button
                className="whitespace-nowrap bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
                onClick={() => setDemoOpen(true)}
              >
                Запросить демо <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Интерфейсы */}
      <div id="screens" className="py-14">
        <Container>
          <SectionTitle
            eyebrow="Интерфейсы"
            title="Больше реальных экранов системы"
            subtitle="Показываем не абстрактные карточки, а рабочие разделы: каталог, нормы выдачи, должности, склад и отчет для заказа."
          />

          <div className="mt-10 grid lg:grid-cols-3 gap-5">
            {interfaceScreens.map((screen, index) => (
              <Card
                key={screen.title}
                className={
                  index === 0 || index === 2
                    ? "overflow-hidden lg:col-span-2"
                    : "overflow-hidden"
                }
              >
                <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="text-sm font-semibold text-slate-900">
                    {screen.title}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {screen.text}
                  </div>
                </div>
                <div className="bg-white p-2">
                  <img
                    src={screen.image}
                    alt={screen.title}
                    className="block w-full rounded-xl border border-slate-100"
                    loading="lazy"
                  />
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </div>

      {/* Как работает */}
      <div id="how" className="py-14">
        <Container>
          <SectionTitle
            eyebrow="Как это работает"
            title="Как работает система учета спецодежды"
            subtitle="Понятный запуск: загрузили данные, начали выдачу, получили контроль сроков эксплуатации и планирование закупок."
          />

          <div className="mt-10 grid lg:grid-cols-3 gap-4">
            <Card className="h-full">
              <CardHeader>
                <Badge variant="gray">Шаг 1</Badge>
                <div className="mt-3 text-lg font-semibold">
                  Добавьте сотрудников и структуру
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <Check size={16} className="text-blue-700 mt-0.5" />
                    Подразделения и должности
                  </li>
                  <li className="flex gap-2">
                    <Check size={16} className="text-blue-700 mt-0.5" />
                    Импорт из Excel
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <Badge variant="gray">Шаг 2</Badge>
                <div className="mt-3 text-lg font-semibold">
                  Заполните каталог спецодежды и СИЗ
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <Check size={16} className="text-blue-700 mt-0.5" />
                    Размеры, рост, характеристики
                  </li>
                  <li className="flex gap-2">
                    <Check size={16} className="text-blue-700 mt-0.5" />
                    Сроки эксплуатации по позициям
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <Badge variant="gray">Шаг 3</Badge>
                <div className="mt-3 text-lg font-semibold">
                  Оформляйте выдачу и планируйте закупки
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <Check size={16} className="text-blue-700 mt-0.5" />
                    История выдачи и остатки
                  </li>
                  <li className="flex gap-2">
                    <Check size={16} className="text-blue-700 mt-0.5" />
                    План заказа и закупки по данным
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 grid md:grid-cols-4 gap-3">
            {industries.map((it) => (
              <div
                key={it.label}
                className="rounded-3xl border border-slate-100 bg-white shadow-soft p-5 flex items-center gap-3"
              >
                <div className="rounded-2xl bg-slate-50 p-3 border border-slate-200">
                  <it.icon size={18} className="text-slate-800" />
                </div>
                <div className="text-sm font-medium">{it.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Экономический эффект */}
      <div
        id="roi"
        className="py-14 bg-[linear-gradient(to_bottom,#f7fbff,#f7fcf8)]"
      >
        <Container>
          <SectionTitle
            eyebrow="Экономический эффект"
            title="Экономический эффект от внедрения системы учета спецодежды"
            subtitle="Снижение перерасхода, экономия времени и полный контроль сроков эксплуатации."
          />

          <div className="mt-10 grid md:grid-cols-4 gap-4 text-center">
            <Stat value="–30%" label="перерасход спецодежды" />
            <Stat value="–50%" label="время на учет" />
            <Stat value="100%" label="контроль сроков" />
            <Stat value="0 Excel" label="в ежедневной работе" />
          </div>
        </Container>
      </div>

      {/* Закупки */}
      <div id="procurement" className="py-14">
        <Container>
          <SectionTitle
            eyebrow="Планирование закупок"
            title="Планирование закупок спецодежды и СИЗ"
            subtitle="Формируйте потребность на основе сроков эксплуатации, истории выдачи и складских остатков."
          />

          <div className="mt-10 grid md:grid-cols-3 gap-4">
            <Feature
              icon={Package}
              title="Анализ остатков"
              text="Система показывает реальные складские остатки и будущие потребности."
            />

            <Feature
              icon={CalendarClock}
              title="Сроки эксплуатации"
              text="Контроль сроков помогает заранее планировать замену спецодежды."
            />

            <Feature
              icon={ClipboardList}
              title="План заказа"
              text="Формируйте план закупки на основе реальных данных."
            />
          </div>
        </Container>
      </div>

      {/* Безопасность */}
      <div className="py-14 bg-slate-50 border-y border-slate-100">
        <Container>
          <SectionTitle
            eyebrow="Доверие"
            title="Безопасность, доступы и резервное копирование"
            subtitle="Роли, прозрачные данные, ежедневные backup-копии и удобная работа для разных сотрудников."
          />

          <div className="mt-10 grid lg:grid-cols-3 gap-4">
            <Feature
              icon={ShieldCheck}
              title="Роли и права"
              text="Разделяйте доступ: склад, охрана труда, руководители. В Enterprise можно расширить модель прав."
            />
            <Feature
              icon={Package}
              title="Ежедневные резервные копии"
              text="Данные сохраняются регулярно, чтобы снизить риск потерь и спокойно вести учет в ежедневной работе."
            />
            <Feature
              icon={Globe}
              title="SaaS или локальная сеть"
              text="Работайте в облаке или обсудите развертывание внутри контура (Enterprise)."
            />
          </div>

        </Container>
      </div>

      {/* Внедрение */}
      <div
        id="demo"
        className="py-14 bg-[linear-gradient(to_right,#eff6ff,#ecfdf3)]"
      >
        <Container>
          <SectionTitle
            title="Посмотрите программу на ваших сценариях"
            subtitle="Покажем нормы выдачи, оформление выдачи, складские остатки, отчеты и резервное копирование. После демо можно начать с пилотного месяца за 50% стоимости выбранного тарифа."
          />

          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
              onClick={() => setDemoOpen(true)}
            >
              Запросить демо
            </Button>
          </div>
        </Container>
      </div>

      {/* Тарифы */}
      <div id="pricing" className="py-14">
        <Container>
          <SectionTitle
            eyebrow="Тарифы"
            title="Тарифы на систему учета спецодежды"
            subtitle="Тарифы можно адаптировать под масштаб предприятия, количество сотрудников и формат внедрения."
          />

          <div className="mt-10 grid lg:grid-cols-2 gap-4">
            {pricing.map((p) => (
              <Card
                key={p.name}
                className={
                  p.featured ? "border-blue-200 ring-2 ring-blue-100" : ""
                }
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">{p.name}</div>
                    {p.featured ? <Badge>Рекомендуем</Badge> : null}
                  </div>
                  <div className="mt-2 text-2xl font-semibold">{p.price}</div>
                  <div className="mt-1 text-sm text-slate-600">{p.desc}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <Check size={16} className="text-blue-700 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button
                      className="w-full"
                      variant={p.featured ? "cta" : "outline"}
                      onClick={() => setDemoOpen(true)}
                    >
                      {p.cta} <ArrowRight size={16} />
                    </Button>
                  </div>
                  <div className="mt-3 text-xs text-slate-500">
                    * Можно настроить под вашу политику и процессы.
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </div>

      {/* FAQ */}
      <div id="faq" className="py-14 bg-slate-50 border-y border-slate-100">
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title="Часто задаваемые вопросы по учету спецодежды"
          />
          <div className="mt-10 grid gap-3 max-w-3xl mx-auto">
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </Container>
      </div>

      {/* FINAL CTA */}
      <div className="py-14">
        <Container>
          <div className="rounded-3xl bg-[linear-gradient(135deg,#0f172a,#164e63,#166534)] text-white p-8 sm:p-10 shadow-soft">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-2xl sm:text-3xl font-semibold">
                  Запустите учет спецодежды за один день
                </div>
                <div className="mt-3 text-white/80 leading-relaxed">
                  Покажем демо, разберем ваши нормы выдачи и поможем перенести
                  данные из Excel. Вы получите контроль сроков эксплуатации,
                  обеспеченности и план закупок без ручной рутины.
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button size="lg" onClick={() => setDemoOpen(true)}>
                    Запросить демо <ArrowRight size={16} />
                  </Button>
                </div>
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                <div className="text-sm font-semibold">Контакты</div>
                <div className="mt-4 space-y-3 text-sm text-white/85">
                  <div className="flex items-center gap-2">
                    <Mail size={16} /> {BRAND.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} /> +7 (916) 313-32-57
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div id="seo" className="py-16">
            <Container>
              <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold mb-6">
                  Как вести учет спецодежды и СИЗ на предприятии
                </h2>

                <p className="mb-4 text-lg leading-8 text-gray-700">
                  BioClean Workwear — это программа для учета спецодежды и
                  средств индивидуальной защиты на предприятии. Система помогает
                  вести учет выдачи, контролировать сроки эксплуатации,
                  учитывать остатки на складе и планировать закупки.
                </p>

                <p className="mb-4 text-lg leading-8 text-gray-700">
                  Учет спецодежды особенно важен для строительных компаний,
                  производственных предприятий, логистики и подрядных
                  организаций. Ведение учета в Excel часто приводит к ошибкам,
                  потере данных и отсутствию контроля сроков.
                </p>

                <p className="mb-4 text-lg leading-8 text-gray-700">
                  Система учета спецодежды BioClean Workwear позволяет:
                </p>

                <ul className="list-disc pl-6 space-y-2 text-lg leading-8 text-gray-700">
                  <li>вести учет выдачи спецодежды сотрудникам</li>
                  <li>контролировать сроки носки и списания</li>
                  <li>учитывать СИЗ по нормам</li>
                  <li>контролировать складские остатки</li>
                  <li>планировать закупки спецодежды</li>
                </ul>
              </section>

              <section className="py-14 bg-slate-50">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                  <div className="mx-auto max-w-2xl text-center">
                    <div className="mb-3 flex items-center justify-center">
                      <span className="inline-flex rounded-full bg-white px-3 py-1 text-sm border border-slate-200 text-slate-700">
                        Полезные материалы
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                      Статьи по учету спецодежды и СИЗ
                    </h2>

                    <p className="mt-3 text-base sm:text-lg text-slate-600">
                      Практические материалы для специалистов по охране труда,
                      склада и закупок.
                    </p>
                  </div>

                  <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <a
                      href="/articles/programma-ucheta-specodezhdy.html"
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition block"
                    >
                      <div className="font-semibold text-slate-900">
                        Программа учета спецодежды
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        Автоматизация выдачи, сроков эксплуатации и складского
                        учета.
                      </div>
                    </a>

                    <a
                      href="/articles/uchet-specodezhdy.html"
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition block"
                    >
                      <div className="font-semibold text-slate-900">
                        Учет спецодежды на предприятии
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        Как организовать учет, отчеты и контроль остатков.
                      </div>
                    </a>

                    <a
                      href="/articles/programma-ucheta-siz.html"
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition block"
                    >
                      <div className="font-semibold text-slate-900">
                        Программа учета СИЗ
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        Выдача, контроль сроков эксплуатации и учет средств
                        защиты.
                      </div>
                    </a>

                    <a
                      href="/articles/uchet-siz.html"
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition block"
                    >
                      <div className="font-semibold text-slate-900">
                        Учет СИЗ на предприятии
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        Какие данные фиксировать и как снизить ошибки учета.
                      </div>
                    </a>

                    <a
                      href="/articles/zhurnal-vydachi-specodezhdy.html"
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition block"
                    >
                      <div className="font-semibold text-slate-900">
                        Журнал выдачи спецодежды
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        Что должно быть в журнале и как вести его правильно.
                      </div>
                    </a>

                    <a
                      href="/articles/zhurnal-ucheta-siz.html"
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition block"
                    >
                      <div className="font-semibold text-slate-900">
                        Журнал учета СИЗ
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        Базовая структура и назначение журнала учета средств
                        защиты.
                      </div>
                    </a>

                    <a
                      href="/articles/normy-vydachi-specodezhdy.html"
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition block"
                    >
                      <div className="font-semibold text-slate-900">
                        Нормы выдачи спецодежды
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        Какие позиции выдаются и как учитывать сроки
                        эксплуатации.
                      </div>
                    </a>

                    <a
                      href="/articles/sroki-ekspluatacii-specodezhdy.html"
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition block"
                    >
                      <div className="font-semibold text-slate-900">
                        Сроки эксплуатации спецодежды
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        Контроль замены и планирование закупок по реальным
                        срокам.
                      </div>
                    </a>

                    <a
                      href="/articles/uchet-specodezhdy-na-predpriyatii.html"
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition block"
                    >
                      <div className="font-semibold text-slate-900">
                        Как вести учет спецодежды на предприятии
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        Пошаговый подход к учету сотрудников, выдачи и склада.
                      </div>
                    </a>

                    <a
                      href="/articles/uchet-siz-excel.html"
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition block"
                    >
                      <div className="font-semibold text-slate-900">
                        Учет СИЗ в Excel
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        Когда Excel подходит и когда лучше перейти на систему.
                      </div>
                    </a>

                    <a
                      href="/articles/excel-dlya-ucheta-specodezhdy-skachat.html"
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition block"
                    >
                      <div className="font-semibold text-slate-900">
                        Excel для учета спецодежды — шаблон скачать
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        Бесплатный шаблон и объяснение, когда Excel уже не
                        хватает.
                      </div>
                    </a>
                  </div>
                </div>
              </section>
            </Container>
          </div>

          <div className="border-t border-slate-200 mt-2 pt-10"></div>

          <div className="mt-2 flex flex-col items-center text-center gap-6 text-sm text-slate-600">
            <div className="flex flex-col items-center">
              <img
                src={BRAND.logo}
                alt="BioClean Workwear"
                className="h-14 w-auto object-contain"
              />
              <div className="text-xs text-slate-500 mt-2">
                {BRAND.tagline}
              </div>
            </div>

            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} {BRAND.name}. Все права защищены.
            </div>
          </div>
        </Container>
      </div>

      {/* DEMO MODAL */}
      <Modal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        title="Демо и пилотный запуск"
      >
        <form className="space-y-3" onSubmit={handleLeadSubmit}>
          <Input
            placeholder="Имя"
            required
            value={leadForm.name}
            onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
          />

          <Input
            placeholder="Компания"
            required
            value={leadForm.company}
            onChange={(e) =>
              setLeadForm({ ...leadForm, company: e.target.value })
            }
          />

          <Input
            placeholder="Email"
            type="email"
            required
            value={leadForm.email}
            onChange={(e) =>
              setLeadForm({ ...leadForm, email: e.target.value })
            }
          />

          <Input
            placeholder="Телефон"
            value={leadForm.phone}
            onChange={(e) =>
              setLeadForm({ ...leadForm, phone: e.target.value })
            }
          />

          <div className="pt-2">
            <Button className="w-full" type="submit" disabled={leadLoading}>
              {leadLoading ? "Отправка..." : "Отправить заявку"}
              {!leadLoading && <ArrowRight size={16} />}
            </Button>
          </div>

          <div className="border-t border-slate-200 mt-4 pt-4"></div>

          <div className="text-center text-sm text-slate-600 mt-4">
            <div className="mb-2">или свяжитесь с нами:</div>

            <div className="space-y-1">
              <div>
                📞{" "}
                <a
                  href="tel:+79163133257"
                  className="text-blue-600 hover:underline"
                >
                  +7 (916) 313-32-57
                </a>
              </div>
            </div>
          </div>

          {leadMessage && (
            <div className="text-sm text-slate-600">{leadMessage}</div>
          )}
        </form>
      </Modal>
    </div>
  </>
);




   }





export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
