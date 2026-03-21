"use client";

import { MenuItem } from "@/types";
import { MenuCard } from "./MenuCard";
import { useSectionVisible } from "@/hooks/useSectionVisible";

interface MenuSectionProps {
    id: string;
    title: string;
    emoji: string;
    items: MenuItem[];
    subtitle?: string;
}

/** Number of skeleton cards to show while section is off-screen.
 *  Matches the actual item count so layout height stays stable. */
function SectionSkeleton({ count }: { count: number }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-2xl overflow-hidden border border-[rgba(200,150,30,0.1)] bg-white"
                    aria-hidden="true"
                >
                    {/* Image placeholder */}
                    <div className="w-full h-40 bg-[#F5EDD4] animate-pulse" />
                    {/* Text lines placeholder */}
                    <div className="p-3 flex flex-col gap-2">
                        <div className="h-3 w-3/4 rounded bg-[#EDE4CC] animate-pulse" />
                        <div className="h-2.5 w-1/2 rounded bg-[#EDE4CC] animate-pulse" />
                        <div className="h-7 w-full rounded-xl bg-[#EDE4CC] animate-pulse mt-1" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function MenuSection({ id, title, emoji, items, subtitle }: MenuSectionProps) {
    const { ref, visible } = useSectionVisible("200px 0px");

    return (
        <section
            id={id}
            className="scroll-mt-28"
            ref={ref}
        >
            {/* Section header — always visible so sticky tab highlights work */}
            <div className="flex items-end gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(200,150,30,0.1)] border border-[rgba(200,150,30,0.2)] flex items-center justify-center text-xl">
                        {emoji}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#1A1209]"
                            style={{ fontFamily: "Playfair Display, serif" }}>
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-xs text-[#8A7A60] mt-0.5 italic">{subtitle}</p>
                        )}
                    </div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-[rgba(200,150,30,0.3)] to-transparent mb-1.5" />
            </div>

            {/* Cards — lazy-mounted; skeleton holds the layout space until ready */}
            {visible ? (
                <div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4
                               animate-fade-in"
                >
                    {items.map((item) => (
                        <MenuCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <SectionSkeleton count={items.length} />
            )}
        </section>
    );
}
