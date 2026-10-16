import { createClient } from "@/lib/supabase/client";
import type { MenuItem } from "@/types";

interface MenuRow {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuItem["category"];
  image: string | null;
  image_label: string;
  available: boolean;
  featured: boolean;
  tags: string[];
  preparation_time: number | null;
}

// Use the cafe's own available dish photos only for the items they clearly show.
const WOODHOUSE_MENU_PHOTOS: Record<string, string> = {
  "English Breakfast": "/images/WOOD HOUSE CAFE ENGLISH BREAKFAST PLATE.png",
  "Complete English Breakfast": "/images/WOOD HOUSE CAFE ENGLISH BREAKFAST PLATE.png",
  "House Burger": "/images/WOOD HOUSE CAFE BURGER.png",
};

export function mapMenuRow(row: MenuRow): MenuItem {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    category: row.category,
    image: row.image || WOODHOUSE_MENU_PHOTOS[row.name] || undefined,
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
    .select("id,name,description,price,category,image,image_label,available,featured,tags,preparation_time")
    .eq("is_active", true)
    .order("category")
    .order("name");

  if (error) throw error;
  return (data as MenuRow[]).map(mapMenuRow);
}
