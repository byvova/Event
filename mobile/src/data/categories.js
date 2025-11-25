export const CATEGORIES = [
  {
    id: "event",
    name: "Event",
    description: "Event planning and entertainment services",
    icon: "calendar",
    color: "#8B5CF6", // Purple
    subcategories: [
      {
        id: "photographers",
        name: "Photographers",
        description: "Professional photography services for events",
        icon: "camera",
      },
      {
        id: "videographers",
        name: "Videographers",
        description: "Video recording and production services",
        icon: "video",
      },
      {
        id: "hosts-mc",
        name: "Hosts / MC",
        description: "Event hosts and master of ceremonies",
        icon: "mic",
      },
      {
        id: "djs",
        name: "DJs",
        description: "Professional DJ services for events",
        icon: "music",
      },
      {
        id: "musicians-bands",
        name: "Musicians / Bands",
        description: "Live music performances and bands",
        icon: "music-2",
      },
      {
        id: "light-sound",
        name: "Light and Sound",
        description: "Audio visual and lighting equipment",
        icon: "volume-2",
      },
      {
        id: "stage-podium",
        name: "Stage / Podium",
        description: "Stage setup and podium services",
        icon: "square",
      },
      {
        id: "decor-florists",
        name: "Decor / Florists",
        description: "Event decoration and floral arrangements",
        icon: "flower",
      },
      {
        id: "catering",
        name: "Catering",
        description: "Food and beverage services",
        icon: "utensils",
      },
      {
        id: "stylists-makeup",
        name: "Stylists / Makeup artists",
        description: "Beauty and styling services",
        icon: "palette",
      },
    ],
  },
  {
    id: "construction",
    name: "Construction",
    description: "Home improvement and construction services",
    icon: "hammer",
    color: "#F59E0B", // Orange
    subcategories: [
      {
        id: "plumbers",
        name: "Plumbers",
        description: "Plumbing installation and repair services",
        icon: "droplets",
      },
      {
        id: "electricians",
        name: "Electricians",
        description: "Electrical installation and repair services",
        icon: "zap",
      },
      {
        id: "painters-plasterers",
        name: "Painters / Plasterers",
        description: "Interior and exterior painting services",
        icon: "paintbrush",
      },
      {
        id: "tilers",
        name: "Tilers",
        description: "Tile installation and repair services",
        icon: "square",
      },
      {
        id: "finishers",
        name: "Finishers (full renovation)",
        description: "Complete home renovation services",
        icon: "home",
      },
      {
        id: "roofers",
        name: "Roofers",
        description: "Roof installation and repair services",
        icon: "triangle",
      },
      {
        id: "window-door-installers",
        name: "Window and Door Installers",
        description: "Window and door installation services",
        icon: "door-open",
      },
      {
        id: "facade-insulation",
        name: "Facade / Insulation works",
        description: "Building exterior and insulation services",
        icon: "building",
      },
      {
        id: "hvac",
        name: "HVAC (ventilation and air conditioning)",
        description: "Heating, ventilation, and air conditioning",
        icon: "thermometer",
      },
      {
        id: "landscape-workers",
        name: "Landscape workers",
        description: "Landscaping and garden services",
        icon: "trees",
      },
      {
        id: "interior-designers",
        name: "Interior designers",
        description: "Interior design and decoration services",
        icon: "layout",
      },
    ],
  },
  {
    id: "digital-it",
    name: "Digital / IT",
    description: "Technology and digital services",
    icon: "laptop",
    color: "#3B82F6", // Blue
    subcategories: [
      {
        id: "web-developers",
        name: "Web developers",
        description: "Website development and programming",
        icon: "code",
      },
      {
        id: "mobile-developers",
        name: "Mobile developers",
        description: "Mobile app development services",
        icon: "smartphone",
      },
      {
        id: "ux-ui-designers",
        name: "UX/UI designers",
        description: "User experience and interface design",
        icon: "layout",
      },
      {
        id: "web-designers",
        name: "Web designers",
        description: "Website design and visual creation",
        icon: "monitor",
      },
      {
        id: "smm-experts",
        name: "SMM experts",
        description: "Social media marketing specialists",
        icon: "share-2",
      },
      {
        id: "seo-experts",
        name: "SEO experts",
        description: "Search engine optimization services",
        icon: "search",
      },
      {
        id: "copywriters",
        name: "Copywriters",
        description: "Professional writing and content creation",
        icon: "pen-tool",
      },
      {
        id: "content-creators-video-editors",
        name: "Content creators / Video editors",
        description: "Content creation and video editing",
        icon: "film",
      },
    ],
  },
  {
    id: "household-services",
    name: "Household Services",
    description: "Home and family support services",
    icon: "home",
    color: "#10B981", // Green
    subcategories: [
      {
        id: "handyman",
        name: "Handyman",
        description: "General home repair and maintenance",
        icon: "wrench",
      },
      {
        id: "cleaning-services",
        name: "Cleaning services",
        description: "Professional cleaning services",
        icon: "spray-can",
      },
      {
        id: "nannies-childcare",
        name: "Nannies / Childcare assistants",
        description: "Childcare and nanny services",
        icon: "baby",
      },
      {
        id: "elder-care",
        name: "Elder care",
        description: "Senior care and assistance services",
        icon: "heart",
      },
      {
        id: "drivers-transport",
        name: "Drivers / Transport",
        description: "Transportation and delivery services",
        icon: "car",
      },
      {
        id: "appliance-repair",
        name: "Appliance repair",
        description: "Home appliance repair services",
        icon: "settings",
      },
    ],
  },
  {
    id: "business-services",
    name: "Business Services",
    description: "Professional business support services",
    icon: "briefcase",
    color: "#EF4444", // Red
    subcategories: [
      {
        id: "lawyers",
        name: "Lawyers",
        description: "Legal consultation and services",
        icon: "scale",
      },
      {
        id: "accountants",
        name: "Accountants",
        description: "Financial and accounting services",
        icon: "calculator",
      },
      {
        id: "business-consultants",
        name: "Business consultants",
        description: "Business strategy and consulting",
        icon: "trending-up",
      },
      {
        id: "marketers",
        name: "Marketers",
        description: "Marketing and advertising services",
        icon: "target",
      },
      {
        id: "hr-recruiters",
        name: "HR / Recruiters",
        description: "Human resources and recruitment",
        icon: "users",
      },
    ],
  },
];

// Helper function to find a category by ID
export const findCategoryById = (categoryId) => {
  return CATEGORIES.find((category) => category.id === categoryId);
};

// Helper function to find a subcategory by ID within a category
export const findSubcategoryById = (categoryId, subcategoryId) => {
  const category = findCategoryById(categoryId);
  if (!category) return null;
  return category.subcategories.find((sub) => sub.id === subcategoryId);
};

// Helper function to get all subcategories as a flat array
export const getAllSubcategories = () => {
  return CATEGORIES.flatMap((category) =>
    category.subcategories.map((sub) => ({
      ...sub,
      categoryId: category.id,
      categoryName: category.name,
    })),
  );
};

// Legacy mapping for backward compatibility
export const LEGACY_CATEGORY_MAPPING = {
  plumbing: "plumbers",
  electrical: "electricians",
  construction: "finishers",
  painting: "painters-plasterers",
  hvac: "hvac",
  general: "handyman",
};
