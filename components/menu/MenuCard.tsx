"use client";

import { useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { Plus, Check } from "lucide-react";

// ── Per-item image map (keyed by item.id) ─────────────────────────────────
// Items not listed here fall back to CATEGORY_FALLBACK below.
const ITEM_IMAGES: Record<string, string> = {
    // ── Classic Pizzas ──────────────────────────────────────────────────────
    "cl-margherita": "/images/margrita_pizza.jpeg",
    "cl-golden-paneer": "/images/golden_paneer_pizza.jpeg",
    "cl-mexican-mafia": "/images/blank.jpeg",
    "cl-family-jewels": "/images/family_jewels_pizza.jpeg",
    "cl-veg-deluxe": "/images/veg_delux_pizza.jpeg",
    "cl-ratatouille": "/images/ratatouille_pizza.jpeg",
    "cl-al-fungi": "/images/pizza_al_fungi.jpeg",
    "cl-double-cheese-margherita": "/images/blank.jpeg",

    // ── Tandoori Pizzas ─────────────────────────────────────────────────────
    "td-mushroom": "/images/mushroom_tandoori_pizza.jpeg",
    "td-paneer": "/images/paneer_tandoori_pizza.jpeg",
    "td-paneer-mushroom": "/images/paneer_mashroom_tandoori_pizza.jpeg",
    "td-mix": "/images/blank.jpeg",

    // ── Premium Pizzas ──────────────────────────────────────────────────────
    "pp-italian": "/images/italian_pizza.jpeg",
    "pp-chilly-garlic": "/images/chilli_garlic_pizza.jpeg",
    "pp-peppy-paneer": "/images/blank.jpeg",
    "pp-mangolian-paneer": "/images/mangolian_paneer_pizza.jpeg",
    "pp-spicy-chilli-paneer": "/images/spicy_chilli_paneer_pizza.jpeg",
    "pp-4-cheese": "/images/four_cheese_pizza.jpeg",
    "pp-az-18inch": "/images/blank.jpeg",
    "pp-room-special-18": "/images/blank.jpeg",

    // ── Classic Pizza Range ─────────────────────────────────────────────────
    "cr-classic": "/images/classic_pizza.jpeg",
    "cr-chocolate": "/images/blank.jpeg",
    "cr-paneer": "/images/blank.jpeg",
    "cr-paneer-mushroom": "/images/blank.jpeg",

    // ── Pizza Mania – Square Pizzas (all share the same photo) ──────────────
    "pm-veg-square": "/images/blank.jpeg",
    "pm-mushroom-square": "/images/blank.jpeg",
    "pm-paneer-square": "/images/paneer_sqare_pizza.jpeg",
    "pm-paneer-mushroom-square": "/images/blank.jpeg",

    // ── Panini Sandwiches ────────────────────────────────────────────────────
    "pn-chocolate": "/images/blank.jpeg",
    "pn-masala-cheese": "/images/blank.jpeg",
    "pn-cheese-chilli": "/images/maxican_pinani.jpeg",
    "pn-mexican": "/images/maxican_pinani.jpeg",
    "pn-garlic-cheese": "/images/blank.jpeg",
    "pn-creamy-cheese": "/images/creamy_cheese_pinani.jpeg",
    "pn-mangolian-cheese": "/images/mangolian_cheese_pinani.jpeg",

    // ── Penne Pasta ─────────────────────────────────────────────────────────
    "pa-red-sauce": "/images/red_souce_pasta.jpeg",
    "pa-mangolian-red": "/images/mangolian_red_sauce_pasta.jpeg",
    "pa-spicy-masala": "/images/blank.jpeg",
    "pa-baked-cheese": "/images/baked_cheese_pasta.jpeg",
    "pa-italian": "/images/blank.jpeg",
    "pa-creamy-cheese": "/images/creamy_cheese_pasta.jpeg",

    // ── Grills & Sandwiches ──────────────────────────────────────────────────
    "gr-american-corn": "/images/american_corn_grilled.jpeg",
    "gr-masala-cheese": "/images/blank.jpeg",
    "gr-veg-cheese": "/images/veg_cheese_grilled_sandwitch.jpeg",
    "gr-cheese-chilli": "/images/blank.jpeg",
    "gr-melting-cheese": "/images/veg_cheese_grilled_sandwitch.jpeg",
    "gr-pahadi-cheese": "/images/pahadi_cheese_grilled.jpeg",
    "gr-pahadi-paneer": "/images/blank.jpeg",
    "gr-schezwan-cheese": "/images/schezwan_cheese-grilled.jpeg",
    "gr-veg-cheese-paneer": "/images/veg_cheese_paneer_grilled.jpeg",
    "gr-cheese-chilli-paneer": "/images/blank.jpeg",
    "gr-masala-paneer": "/images/blank.jpeg",
    "gr-room-special": "/images/blank.jpeg",

    // ── Burgers ──────────────────────────────────────────────────────────────
    "bu-veg-delite": "/images/veg_delight_buger.jpeg",
    "bu-spicy": "/images/blank.jpeg",
    "bu-double-cheese": "/images/double_cheese_burger.jpeg",
    "bu-paneer-cheese": "/images/blank.jpeg",
    "bu-coated-cheese": "/images/blank.jpeg",
    "bu-melting-cheese": "/images/blank.jpeg",
    "bu-mexican-cheese": "/images/blank.jpeg",
    "bu-cheese-burst": "/images/blank.jpeg",

    // ── Fries ────────────────────────────────────────────────────────────────
    "fr-plain": "/images/plain_fries.jpeg",
    "fr-peri-peri": "/images/peri_peri_fries.jpeg",
    "fr-cheese-peri-peri": "/images/blank.jpeg",
    "fr-melting-cheese-peri-peri": "/images/blank.jpeg",
    "fr-mayo-peri-peri": "/images/blank.jpeg",

    // ── Garlic Bread ─────────────────────────────────────────────────────────
    "gb-plain": "/images/garlic_bread.jpeg",
    "gb-cheese": "/images/cheese_garlic_bread.jpeg",
    "gb-paneer-cheese": "/images/blank.jpeg",
    "gb-mayo-cheese": "/images/blank.jpeg",
    "gb-cheese-corn": "/images/blank.jpeg",
    "gb-stuf": "/images/stuffed_garlic_bread.jpeg",

    // Coffee / Shakes / Drinks / Desserts – all use category fallback images
};

// ── Category fallback images ───────────────────────────────────────────────
// (Removed as per request to not render fallback images)


/**
 * Tiny warm-beige blur placeholder (10×10 px, base64 JPEG, ~200 bytes).
 * Shown instantly while the real image loads — keeps the card from jumping.
 */
const BLUR_PLACEHOLDER =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKD" +
    "BQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJ" +
    "CQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMj" +
    "IyMjIyMjL/wAARCAAKABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIhAAAgIB" +
    "BAMBAAAAAAAAAAAAAQIDBAUREiExQf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAA" +
    "AAAAAAAAAAAP/aAAwDAQACEQMRAD8Amcd1nMs5YrYrsbFq2R05Hf3b+CxWaFBRoUFlBZoMGKzEsV" +
    "b5LEE7Rkr/AOR7P//Z";

interface MenuCardProps {
    item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
    const { addItem } = useCart();
    const hasSizes = !!item.sizePrices;
    const sizes = item.sizePrices ? (Object.keys(item.sizePrices) as ("S" | "M" | "L" | "XL")[]) : [];
    const defaultSize = sizes.includes("M") ? "M" : sizes.includes("L") ? "L" : sizes[0];
    const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L" | "XL" | undefined>(
        hasSizes ? defaultSize : undefined
    );
    const [added, setAdded] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const displayPrice =
        hasSizes && selectedSize && item.sizePrices
            ? (item.sizePrices as Record<string, number>)[selectedSize]
            : item.price;

    const imgSrc = ITEM_IMAGES[item.id];

    const handleAdd = () => {
        addItem(item, selectedSize as "M" | "L" | "XL" | undefined);
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    };

    return (
        <div className="menu-card relative flex flex-col bg-white border border-[rgba(200,150,30,0.15)]
      rounded-2xl overflow-hidden h-full">

            {/* Food image — lazy loaded, blur placeholder prevents layout shift */}
            {imgSrc ? (
                <div className="relative w-full h-40 overflow-hidden bg-[#F5F0E8] shrink-0">
                    <Image
                        src={imgSrc}
                        alt={item.name}
                        fill
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={BLUR_PLACEHOLDER}
                        sizes="(max-width: 360px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.badge && (
                        <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold
                uppercase tracking-wider bg-[#C8961E] text-white shadow-sm">
                            {item.badge}
                        </span>
                    )}
                </div>
            ) : item.badge && (
                <div className="pt-3 px-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold
              uppercase tracking-wider bg-[#C8961E] text-white shadow-sm">
                        {item.badge}
                    </span>
                </div>
            )}

            {/* Content */}
            <div className="flex-1 p-3 flex flex-col gap-1.5">
                <h3 className="text-sm font-semibold text-[#1A1209] leading-snug"
                    style={{ fontFamily: "Playfair Display, serif" }}>
                    {item.name}
                </h3>
                {item.description && (
                    <div>
                        <p
                            className={`text-xs text-[#8A7A60] leading-relaxed ${expanded ? "" : "line-clamp-2"
                                }`}
                        >
                            {item.description}
                        </p>

                        {item.description.length > 45 && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="text-[11px] text-[#C8961E] font-medium mt-0.5"
                            >
                                {expanded ? "Show Less" : "Show More"}
                            </button>
                        )}
                    </div>
                )}

                {/* Size selector */}
                {hasSizes && sizes.length > 0 && (
                    <div className="flex gap-1.5 mt-0.5 flex-wrap">
                        {sizes.map((sz) => (
                            <button
                                key={sz}
                                onClick={() => setSelectedSize(sz)}
                                className={`px-2.5 py-0.5 rounded-lg text-xs font-medium border transition-all duration-150
                  ${selectedSize === sz
                                        ? "bg-[#C8961E] border-[#C8961E] text-white"
                                        : "border-[rgba(200,150,30,0.4)] text-[#8A7A60] hover:border-[#C8961E] hover:text-[#C8961E]"
                                    }`}
                            >
                                {sz}
                            </button>
                        ))}
                    </div>
                )}

                {/* Price + Add */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-[rgba(0,0,0,0.05)]">
                    <div className="flex items-baseline gap-1">
                        <span className="text-base font-bold text-[#C8961E]">
                            ₹{displayPrice ?? "—"}
                        </span>
                        <span className="text-[10px] text-[#8A7A60]">
                            +5% GST
                        </span>
                    </div>
                    <button
                        id={`add-${item.id}${selectedSize ? `-${selectedSize}` : ""}`}
                        onClick={handleAdd}
                        disabled={added}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold
              border transition-all duration-200
              ${added
                                ? "bg-green-50 border-green-400 text-green-600"
                                : "bg-[#C8961E] border-[#C8961E] text-white hover:bg-[#9A7215] hover:border-[#9A7215]"
                            }`}
                        aria-label={`Add ${item.name} to cart`}
                    >
                        {added ? (<><Check size={12} /> Added</>) : (<><Plus size={12} /> Add</>)}
                    </button>
                </div>
            </div>
        </div>
    );
}
