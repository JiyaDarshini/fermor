import { Layers, MessageSquareText, Target, Receipt, BellRing, Scale } from "lucide-react";

export const features = [
  {
    id: "one-view",
    icon: Layers,
    title: "Every account, one view",
    text: "Banks, mutual funds, deposits and loans sit side by side, updated daily. Nothing to type in by hand.",
    span: "md:col-span-4",
    tone: "light",
    visual: "accounts",
  },
  {
    id: "insights",
    icon: MessageSquareText,
    title: "Insights in one sentence",
    text: "Fees, idle cash and uneven allocation are explained simply, with the rupee impact.",
    span: "md:col-span-2",
    tone: "soft",
  },
  {
    id: "goals",
    icon: Target,
    title: "Goals with a date",
    text: "Pick a goal and a year. See if you are on track and what would close the gap.",
    span: "md:col-span-2",
    tone: "light",
  },
  {
    id: "fees",
    icon: Scale,
    title: "A clear look at what you pay",
    text: "Fund fees look small each year and large over twenty. Fermor shows both, and what a lower-cost option would change.",
    span: "md:col-span-4",
    tone: "dark",
    visual: "fees",
  },
  {
    id: "tax",
    icon: Receipt,
    title: "A tax summary, ready early",
    text: "Gains, interest and dividends in one tidy report you can hand to your accountant.",
    span: "md:col-span-3",
    tone: "light",
  },
  {
    id: "alerts",
    icon: BellRing,
    title: "Alerts only when it matters",
    text: "A missed SIP or a large unusual charge. No daily noise, no market panic.",
    span: "md:col-span-3",
    tone: "light",
  },
] as const;

export const accountRows = [
  { name: "Salary account", meta: "Updated today", amount: "₹1,24,300" },
  { name: "Index fund SIP", meta: "3 funds", amount: "₹8,47,600" },
  { name: "Fixed deposits", meta: "2 deposits", amount: "₹4,50,000" },
  { name: "Home loan", meta: "Owed", amount: "−₹21,80,000" },
];
