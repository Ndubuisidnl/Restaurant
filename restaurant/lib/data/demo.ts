// ============================================================
// WOOD HOUSE CAFE — DEMO DATA
// Business information, demo orders, reservations, profile
// ============================================================

import type {
  DemoOrder,
  Reservation,
  CustomerProfile,
  SavedAddress,
} from "@/types";

// ----------------------------------------------------------
// BUSINESS CONSTANTS
// Use only confirmed, publicly available information.
// ----------------------------------------------------------

export const BUSINESS_INFO = {
  name: "Wood House Cafe",
  tagline: "Where Every Meal Feels Like Home",
  address: {
    street: "3 Louis Drive, off Sani Abacha Road",
    city: "Port Harcourt",
    state: "Rivers State",
    country: "Nigeria",
    full: "3 Louis Drive, off Sani Abacha Road, Port Harcourt, Rivers State, Nigeria",
  },
  phone: "+234 818 447 9600",
  whatsapp: "+2348184479600", // Formatted for WhatsApp URL
  instagram: "@woodhouse_cafe",
  instagramUrl: "https://www.instagram.com/woodhouse_cafe",
  // NOTE: email and TikTok not publicly confirmed — using placeholders
  email: null, // Will be added when confirmed
  tiktok: null, // Will be added when confirmed
  openingHours: {
    schedule: "Daily",
    open: "8:00 AM",
    close: "10:00 PM",
    display: "8:00 AM – 10:00 PM Daily",
  },
  googleMapsUrl:
    "https://www.google.com/maps/search/3+Louis+Drive,+off+Sani+Abacha+Road,+Port+Harcourt,+Rivers+State,+Nigeria",
  getDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=3+Louis+Drive,+off+Sani+Abacha+Road,+Port+Harcourt,+Rivers+State,+Nigeria",
  services: [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Coffee",
    "Delivery",
    "Takeaway",
    "Reservations",
    "Cozy Atmosphere",
    "Outdoor Seating",
    "Wi-Fi",
    "Games & Book Corner",
  ],
} as const;

// ----------------------------------------------------------
// DEMO CUSTOMER PROFILE
//
// SUPABASE: FUTURE BACKEND INTEGRATION - CUSTOMER PROFILE
// This demo profile will be replaced by the authenticated
// user's real data fetched from Supabase in the backend phase.
// ----------------------------------------------------------

export const DEMO_CUSTOMER_PROFILE: CustomerProfile = {
  id: "demo-user-001",
  fullName: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+234 800 000 0000",
  avatarUrl: undefined,
  createdAt: new Date("2024-01-15"),
};

// ----------------------------------------------------------
// DEMO SAVED ADDRESSES
//
// SUPABASE: FUTURE BACKEND INTEGRATION - SAVED ADDRESSES
// Real addresses will be stored in Supabase in the backend phase.
// ----------------------------------------------------------

export const DEMO_SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: "addr-001",
    label: "Home",
    address: "12 Rumuola Road",
    landmark: "Near Total Filling Station",
    city: "Port Harcourt",
    phone: "+234 800 000 0000",
    isDefault: true,
  },
  {
    id: "addr-002",
    label: "Work",
    address: "5 Forces Avenue, GRA Phase 2",
    landmark: "Opposite Unity Bank",
    city: "Port Harcourt",
    phone: "+234 800 000 0001",
    isDefault: false,
  },
];

// ----------------------------------------------------------
// DEMO ORDERS
//
// SUPABASE: FUTURE BACKEND INTEGRATION - LOAD CUSTOMER ORDERS
// Real orders will be fetched from Supabase in the backend phase.
// ----------------------------------------------------------

export const DEMO_ORDERS: DemoOrder[] = [
  {
    id: "order-001",
    orderNumber: "WH-DEMO-0001",
    items: [
      {
        menuItem: {
          id: "cf-002",
          name: "Cappuccino",
          description: "Classic cappuccino",
          price: 2200,
          category: "coffee",
          imageLabel: "WOOD HOUSE CAFE CAPPUCCINO WITH LATTE ART",
          available: true,
        },
        quantity: 2,
      },
      {
        menuItem: {
          id: "ds-001",
          name: "Belgian Waffles",
          description: "Crispy Belgian waffles",
          price: 3500,
          category: "desserts",
          imageLabel: "WOOD HOUSE CAFE BELGIAN WAFFLES WITH ICE CREAM",
          available: true,
        },
        quantity: 1,
      },
    ],
    customerDetails: {
      fullName: "Alex Johnson",
      phone: "+234 800 000 0000",
      email: "alex.johnson@example.com",
    },
    orderType: "pickup",
    paymentMethod: "pay-at-restaurant",
    subtotal: 7900,
    deliveryFee: 0,
    total: 7900,
    status: "collected",
    createdAt: new Date("2024-09-20T10:30:00"),
  },
  {
    id: "order-002",
    orderNumber: "WH-DEMO-0002",
    items: [
      {
        menuItem: {
          id: "bg-001",
          name: "Wood House Classic Burger",
          description: "Juicy beef patty",
          price: 5500,
          category: "burgers",
          imageLabel: "WOOD HOUSE CAFE CLASSIC BEEF BURGER",
          available: true,
        },
        quantity: 1,
        specialInstructions: "No pickles",
      },
      {
        menuItem: {
          id: "sn-001",
          name: "Loaded Fries",
          description: "Crispy fries with toppings",
          price: 3000,
          category: "snacks",
          imageLabel: "WOOD HOUSE CAFE LOADED CHEESE FRIES",
          available: true,
        },
        quantity: 1,
      },
      {
        menuItem: {
          id: "dr-004",
          name: "Chapman",
          description: "Classic Nigerian Chapman",
          price: 2200,
          category: "drinks",
          imageLabel: "WOOD HOUSE CAFE CHAPMAN COCKTAIL WITH FRUIT GARNISH",
          available: true,
        },
        quantity: 1,
      },
    ],
    customerDetails: {
      fullName: "Alex Johnson",
      phone: "+234 800 000 0000",
      email: "alex.johnson@example.com",
    },
    orderType: "delivery",
    deliveryAddress: {
      address: "12 Rumuola Road",
      landmark: "Near Total Filling Station",
    },
    paymentMethod: "pay-on-delivery",
    subtotal: 10700,
    deliveryFee: 500,
    total: 11200,
    status: "preparing",
    createdAt: new Date("2024-09-28T14:15:00"),
  },
];

// ----------------------------------------------------------
// DEMO RESERVATIONS
//
// SUPABASE: FUTURE BACKEND INTEGRATION - LOAD RESERVATIONS
// Real reservations will be fetched from Supabase in the backend phase.
// ----------------------------------------------------------

export const DEMO_RESERVATIONS: Reservation[] = [
  {
    id: "res-001",
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+234 800 000 0000",
    date: "2024-10-05",
    time: "19:00",
    guestCount: 2,
    occasion: "anniversary",
    specialRequests: "Window seat if available",
    status: "confirmed",
    createdAt: new Date("2024-09-25"),
  },
  {
    id: "res-002",
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+234 800 000 0000",
    date: "2024-08-15",
    time: "13:00",
    guestCount: 4,
    occasion: "family-gathering",
    status: "completed",
    createdAt: new Date("2024-08-10"),
  },
];

// ----------------------------------------------------------
// AVAILABLE RESERVATION TIMES
// These are frontend display times only.
// SUPABASE: FUTURE BACKEND INTEGRATION - AVAILABILITY CHECK
// Real availability will be validated against Supabase reservations table.
// ----------------------------------------------------------

export const RESERVATION_TIMES: string[] = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatOrderDate(date: Date): string {
  return date.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
