import { createClient } from "@/lib/supabase/client";
import type { MenuItem } from "@/types";

interface MenuRow {
  id: string;
  name: string;
  description: string;
  price: number;
  price_secondary: number | null;
  price_display: string | null;
  category: MenuItem["category"];
  image: string | null;
  image_label: string;
  available: boolean;
  featured: boolean;
  tags: string[];
  preparation_time: number | null;
}

export function mapMenuRow(row: MenuRow): MenuItem {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    priceSecondary: row.price_secondary ?? undefined,
    priceDisplay: row.price_display ?? undefined,
    category: row.category,
    image: row.image || undefined,
    imageLabel: row.image_label,
    available: row.available,
    featured: row.featured,
    tags: row.tags,
    preparationTime: row.preparation_time || undefined,
  };
}

export async function fetchMenuItems() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select("id,name,description,price,price_secondary,price_display,category,image,image_label,available,featured,tags,preparation_time")
    .eq("is_active", true)
    .order("category")
    .order("name");

  if (error) throw error;
  return (data as MenuRow[]).map(mapMenuRow);
}
