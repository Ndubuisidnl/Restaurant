// ============================================================
// WOOD HOUSE CAFE — DEMO MENU DATA
//
// IMPORTANT: This is DEMO/DEVELOPMENT data only.
// Do NOT present these items or prices as official Wood House Cafe information.
// This data is organized to be replaced by real backend data (Supabase) later.
//
// SUPABASE: FUTURE BACKEND INTEGRATION - MENU DATA
// Replace this demo data with a real-time fetch from Supabase
// in the backend phase. The data shape (MenuItem interface) is
// designed to be directly compatible with the Supabase menu_items table.
// ============================================================

import type { MenuItem, MenuCategory } from "@/types";

export const MENU_CATEGORIES: {
  id: MenuCategory;
  label: string;
  emoji: string;
}[] = [
  { id: "breakfast", label: "Breakfast", emoji: "🍳" },
  { id: "burgers", label: "Burgers", emoji: "🍔" },
  { id: "sandwiches", label: "Sandwiches", emoji: "🥪" },
  { id: "main-dishes", label: "Main Dishes", emoji: "🍽️" },
  { id: "pasta", label: "Pasta", emoji: "🍝" },
  { id: "rice", label: "Rice", emoji: "🍚" },
  { id: "chicken", label: "Chicken", emoji: "🍗" },
  { id: "snacks", label: "Snacks", emoji: "🍟" },
  { id: "coffee", label: "Coffee", emoji: "☕" },
  { id: "drinks", label: "Drinks", emoji: "🥤" },
  { id: "desserts", label: "Desserts", emoji: "🧇" },
];

// DEMO DATA — Replace with real menu items and confirmed prices
export const DEMO_MENU_ITEMS: MenuItem[] = [
  // BREAKFAST
  {
    id: "bf-001",
    name: "English Breakfast",
    description:
      "Pancakes, waffles, toasted bread, sausages, bacon, baked beans, mushrooms and grilled tomatoes.",
    price: 4500,
    category: "breakfast",
    image: "/images/WOOD HOUSE CAFE ENGLISH BREAKFAST PLATE.png",
    imageLabel: "WOOD HOUSE CAFE ENGLISH BREAKFAST PLATE",
    available: true,
    featured: true,
    tags: ["popular"],
    preparationTime: 20,
  },
  // {
  //   id: "bf-002",
  //   name: "Pancake Stack",
  //   description:
  //     "Fluffy buttermilk pancakes served with maple syrup, fresh berries, and whipped butter.",
  //   price: 3500,
  //   category: "breakfast",
  //   imageLabel: "WOOD HOUSE CAFE PANCAKE STACK WITH SYRUP",
  //   available: true,
  //   featured: true,
  //   tags: ["popular", "vegetarian"],
  //   preparationTime: 15,
  // },
  {
    id: "bf-003",
    name: "Avocado Toast",
    description:
      "Toasted artisan sourdough with smashed avocado, poached eggs, cherry tomatoes, and microgreens.",
    price: 3800,
    category: "breakfast",
    imageLabel: "WOOD HOUSE CAFE AVOCADO TOAST WITH POACHED EGGS",
    available: true,
    tags: ["vegetarian"],
    preparationTime: 15,
  },
  {
    id: "bf-004",
    name: "French Toast",
    description:
      "Golden brioche French toast dusted with powdered sugar, served with fresh fruit and honey.",
    price: 3200,
    category: "breakfast",
    imageLabel: "WOOD HOUSE CAFE FRENCH TOAST WITH FRUIT",
    available: true,
    preparationTime: 15,
  },
  {
    id: "bf-005",
    name: "Omelette du Chef",
    description:
      "Three-egg omelette stuffed with sautéed mushrooms, bell peppers, onions, and melted cheese.",
    price: 3000,
    category: "breakfast",
    imageLabel: "WOOD HOUSE CAFE STUFFED OMELETTE",
    available: true,
    preparationTime: 15,
  },

  // BURGERS
  {
    id: "bg-001",
    name: "Wood House Classic Burger",
    description:
      "Juicy beef patty with lettuce, tomato, pickles, caramelized onions, and house burger sauce.",
    price: 5500,
    category: "burgers",
    image: "/images/WOOD HOUSE CAFE BURGER.png",
    imageLabel: "WOOD HOUSE CAFE CLASSIC BEEF BURGER",
    available: true,
    featured: true,
    tags: ["popular"],
    preparationTime: 20,
  },
  {
    id: "bg-002",
    name: "Smoky BBQ Burger",
    description:
      "Beef patty topped with smoky BBQ sauce, crispy bacon, cheddar cheese, and onion rings.",
    price: 6500,
    category: "burgers",
    imageLabel: "WOOD HOUSE CAFE BBQ BURGER WITH BACON",
    available: true,
    tags: ["popular"],
    preparationTime: 20,
  },
  {
    id: "bg-003",
    name: "Spicy Chicken Burger",
    description:
      "Crispy fried chicken fillet with spicy mayo, coleslaw, pickled jalapeños, and brioche bun.",
    price: 5500,
    category: "burgers",
    imageLabel: "WOOD HOUSE CAFE SPICY CHICKEN BURGER",
    available: true,
    preparationTime: 20,
  },
  {
    id: "bg-004",
    name: "Mushroom Swiss Burger",
    description:
      "Beef patty with sautéed mushrooms, Swiss cheese, garlic aioli, and toasted sesame bun.",
    price: 5800,
    category: "burgers",
    imageLabel: "WOOD HOUSE CAFE MUSHROOM SWISS BURGER",
    available: false,
    preparationTime: 20,
  },

  // SANDWICHES
  {
    id: "sw-001",
    name: "Club Sandwich",
    description:
      "Triple-decker with grilled chicken, crispy bacon, egg, lettuce, tomato, and mayo.",
    price: 4500,
    category: "sandwiches",
    imageLabel: "WOOD HOUSE CAFE TRIPLE CLUB SANDWICH",
    available: true,
    featured: true,
    preparationTime: 15,
  },
  {
    id: "sw-002",
    name: "Tuna Melt",
    description:
      "Flaked tuna with mayo and onion on toasted sourdough, topped with melted cheddar.",
    price: 4000,
    category: "sandwiches",
    imageLabel: "WOOD HOUSE CAFE TUNA MELT SANDWICH",
    available: true,
    preparationTime: 15,
  },
  {
    id: "sw-003",
    name: "Grilled Veggie Wrap",
    description:
      "Grilled seasonal vegetables, hummus, mixed greens, and feta in a warm flour tortilla.",
    price: 3800,
    category: "sandwiches",
    imageLabel: "WOOD HOUSE CAFE GRILLED VEGGIE WRAP",
    available: true,
    tags: ["vegetarian"],
    preparationTime: 15,
  },

  // MAIN DISHES
  {
    id: "md-001",
    name: "Grilled Beef Steak",
    description:
      "Tender grilled beef steak served with roasted vegetables, mashed potatoes, and mushroom sauce.",
    price: 12000,
    category: "main-dishes",
    imageLabel: "WOOD HOUSE CAFE GRILLED BEEF STEAK WITH SIDES",
    available: true,
    featured: true,
    tags: ["popular"],
    preparationTime: 30,
  },
  {
    id: "md-002",
    name: "Grilled Salmon",
    description:
      "Pan-seared salmon fillet with lemon butter sauce, steamed broccoli, and herbed potatoes.",
    price: 10000,
    category: "main-dishes",
    imageLabel: "WOOD HOUSE CAFE GRILLED SALMON FILLET",
    available: true,
    preparationTime: 25,
  },
  {
    id: "md-003",
    name: "BBQ Ribs",
    description:
      "Slow-cooked pork ribs glazed with smoky BBQ sauce, served with coleslaw and fries.",
    price: 13500,
    category: "main-dishes",
    imageLabel: "WOOD HOUSE CAFE BBQ RIBS WITH COLESLAW",
    available: true,
    preparationTime: 35,
  },

  // PASTA
  {
    id: "pa-001",
    name: "Creamy Alfredo Pasta",
    description:
      "Fettuccine in a rich Parmesan cream sauce with grilled chicken and fresh herbs.",
    price: 6000,
    category: "pasta",
    imageLabel: "WOOD HOUSE CAFE CREAMY ALFREDO PASTA",
    available: true,
    featured: true,
    preparationTime: 20,
  },
  {
    id: "pa-002",
    name: "Spaghetti Bolognese",
    description:
      "Classic spaghetti with slow-cooked beef and tomato ragù, topped with Parmesan.",
    price: 5500,
    category: "pasta",
    imageLabel: "WOOD HOUSE CAFE SPAGHETTI BOLOGNESE",
    available: true,
    preparationTime: 20,
  },
  {
    id: "pa-003",
    name: "Penne Arrabbiata",
    description:
      "Penne pasta in spicy tomato and garlic sauce, garnished with fresh basil.",
    price: 4800,
    category: "pasta",
    imageLabel: "WOOD HOUSE CAFE PENNE ARRABBIATA",
    available: true,
    tags: ["vegetarian", "spicy"],
    preparationTime: 20,
  },

  // RICE
  {
    id: "ri-001",
    name: "Jollof Rice & Chicken",
    description:
      "Fragrant West African jollof rice served with grilled chicken and fried plantains.",
    price: 4500,
    category: "rice",
    imageLabel: "WOOD HOUSE CAFE JOLLOF RICE WITH GRILLED CHICKEN",
    available: true,
    featured: true,
    tags: ["popular"],
    preparationTime: 20,
  },
  {
    id: "ri-002",
    name: "Fried Rice",
    description:
      "Stir-fried rice with mixed vegetables, egg, and your choice of chicken or beef.",
    price: 4000,
    category: "rice",
    imageLabel: "WOOD HOUSE CAFE FRIED RICE WITH EGG AND VEGETABLES",
    available: true,
    preparationTime: 20,
  },
  {
    id: "ri-003",
    name: "Coconut Rice",
    description:
      "Aromatic coconut-infused rice served with stewed chicken and fresh salad.",
    price: 4200,
    category: "rice",
    imageLabel: "WOOD HOUSE CAFE COCONUT RICE WITH STEWED CHICKEN",
    available: true,
    preparationTime: 25,
  },

  // CHICKEN
  {
    id: "ck-001",
    name: "Crispy Fried Chicken",
    description:
      "Golden crispy fried chicken pieces served with your choice of fries or coleslaw.",
    price: 5500,
    category: "chicken",
    imageLabel: "WOOD HOUSE CAFE CRISPY FRIED CHICKEN WITH FRIES",
    available: true,
    featured: true,
    tags: ["popular"],
    preparationTime: 25,
  },
  {
    id: "ck-002",
    name: "Grilled Chicken",
    description:
      "Herb-marinated grilled chicken breast with roasted vegetables and garlic sauce.",
    price: 5000,
    category: "chicken",
    imageLabel: "WOOD HOUSE CAFE GRILLED HERB CHICKEN",
    available: true,
    preparationTime: 25,
  },
  {
    id: "ck-003",
    name: "Peri-Peri Chicken",
    description:
      "Spicy peri-peri marinated chicken quarters with chips and dipping sauce.",
    price: 6000,
    category: "chicken",
    imageLabel: "WOOD HOUSE CAFE PERI PERI CHICKEN QUARTERS",
    available: true,
    tags: ["spicy"],
    preparationTime: 30,
  },

  // SNACKS
  {
    id: "sn-001",
    name: "Loaded Fries",
    description:
      "Crispy fries topped with melted cheese, jalapeños, sour cream, and chives.",
    price: 3000,
    category: "snacks",
    imageLabel: "WOOD HOUSE CAFE LOADED CHEESE FRIES",
    available: true,
    preparationTime: 15,
  },
  {
    id: "sn-002",
    name: "Chicken Wings",
    description:
      "Crispy chicken wings tossed in your choice of BBQ, buffalo, or honey garlic sauce.",
    price: 4000,
    category: "snacks",
    imageLabel: "WOOD HOUSE CAFE CHICKEN WINGS WITH DIPPING SAUCE",
    available: true,
    tags: ["popular"],
    preparationTime: 20,
  },
  {
    id: "sn-003",
    name: "Mozzarella Sticks",
    description:
      "Crispy golden mozzarella sticks served with marinara dipping sauce.",
    price: 2800,
    category: "snacks",
    imageLabel: "WOOD HOUSE CAFE MOZZARELLA STICKS WITH MARINARA",
    available: true,
    tags: ["vegetarian"],
    preparationTime: 15,
  },
  {
    id: "sn-004",
    name: "Samosa Platter",
    description:
      "Crispy fried samosas filled with spiced vegetables or meat, served with chutney.",
    price: 2500,
    category: "snacks",
    imageLabel: "WOOD HOUSE CAFE SAMOSA PLATTER WITH CHUTNEY",
    available: true,
    preparationTime: 15,
  },

  // COFFEE
  {
    id: "cf-001",
    name: "Espresso",
    description:
      "Rich, concentrated espresso shot made with premium arabica beans.",
    price: 1500,
    category: "coffee",
    imageLabel: "WOOD HOUSE CAFE ESPRESSO SHOT IN SMALL CUP",
    available: true,
    preparationTime: 5,
  },
  {
    id: "cf-002",
    name: "Cappuccino",
    description:
      "Classic cappuccino with equal parts espresso, steamed milk, and velvety foam.",
    price: 2200,
    category: "coffee",
    imageLabel: "WOOD HOUSE CAFE CAPPUCCINO WITH LATTE ART",
    available: true,
    featured: true,
    tags: ["popular"],
    preparationTime: 7,
  },
  {
    id: "cf-003",
    name: "Caramel Latte",
    description:
      "Smooth espresso and steamed milk sweetened with house-made caramel syrup.",
    price: 2500,
    category: "coffee",
    imageLabel: "WOOD HOUSE CAFE CARAMEL LATTE WITH FOAM",
    available: true,
    tags: ["popular"],
    preparationTime: 7,
  },
  {
    id: "cf-004",
    name: "Cold Brew",
    description:
      "Smooth, slow-steeped cold brew coffee served over ice. Bold and refreshing.",
    price: 2800,
    category: "coffee",
    imageLabel: "WOOD HOUSE CAFE COLD BREW COFFEE OVER ICE",
    available: true,
    preparationTime: 5,
  },
  {
    id: "cf-005",
    name: "Mocha",
    description:
      "Rich espresso combined with chocolate syrup and steamed milk, topped with whipped cream.",
    price: 2500,
    category: "coffee",
    imageLabel: "WOOD HOUSE CAFE MOCHA WITH WHIPPED CREAM",
    available: true,
    preparationTime: 7,
  },

  // DRINKS
  {
    id: "dr-001",
    name: "Fresh Fruit Smoothie",
    description:
      "Blended seasonal fresh fruits with yogurt. Ask your server for today's flavors.",
    price: 2500,
    category: "drinks",
    imageLabel: "WOOD HOUSE CAFE FRESH FRUIT SMOOTHIE IN GLASS",
    available: true,
    preparationTime: 8,
  },
  {
    id: "dr-002",
    name: "Milkshake",
    description:
      "Thick, creamy milkshake available in vanilla, chocolate, and strawberry.",
    price: 2800,
    category: "drinks",
    imageLabel: "WOOD HOUSE CAFE MILKSHAKE WITH WHIPPED CREAM",
    available: true,
    featured: true,
    tags: ["popular"],
    preparationTime: 8,
  },
  {
    id: "dr-003",
    name: "Lemonade",
    description:
      "Freshly squeezed lemonade with mint and ice. Still or sparkling.",
    price: 1800,
    category: "drinks",
    imageLabel: "WOOD HOUSE CAFE FRESH LEMONADE WITH MINT",
    available: true,
    preparationTime: 5,
  },
  {
    id: "dr-004",
    name: "Chapman",
    description:
      "Classic Nigerian Chapman cocktail with Fanta, Sprite, grenadine, cucumber, and citrus.",
    price: 2200,
    category: "drinks",
    imageLabel: "WOOD HOUSE CAFE CHAPMAN COCKTAIL WITH FRUIT GARNISH",
    available: true,
    tags: ["popular"],
    preparationTime: 8,
  },

  // DESSERTS
  {
    id: "ds-001",
    name: "Belgian Waffles",
    description:
      "Crispy Belgian waffles served with ice cream, whipped cream, and chocolate sauce.",
    price: 3500,
    category: "desserts",
    imageLabel: "WOOD HOUSE CAFE BELGIAN WAFFLES WITH ICE CREAM",
    available: true,
    featured: true,
    tags: ["popular"],
    preparationTime: 15,
  },
  {
    id: "ds-002",
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate fondant with a molten center, served with vanilla ice cream.",
    price: 3800,
    category: "desserts",
    imageLabel: "WOOD HOUSE CAFE CHOCOLATE LAVA CAKE WITH ICE CREAM",
    available: true,
    preparationTime: 20,
  },
  {
    id: "ds-003",
    name: "Cheesecake",
    description:
      "Creamy New York-style cheesecake on a buttery graham cracker crust with berry compote.",
    price: 3200,
    category: "desserts",
    imageLabel: "WOOD HOUSE CAFE NEW YORK CHEESECAKE WITH BERRY COMPOTE",
    available: true,
    preparationTime: 5,
  },
  {
    id: "ds-004",
    name: "Ice Cream (2 Scoops)",
    description:
      "Two scoops of premium ice cream. Ask your server for today's available flavors.",
    price: 2000,
    category: "desserts",
    imageLabel: "WOOD HOUSE CAFE TWO SCOOPS ICE CREAM IN BOWL",
    available: true,
    preparationTime: 5,
  },
];

export function getMenuItemsByCategory(category: MenuCategory): MenuItem[] {
  return DEMO_MENU_ITEMS.filter((item) => item.category === category);
}

export function getFeaturedMenuItems(): MenuItem[] {
  return DEMO_MENU_ITEMS.filter((item) => item.featured);
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return DEMO_MENU_ITEMS.find((item) => item.id === id);
}

export function searchMenuItems(query: string): MenuItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return DEMO_MENU_ITEMS;
  return DEMO_MENU_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
  );
}
