"use client";

import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/data/menu";
import { Category } from "@/types";

export function CategoryTabs() {
    const [active, setActive] = useState<Category>("pizza-classic");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        CATEGORIES.forEach(({ id, anchor }) => {
            const el = document.getElementById(anchor);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(id); },
                { rootMargin: "-40% 0px -50% 0px" }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const scrollTo = (anchor: string, id: Category) => {
        setActive(id);
        const el = document.getElementById(anchor);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    useEffect(() => {
        const container = scrollRef.current;
        const activeBtn = container?.querySelector<HTMLElement>(".cat-tab.active");
        if (!activeBtn || !container) return;
        const offset =
            activeBtn.getBoundingClientRect().left -
            container.getBoundingClientRect().left -
            container.clientWidth / 2 +
            activeBtn.clientWidth / 2;
        container.scrollBy({ left: offset, behavior: "smooth" });
    }, [active]);

    return (
        <div
            className="sticky top-16 z-20 border-b border-[rgba(200,150,30,0.15)]"
            style={{ background: "rgba(253,251,247,0.97)", backdropFilter: "blur(12px)" }}
        >
            <div
                ref={scrollRef}
                className="max-w-6xl mx-auto px-4 flex items-center gap-0.5 overflow-x-auto no-scrollbar py-1.5"
            >
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => scrollTo(cat.anchor, cat.id)}
                        className={`cat-tab flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium
              whitespace-nowrap transition-all duration-200
              ${active === cat.id
                                ? "active text-[#C8961E] bg-[rgba(200,150,30,0.1)] font-semibold"
                                : "text-[#8A7A60] hover:text-[#1A1209] hover:bg-[rgba(0,0,0,0.04)]"
                            }`}
                    >
                        <span>{cat.emoji}</span>
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
