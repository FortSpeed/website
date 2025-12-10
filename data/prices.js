export const plans = [
  {
    id: "starter",
    number: "01",
    name: "Essential",
    tagline: "Perfect for personal brands & small businesses",
    price: "starting from $499",
    basePrice: 499, // Extracted numeric price for calculations
    features: [
      "1–3 page responsive website",
      "Basic SEO setup",
      "Fast performance optimization",
      "1 week delivery",
    ],
    color: "from-red-500 to-pink-500",
    dotColor: "bg-red-500 ",
  },
  {
    id: "pro",
    number: "02",
    name: "Professional",
    tagline: "Ideal for startups & agencies",
    price: "starting from $1199",
    basePrice: 1199, // Extracted numeric price for calculations
    features: [
      "5–10 page website or web app",
      "Custom design system",
      "SEO + analytics integration",
      "2–3 week delivery",
    ],
    color: "from-purple-500 to-blue-500",
    dotColor: "bg-purple-500 ",
  },
  {
    id: "enterprise",
    number: "03",
    name: "Enterprise",
    tagline: "Custom solutions for serious scale",
    price: "get a custom quote",
    basePrice: 0, // Custom pricing
    features: [
      "Complex web apps or portals",
      "AI & automation integrations",
      "Dedicated project manager",
      "Long-term maintenance support",
    ],
    color: "from-cyan-500 to-green-500",
    dotColor: "bg-cyan-500 ",
  },
];

export const title = "Flexible Plans for Every Vision";

// Helper function to calculate 30% deposit
export const calculateDeposit = (price) => {
  return Math.round(price * 0.3);
};

// Helper function to format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const planQuestions = {
  starter: [
    {
      type: "select",
      label: "What type of website do you need?",
      options: ["Personal", "Portfolio", "Small business", "Blog", "Other"],
    },
    {
      type: "select",
      label: "Do you have the content ready?",
      options: ["Yes", "Partially", "No"],
    },
    { type: "text", label: "Do you have an existing website? (optional URL)" },
  ],

  pro: [
    { type: "textarea", label: "Tell us about your project" },
    { type: "text", label: "How many pages or main features do you need?" },
    {
      type: "select",
      label: "Do you have branding or design ready?",
      options: ["Yes", "No", "Need help with design"],
    },
    { type: "text", label: "Existing website? (optional URL)" },
    {
      type: "select",
      label: "What is your timeline?",
      options: ["ASAP (1–2 weeks)", "Soon (2–3 weeks)", "Flexible"],
    },
  ],

  enterprise: [
    { type: "textarea", label: "What problem are you trying to solve?" },
    { type: "textarea", label: "List any core features you need" },
    {
      type: "select",
      label: "Do you need AI or automation?",
      options: ["Yes", "No", "Not sure"],
    },
    { type: "file", label: "Upload any reference documents (optional)" },
  ],
};
