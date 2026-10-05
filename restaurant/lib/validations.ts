// ============================================================
// WOOD HOUSE CAFE — ZOD VALIDATION SCHEMAS
// Frontend-only form validation schemas.
// ============================================================

import { z } from "zod";

// ----------------------------------------------------------
// CHECKOUT FORM
// ----------------------------------------------------------

export const checkoutSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    phone: z
      .string()
      .min(7, "Enter a valid phone number")
      .max(20, "Phone number is too long"),
    email: z.string().email("Enter a valid email address"),
    whatsapp: z.string().optional(),
    orderType: z.enum(["delivery", "pickup"]),
    deliveryAddress: z
      .object({
        address: z.string().min(5, "Enter a full delivery address"),
        landmark: z.string().optional(),
        directions: z.string().optional(),
      })
      .optional(),
    generalNote: z.string().max(300, "Note must be under 300 characters").optional(),
    paymentMethod: z.enum([
      "pay-on-delivery",
      "pay-on-pickup",
      "pay-at-restaurant",
    ]),
  })
  .refine(
    (data) => {
      if (data.orderType === "delivery") {
        return data.deliveryAddress?.address && data.deliveryAddress.address.length >= 5;
      }
      return true;
    },
    {
      message: "Delivery address is required for delivery orders",
      path: ["deliveryAddress", "address"],
    }
  );

export type CheckoutSchema = z.infer<typeof checkoutSchema>;

// ----------------------------------------------------------
// RESERVATION FORM
// ----------------------------------------------------------

export const reservationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number is too long"),
  whatsapp: z.string().optional(),
  date: z
    .string()
    .min(1, "Please select a date")
    .refine((date) => {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, "Please select a future date"),
  time: z.string().min(1, "Please select a time"),
  guestCount: z
    .number()
    .min(1, "At least 1 guest is required")
    .max(50, "For groups over 50, please contact us directly"),
  occasion: z.enum([
    "birthday",
    "anniversary",
    "date",
    "business-meeting",
    "family-gathering",
    "other",
    "none",
  ]),
  specialRequests: z
    .string()
    .max(500, "Special requests must be under 500 characters")
    .optional(),
});

export type ReservationSchema = z.infer<typeof reservationSchema>;

// ----------------------------------------------------------
// LOGIN FORM
// ----------------------------------------------------------

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// ----------------------------------------------------------
// SIGN UP FORM
// ----------------------------------------------------------

export const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .min(7, "Enter a valid phone number")
      .max(20, "Phone number is too long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;

// ----------------------------------------------------------
// FORGOT PASSWORD FORM
// ----------------------------------------------------------

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

// ----------------------------------------------------------
// RESET PASSWORD FORM
// ----------------------------------------------------------

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

// ----------------------------------------------------------
// CONTACT FORM
// ----------------------------------------------------------

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  subject: z.enum([
    "reservation",
    "order",
    "feedback",
    "partnership",
    "general-inquiry",
    "other",
  ]),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be under 1000 characters"),
});

export type ContactSchema = z.infer<typeof contactSchema>;

// ----------------------------------------------------------
// NEWSLETTER FORM
// ----------------------------------------------------------

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export type NewsletterSchema = z.infer<typeof newsletterSchema>;

// ----------------------------------------------------------
// ADDRESS FORM
// ----------------------------------------------------------

export const addressSchema = z.object({
  label: z.enum(["Home", "Work", "Other"]),
  address: z.string().min(5, "Enter a full address"),
  landmark: z.string().optional(),
  city: z.string().min(2, "Enter a city"),
  phone: z.string().optional(),
  isDefault: z.boolean(),
});

export type AddressSchema = z.infer<typeof addressSchema>;
