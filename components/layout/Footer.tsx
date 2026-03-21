import { MapPin, Phone, Instagram, Facebook } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-[rgba(200,150,30,0.15)] bg-[#F5F0E8] mt-20">
            <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[rgba(200,150,30,0.15)] border border-[#C8961E] flex items-center justify-center text-base">🍕</div>
                        <span className="text-base font-bold text-[#9A7215]"
                            style={{ fontFamily: "Playfair Display, serif" }}>
                            THE PIZZA ROOM
                        </span>
                    </div>
                    <p className="text-[#8A7A60] text-sm leading-relaxed">
                        Authentic flavours, crafted with love. Dine-in, takeaway &amp; delivery available.
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                        <a href="https://www.instagram.com/thepizzaroomakurdi" target="_blank" rel="noopener noreferrer"
                            className="text-[#8A7A60] hover:text-[#C8961E] transition-colors">
                            <Instagram size={17} />
                        </a>
                        <a href="https://www.facebook.com/thepizzaroomakurdi" target="_blank" rel="noopener noreferrer"
                            className="text-[#8A7A60] hover:text-[#C8961E] transition-colors">
                            <Facebook size={17} />
                        </a>
                    </div>
                </div>

                {/* Location */}
                <div>
                    <h3 className="text-xs font-semibold text-[#3D2E10] mb-3 uppercase tracking-wider">Location</h3>
                    <div className="flex items-start gap-2 text-[#8A7A60] text-sm">
                        <MapPin size={14} className="mt-0.5 text-[#C8961E] shrink-0" />
                        <span className="leading-relaxed">
                            Gurudwara Rd, Gurudwara Colony, Akurdi,
                            Nigdi, Pimpri-Chinchwad, Maharashtra – 411033
                        </span>
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-[#8A7A60] text-sm">
                        <Phone size={13} className="text-[#C8961E] shrink-0" />
                        <a href="tel:9604040501" className="hover:text-[#C8961E] transition-colors">9604040501</a>
                    </div>
                    <p className="text-xs text-[#8A7A60] mt-3">
                        <span className="text-[#C8961E] font-medium">Hours:</span> Open 11 AM daily
                    </p>
                </div>

                {/* Quick order */}
                <div>
                    <h3 className="text-xs font-semibold text-[#3D2E10] mb-3 uppercase tracking-wider">Order Now</h3>
                    <p className="text-[#8A7A60] text-sm mb-4">
                        Add items to your cart and place your order directly via WhatsApp.
                    </p>
                    <a
                        href="https://wa.me/919604040501"
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
              bg-white border border-[rgba(200,150,30,0.35)] text-[#C8961E] text-sm font-medium
              hover:bg-[rgba(200,150,30,0.08)] transition-all duration-200 shadow-sm"
                    >
                        📱 Chat on WhatsApp
                    </a>
                    <p className="text-xs text-[#8A7A60] mt-3">
                        🚚 Home delivery available<br />
                        <span className="text-amber-700 text-[11px]">Order once placed won&apos;t be cancelled</span>
                    </p>
                </div>
            </div>

            <div className="border-t border-[rgba(200,150,30,0.15)] px-4 py-4 text-center">
                <p className="text-xs text-[#8A7A60]">
                    © 2026 The Pizza Room, Akurdi, Pimpri-Chinchwad. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
