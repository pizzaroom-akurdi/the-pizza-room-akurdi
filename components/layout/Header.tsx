"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ShoppingCart, Menu, X } from "lucide-react";
import { CATEGORIES } from "@/data/menu";

export function Header() {
    const { totalItems } = useCart();
    const [cartOpen, setCartOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollTo = (anchor: string) => {
        setMobileMenuOpen(false);
        const el = document.getElementById(anchor);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-30 border-b border-[rgba(200,150,30,0.18)]"
                style={{ background: "rgba(253,251,247,0.97)", backdropFilter: "blur(14px)" }}
            >
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="flex items-center gap-2.5 shrink-0">
                        <div className="w-9 h-9 rounded-full border-2 border-[#C8961E] flex items-center justify-center bg-[rgba(200,150,30,0.1)]">
                            <span className="text-lg">🍕</span>
                        </div>
                        <div className="leading-none">
                            <span className="block text-sm font-bold text-[#9A7215]"
                                style={{ fontFamily: "Playfair Display, serif", letterSpacing: "0.05em" }}>
                                THE PIZZA ROOM
                            </span>
                            <span className="block text-[10px] text-[#8A7A60] tracking-widest uppercase">Akurdi, Pune</span>
                        </div>
                    </a>


                    {/* Right */}
                    <div className="flex items-center gap-2">
                        <button
                            id="cart-button"
                            onClick={() => setCartOpen(true)}
                            className="relative flex items-center gap-2 px-3 py-2 rounded-xl
                border border-[rgba(200,150,30,0.4)] text-[#C8961E] bg-[rgba(200,150,30,0.07)]
                hover:bg-[rgba(200,150,30,0.15)] transition-all duration-200"
                            aria-label="Open cart"
                        >
                            <ShoppingCart size={17} />
                            <span className="hidden sm:inline text-sm font-medium">Cart</span>
                            {totalItems > 0 && (
                                <span className="badge-pop absolute -top-2 -right-2 bg-[#C8961E] text-white
                  text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <button
                            className="md:hidden p-2 text-[#8A7A60] hover:text-[#1A1209]"
                            onClick={() => setMobileMenuOpen((o) => !o)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-[rgba(200,150,30,0.15)] bg-[#FDFBF7] px-4 py-3 grid grid-cols-2 gap-1">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => scrollTo(cat.anchor)}
                                className="text-left text-sm px-3 py-2 text-[#8A7A60] hover:text-[#C8961E] hover:bg-[rgba(200,150,30,0.07)] rounded-lg transition-colors"
                            >
                                {cat.emoji} {cat.label}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}
