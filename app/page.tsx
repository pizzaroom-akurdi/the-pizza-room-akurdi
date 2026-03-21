import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { MenuSection } from "@/components/menu/MenuSection";
import { HeroCTA } from "@/components/HeroCTA";
import { MENU_ITEMS, CATEGORIES } from "@/data/menu";
import { Category } from "@/types";
import { MapPin, Star, Truck } from "lucide-react";

function getItems(cat: Category) {
  return MENU_ITEMS.filter((i) => i.category === cat);
}

const SECTION_META: Record<Category, { subtitle?: string }> = {
  "pizza-classic": {},
  "pizza-tandoori": {},
  "pizza-masala": {},
  "pizza-premium": { subtitle: "Made with premium topping sauce" },
  "pizza-classic-range": {},
  "pizza-mania": { subtitle: "Square pizzas — XL size only" },
  "panini": {},
  "pasta": { subtitle: "No refined wheat flour used" },
  "grills": {},
  "burgers": {},
  "fries": {},
  "garlic-bread": {},
  "nachos": {},
  "maggi": {},
  "coffee": {},
  "shakes": {},
  "drinks": {},
  "desserts": {},
};

export default function Home() {
  return (
    <>
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(200,150,30,0.12) 0%, transparent 65%), " +
            "linear-gradient(175deg, #FFFDF5 0%, #FBF4E3 45%, #F5EDD4 100%)",
        }}
      >
        {/* Subtle decorative texture */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Radial glow top-left */}
          <div
            className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, rgba(200,150,30,0.25) 0%, transparent 70%)" }}
          />
          {/* Radial glow bottom-right */}
          <div
            className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(200,150,30,0.3) 0%, transparent 70%)" }}
          />
          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage: "radial-gradient(circle, #9A7215 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fade-in-up">
          {/* Rating pill */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full
                          bg-white/70 border border-[rgba(200,150,30,0.35)] shadow-sm mb-6 backdrop-blur-sm
                          whitespace-nowrap">

            <span className="text-xs text-[#9A7215] font-semibold flex items-center gap-1">
              4.6
              <Star size={12} className="fill-[#C8961E] text-[#C8961E]" />
              on Google
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 leading-none text-[#6B4A0A]"
            style={{ fontFamily: "Playfair Display, serif", letterSpacing: "-0.01em" }}
          >
            THE{" "}
            <span className="text-gold-gradient">PIZZA</span>
            {" "}ROOM
          </h1>

          <p className="text-base sm:text-lg text-[#8A7A60] mb-8 max-w-md mx-auto leading-relaxed">
            Authentic pizza, pasta &amp; more —{" "}
            <span className="text-[#C8961E] font-semibold">crafted fresh</span> in Akurdi, Pimpri-Chinchwad.
          </p>

          {/* CTA */}
          <HeroCTA />

          {/* Free Delivery Promo Pill */}
          <div className="mt-8 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full
            bg-white/70 border border-[rgba(200,150,30,0.35)] shadow-sm backdrop-blur-sm">
            <Truck size={13} className="text-[#C8961E]" />
            <span className="text-xs text-[#9A7215] font-semibold">Free delivery on orders above ₹299</span>
          </div>

          {/* Address chip */}
          <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-[#8A7A60]">
            <MapPin size={12} className="text-[#C8961E]" />
            Akurdi, Nigdi, Pimpri-Chinchwad · Open 11 AM daily
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#C8961E] opacity-50">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-6 bg-gradient-to-b from-[#C8961E] to-transparent" />
        </div>
      </section>

      {/* ── Category tabs ─────────────────────────────────────────────────── */}
      <CategoryTabs />

      {/* ── Menu sections ─────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {CATEGORIES.map((cat) => (
          <MenuSection
            key={cat.id}
            id={cat.anchor}
            title={cat.label}
            emoji={cat.emoji}
            items={getItems(cat.id)}
            subtitle={SECTION_META[cat.id].subtitle}
          />
        ))}
      </main>

      <Footer />
    </>
  );
}
