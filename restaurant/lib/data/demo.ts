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
  email: "info.bookpod@gmail.com",
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
          id: "cf-009",
          name: "Cappuccino",
          description: "Equal parts espresso, steamed milk, and velvety foam.",
          price: 1200,
          priceSecondary: 1500,
          priceDisplay: "₦1,200 / ₦1,500",
          category: "coffee",
          imageLabel: "WOOD HOUSE CAFE CAPPUCCINO WITH LATTE ART",
          available: true,
        },
        quantity: 2,
      },
      {
        menuItem: {
          id: "ds-001",
          name: "Pancakes or Waffles with Ice Cream",
          description: "Fluffy pancakes or crispy waffles served with a scoop of ice cream and chocolate sauce.",
          price: 1500,
          category: "desserts",
          imageLabel: "WOOD HOUSE CAFE PANCAKES OR WAFFLES WITH ICE CREAM",
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
    subtotal: 3900,
    deliveryFee: 0,
    total: 3900,
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
          name: "Beef Burger",
          description: "Juicy beef patty with onions, green peppers, rocket, fresh tomatoes, cheddar cheese and house burger sauce.",
          price: 2000,
          category: "burgers",
          image: "/images/WOOD HOUSE CAFE BURGER.png",
          imageLabel: "WOOD HOUSE CAFE BEEF BURGER",
          available: true,
        },
        quantity: 1,
        specialInstructions: "No pickles",
      },
      {
        menuItem: {
          id: "si-004",
          name: "French Fries",
          description: "Classic golden crispy French fries, lightly salted and served hot.",
          price: 500,
          category: "sides",
          imageLabel: "WOOD HOUSE CAFE FRENCH FRIES",
          available: true,
        },
        quantity: 1,
      },
      {
        menuItem: {
          id: "mo-001",
          name: "Chapman",
          description: "Classic Nigerian Chapman — Fanta, Sprite, grenadine, cucumber and citrus over ice.",
          price: 1500,
          category: "drinks",
          imageLabel: "WOOD HOUSE CAFE CHAPMAN MOCKTAIL",
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
    subtotal: 4000,
    deliveryFee: 500,
    total: 4500,
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
