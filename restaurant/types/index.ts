// ============================================================
// WOOD HOUSE CAFE — SHARED FRONTEND TYPES
// These types describe the data shapes used throughout the
// customer-facing frontend. Designed to be compatible with
// future Supabase backend integration.
// ============================================================

// ----------------------------------------------------------
// MENU & PRODUCTS
// ----------------------------------------------------------

export type MenuCategory =
  | "breakfast"
  | "burgers"
  | "sandwiches"
  | "starters"
  | "salads"
  | "main-dishes"
  | "sides"
  | "pasta"
  | "coffee"
  | "drinks"
  | "desserts";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /**
   * Base price in Naira (NGN).
   * For two-price items, this is the lower price (used for cart calculations when no selection is made).
   */
  price: number;
  /**
   * Optional second price for items printed as "₦A / ₦B" on the menu.
   * When set, the cart will prompt the user to select either price before adding.
   */
  priceSecondary?: number;
  /**
   * Exact price string as printed on the menu (e.g., "₦700 / ₦1,000").
   * Shown on all menu cards. When absent, formatCurrency(price) is used.
   */
  priceDisplay?: string;
  category: MenuCategory;
  /** Image URL path (e.g., /images/filename.png) */
  image?: string;
  /** Used for IMAGE: placeholder labels when no image is provided */
  imageLabel: string;
  available: boolean;
  featured?: boolean;
  tags?: string[];
  preparationTime?: number; // minutes
}

// ----------------------------------------------------------
// CART
// ----------------------------------------------------------

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export type OrderType = "delivery" | "pickup";

export type PaymentMethod =
  | "pay-on-delivery"
  | "pay-on-pickup"
  | "pay-at-restaurant";

// ----------------------------------------------------------
// CHECKOUT
// ----------------------------------------------------------

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  whatsapp?: string;
}

export interface DeliveryAddress {
  address: string;
  landmark?: string;
  directions?: string;
}

export interface CheckoutFormData extends CustomerDetails {
  orderType: OrderType;
  deliveryAddress?: DeliveryAddress;
  generalNote?: string;
  paymentMethod: PaymentMethod;
}

// ----------------------------------------------------------
// DEMO ORDER
//
// SUPABASE: FUTURE BACKEND INTEGRATION - ORDER MODEL
// Real orders will be stored in Supabase PostgreSQL in the backend phase.
// ----------------------------------------------------------

export type DemoOrderStatus =
  | "received"
  | "preparing"
  | "ready"
  | "out-for-delivery"
  | "collected";

export type DemoPickupStatus =
  | "received"
  | "preparing"
  | "ready-for-pickup"
  | "collected";

export interface DemoOrder {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customerDetails: CustomerDetails;
  orderType: OrderType;
  deliveryAddress?: DeliveryAddress;
  generalNote?: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: DemoOrderStatus | DemoPickupStatus;
  createdAt: Date;
}

// ----------------------------------------------------------
// RESERVATIONS
//
// SUPABASE: FUTURE BACKEND INTEGRATION - RESERVATION MODEL
// Real reservations will be stored in Supabase in the backend phase.
// ----------------------------------------------------------

export type SpecialOccasion =
  | "birthday"
  | "anniversary"
  | "date"
  | "business-meeting"
  | "family-gathering"
  | "other"
  | "none";

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface Reservation {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  date: string;
  time: string;
  guestCount: number;
  occasion: SpecialOccasion;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: Date;
}

// ----------------------------------------------------------
// CUSTOMER PROFILE (demo data)
//
// SUPABASE: FUTURE BACKEND INTEGRATION - CUSTOMER PROFILE
// Real profile data will come from Supabase Auth + profiles table.
// ----------------------------------------------------------

export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface SavedAddress {
  id: string;
  label: "Home" | "Work" | "Other";
  address: string;
  landmark?: string;
  city: string;
  phone?: string;
  isDefault: boolean;
}

// ----------------------------------------------------------
// CONTACT FORM
//
// SUPABASE: FUTURE BACKEND INTEGRATION - CONTACT MESSAGE
// Messages will be saved in Supabase in the backend phase.
// ----------------------------------------------------------

export type ContactSubject =
  | "reservation"
  | "order"
  | "feedback"
  | "partnership"
  | "general-inquiry"
  | "other";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: ContactSubject;
  message: string;
}

// ----------------------------------------------------------
// UI
// ----------------------------------------------------------

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}
