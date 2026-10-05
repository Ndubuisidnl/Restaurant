import { MapPin, Clock, Phone, Truck, UtensilsCrossed, Wifi } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/data/demo";

// ============================================================
// QUICK INFO BAR
// ============================================================

const INFO_ITEMS = [
  {
    icon: Clock,
    label: "Hours",
    value: BUSINESS_INFO.openingHours.display,
  },
  {
    icon: MapPin,
    label: "Location",
    value: `${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: BUSINESS_INFO.phone,
    href: `tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Truck,
    label: "Delivery",
    value: "Available",
  },
  {
    icon: UtensilsCrossed,
    label: "Dine In",
    value: "Reservations Open",
  },
  {
    icon: Wifi,
    label: "Amenities",
    value: "Wi-Fi • Games • Books",
  },
];

export default function QuickInfoBar() {
  return (
    <section
      className="bg-[#3B1A08] py-4"
      aria-label="Quick information"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {INFO_ITEMS.map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-sm"
            >
              <Icon className="w-4 h-4 text-[#C8873F] flex-shrink-0" aria-hidden="true" />
              <span className="text-white/50 hidden sm:inline">{label}:</span>
              {href ? (
                <a
                  href={href}
                  className="text-white/80 hover:text-[#C8873F] transition-colors whitespace-nowrap"
                >
                  {value}
                </a>
              ) : (
                <span className="text-white/80 whitespace-nowrap">{value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
