export type Category =
    | "pizza-classic"
    | "pizza-tandoori"
    | "pizza-masala"
    | "pizza-premium"
    | "pizza-classic-range"
    | "pizza-mania"
    | "panini"
    | "pasta"
    | "grills"
    | "burgers"
    | "fries"
    | "garlic-bread"
    | "nachos"
    | "maggi"
    | "coffee"
    | "shakes"
    | "drinks"
    | "desserts";

export interface SizePrice {
    S?: number;
    M?: number;
    L?: number;
    XL?: number;
}

export interface MenuItem {
    id: string;
    name: string;
    category: Category;
    description?: string;
    /** For items with a single price */
    price?: number;
    /** For items with size variants (Pizza, Panini, etc.) */
    sizePrices?: SizePrice;
    badge?: string; // e.g. "Popular", "Special", "Signature"
}

export interface CartItem {
    menuItem: MenuItem;
    qty: number;
    selectedSize?: "S" | "M" | "L" | "XL";
}

export type CartAction =
    | { type: "ADD"; item: CartItem }
    | { type: "REMOVE"; id: string; size?: string }
    | { type: "UPDATE_QTY"; id: string; size?: string; qty: number }
    | { type: "CLEAR" };

export interface CartState {
    items: CartItem[];
}

export interface CategoryMeta {
    id: Category;
    label: string;
    emoji: string;
    anchor: string;
}
