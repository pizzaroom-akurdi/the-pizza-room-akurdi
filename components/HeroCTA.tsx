"use client";

export function HeroCTA() {
    const scrollToMenu = () => {
        const el = document.getElementById("pizza-classic");
        if (el) {
            window.scrollTo({
                top: el.getBoundingClientRect().top + window.scrollY - 100,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
                onClick={scrollToMenu}
                className="px-8 py-3 rounded-xl bg-[#C8961E] text-white font-bold text-sm
          hover:bg-[#9A7215] transition-colors duration-200
          shadow-lg shadow-[rgba(200,150,30,0.35)]"
            >
                Browse Menu
            </button>
            <a
                href="tel:9604940540"
                className="flex items-center gap-2 px-6 py-3 rounded-xl
          border-2 border-[#C8961E] text-[#C8961E] text-sm font-semibold
          hover:bg-[rgba(200,150,30,0.1)] transition-colors duration-200 bg-white/60"
            >
                📞 9604940540
            </a>
        </div>
    );
}
