"use client";

import { useCart } from "@/context/CartContext";
import { CartItem as CartItemType } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQty } = useCart();
    const { menuItem, qty, selectedSize } = item;

    const price =
        selectedSize && menuItem.sizePrices
            ? (menuItem.sizePrices[selectedSize] ?? 0)
            : (menuItem.price ?? 0);

    return (
        <div className="flex items-start gap-3 py-3 border-b border-[rgba(0,0,0,0.06)] last:border-0">
            <div className="flex-1 min-w-0">
                <p className="text-sm text-[#1A1209] font-medium leading-tight truncate">
                    {menuItem.name}
                </p>
                {selectedSize && (
                    <span className="text-xs text-[#C8961E] mt-0.5 inline-block">Size: {selectedSize}</span>
                )}
                <p className="text-xs text-[#8A7A60] mt-0.5">₹{price} each</p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
                <button
                    onClick={() => updateQty(menuItem.id, qty - 1, selectedSize)}
                    className="w-6 h-6 rounded-full flex items-center justify-center
            border border-[rgba(200,150,30,0.4)] text-[#C8961E]
            hover:bg-[rgba(200,150,30,0.12)] transition-colors"
                >
                    {qty === 1 ? <Trash2 size={11} /> : <Minus size={11} />}
                </button>
                <span className="w-5 text-center text-sm font-semibold text-[#1A1209]">{qty}</span>
                <button
                    onClick={() => updateQty(menuItem.id, qty + 1, selectedSize)}
                    className="w-6 h-6 rounded-full flex items-center justify-center
            border border-[rgba(200,150,30,0.4)] text-[#C8961E]
            hover:bg-[rgba(200,150,30,0.12)] transition-colors"
                >
                    <Plus size={11} />
                </button>
            </div>

            <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-[#C8961E]">₹{price * qty}</p>
            </div>
        </div>
    );
}
