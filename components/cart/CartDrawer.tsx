"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { CartItem as CartItemRow } from "@/components/cart/CartItem";
import { ShoppingCart, X, MessageCircle, Trash2 } from "lucide-react";

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
    const { items, totalItems, subtotal, gst, packagingCharges, deliveryCharge, totalPrice, clearCart } = useCart();
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const buildWhatsAppMessage = () => {
        let msg = "*🍕 New Order - The Pizza Room*\n\n";
        msg += "--- *Order Details* ---\n";
        items.forEach((item) => {
            const size = item.selectedSize ? ` (${item.selectedSize})` : "";
            const price =
                item.selectedSize && item.menuItem.sizePrices
                    ? item.menuItem.sizePrices[item.selectedSize] ?? 0
                    : item.menuItem.price ?? 0;
            msg += `• ${item.menuItem.name}${size} x${item.qty} — ₹${price * item.qty}\n`;
        });
        msg += "\n--- *Bill Summary* ---\n";
        msg += `Subtotal: ₹${subtotal}\n`;
        msg += `GST (5%): ₹${gst}\n`;
        msg += `Packaging Charges: ₹${packagingCharges}\n`;
        msg += `Delivery Charges: ${deliveryCharge > 0 ? `₹${deliveryCharge}` : "FREE"}\n`;
        msg += `*Grand Total: ₹${totalPrice}*\n\n`;
        msg += "Please confirm my order. Thank you!";
        return encodeURIComponent(msg);
    };

    return (
        <>
            {open && (
                <div
                    className="overlay-enter fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            <div
                ref={drawerRef}
                className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm flex flex-col
          bg-[#FDFBF7] border-l border-[rgba(200,150,30,0.2)]
          shadow-2xl shadow-black/15
          transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]
          ${open ? "translate-x-0" : "translate-x-full"}`}
                aria-label="Shopping cart"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(200,150,30,0.15)] bg-white">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="text-[#C8961E]" size={19} />
                        <span className="font-semibold text-[#1A1209] text-lg" style={{ fontFamily: "Playfair Display, serif" }}>
                            Your Order
                        </span>
                        {totalItems > 0 && (
                            <span className="ml-1 bg-[#C8961E] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#8A7A60] hover:text-[#1A1209] transition-colors p-1.5 rounded-lg hover:bg-[rgba(0,0,0,0.06)]"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-5 py-3">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                            <ShoppingCart size={52} className="text-[rgba(200,150,30,0.25)]" />
                            <p className="text-[#8A7A60] text-sm">
                                Your cart is empty.<br />Add something delicious!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {items.map((item) => (
                                <CartItemRow key={`${item.menuItem.id}__${item.selectedSize ?? ""}`} item={item} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="px-5 py-4 border-t border-[rgba(200,150,30,0.15)] bg-white space-y-3">
                        <div className="space-y-1.5 border-b border-[rgba(0,0,0,0.05)] pb-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8A7A60]">Subtotal</span>
                                <span className="text-[#1A1209] font-medium">₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-[#8A7A60]">GST (5%)</span>
                                <span className="text-[#1A1209]">₹{gst}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-[#8A7A60]">Packaging Charges</span>
                                <span className="text-[#1A1209]">₹{packagingCharges}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-[#8A7A60]">Delivery Charges</span>
                                <span className={deliveryCharge > 0 ? "text-[#1A1209]" : "text-green-600 font-medium"}>
                                    {deliveryCharge > 0 ? `₹${deliveryCharge}` : "FREE"}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#1A1209] font-semibold">Total Amount</span>
                            <span className="text-[#C8961E] font-bold text-lg">₹{totalPrice}</span>
                        </div>
                        <a
                            href={`https://wa.me/919604940540?text=${buildWhatsAppMessage()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glow-pulse flex items-center justify-center gap-2 w-full py-3 rounded-xl
                bg-[#25D366] hover:bg-[#20c05a] text-white font-semibold
                transition-colors duration-200 text-sm shadow-md shadow-green-200"
                        >
                            <MessageCircle size={17} />
                            Place Order via WhatsApp
                        </a>
                        <button
                            onClick={clearCart}
                            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl
                text-[#8A7A60] hover:text-red-500 hover:bg-red-50
                text-xs transition-colors duration-200"
                        >
                            <Trash2 size={13} />
                            Clear cart
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
