"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns `true` once the attached `ref` element has entered (or is near)
 * the viewport.  Once true it never goes back to false — so rendered cards
 * stay in the DOM and don't flicker.
 *
 * @param rootMargin  Pre-load distance. Default "200px" starts rendering the
 *                    section ~200 px before it scrolls into view, so there is
 *                    no visible pop-in on normal scroll speeds.
 */
export function useSectionVisible(rootMargin = "200px 0px") {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // If IntersectionObserver is unavailable (very old browser) just show everything.
        if (typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect(); // one-shot — no need to keep watching
                }
            },
            { rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin]);

    return { ref, visible };
}
