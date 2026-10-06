export const journeySteps = [
  {
    id: "understand",
    number: "01",
    title: "Understand",
    summary: "See everything you own and owe in one place, with no spreadsheet.",
    detail:
      "Link your bank, mutual funds and loans once. Fermor sorts them, spots duplicates and shows where your money goes each month.",
  },
  {
    id: "act",
    number: "02",
    title: "Act",
    summary: "Get a short list of next steps, ranked by what matters most.",
    detail:
      "Idle cash, high fees, a missed SIP. Each suggestion comes with the reason and the rupee impact, so you can decide in a minute.",
  },
  {
    id: "grow",
    number: "03",
    title: "Grow",
    summary: "Set goals and watch steady habits add up over the years.",
    detail:
      "Put a number and a date on what you want. Fermor shows whether you're on track and what small change gets you there.",
  },
] as const;

export type JourneyId = (typeof journeySteps)[number]["id"];

export const spending = [
  { name: "Rent & bills", amount: 24500, share: 42 },
  { name: "Food & groceries", amount: 11200, share: 19 },
  { name: "Travel", amount: 7800, share: 13 },
  { name: "Subscriptions", amount: 3240, share: 6 },
  { name: "Everything else", amount: 11600, share: 20 },
];

export const actions = [
  { title: "Move idle cash to a liquid fund", impact: "About ₹3,100 a year", tag: "High impact" },
  { title: "Switch 2 regular plans to direct", impact: "About ₹2,800 a year", tag: "Fees" },
  { title: "Restart your paused SIP", impact: "₹5,000 a month", tag: "Habit" },
];

export const goal = {
  name: "Home down payment",
  target: 1200000,
  saved: 456000,
  date: "Dec 2029",
  series: [40000, 82000, 118000, 171000, 214000, 259000, 306000, 352000, 401000, 456000],
};
