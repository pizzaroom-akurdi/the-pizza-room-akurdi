"use client";

import React, {
    createContext,
    useContext,
    useReducer,
    useCallback,
} from "react";
import { CartItem, CartState, CartAction, MenuItem } from "@/types";

// ── Reducer ───────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD": {
            const key = cartKey(action.item.menuItem.id, action.item.selectedSize);
            const existing = state.items.find(
                (i) => cartKey(i.menuItem.id, i.selectedSize) === key
            );
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        cartKey(i.menuItem.id, i.selectedSize) === key
                            ? { ...i, qty: i.qty + action.item.qty }
                            : i
                    ),
                };
            }
            return { items: [...state.items, action.item] };
        }
        case "REMOVE": {
            const key = cartKey(action.id, action.size);
            return {
                items: state.items.filter(
                    (i) => cartKey(i.menuItem.id, i.selectedSize) !== key
                ),
            };
        }
        case "UPDATE_QTY": {
            const key = cartKey(action.id, action.size);
            if (action.qty <= 0) {
                return {
                    items: state.items.filter(
                        (i) => cartKey(i.menuItem.id, i.selectedSize) !== key
                    ),
                };
            }
            return {
                items: state.items.map((i) =>
                    cartKey(i.menuItem.id, i.selectedSize) === key
                        ? { ...i, qty: action.qty }
                        : i
                ),
            };
        }
        case "CLEAR":
            return { items: [] };
        default:
            return state;
    }
}

function cartKey(id: string, size?: string) {
    return size ? `${id}__${size}` : id;
}

// ── Context ──────────────────────────────────────────────────────────────

interface CartContextValue {
    items: CartItem[];
    totalItems: number;
    subtotal: number;
    gst: number;
    packagingCharges: number;
    deliveryCharge: number;
    totalPrice: number;
    addItem: (menuItem: MenuItem, selectedSize?: "S" | "M" | "L" | "XL") => void;
    removeItem: (id: string, size?: string) => void;
    updateQty: (id: string, qty: number, size?: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    const addItem = useCallback(
        (menuItem: MenuItem, selectedSize?: "S" | "M" | "L" | "XL") => {
            dispatch({
                type: "ADD",
                item: { menuItem, qty: 1, selectedSize },
            });
        },
        []
    );

    const removeItem = useCallback((id: string, size?: string) => {
        dispatch({ type: "REMOVE", id, size });
    }, []);

    const updateQty = useCallback((id: string, qty: number, size?: string) => {
        dispatch({ type: "UPDATE_QTY", id, size, qty });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: "CLEAR" });
    }, []);

    const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = state.items.reduce((sum, i) => {
        const price =
            i.selectedSize && i.menuItem.sizePrices
                ? (i.menuItem.sizePrices[i.selectedSize] ?? 0)
                : (i.menuItem.price ?? 0);
        return sum + price * i.qty;
    }, 0);

    const gst = Math.round(subtotal * 0.05 * 100) / 100;
    const packagingCharges = subtotal > 0 ? 5 : 0;
    const amountBeforeDelivery = Math.round((subtotal + gst + packagingCharges) * 100) / 100;
    const deliveryCharge = (subtotal > 0 && amountBeforeDelivery <= 280) ? 20 : 0;
    const totalPrice = Math.round((amountBeforeDelivery + deliveryCharge) * 100) / 100;

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                totalItems,
                subtotal,
                gst,
                packagingCharges,
                deliveryCharge,
                totalPrice,
                addItem,
                removeItem,
                updateQty,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextValue {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
