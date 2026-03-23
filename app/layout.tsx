import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "The Pizza Room — Order Online | Akurdi, Pune",
  description:
    "Order pizza, pasta, garlic bread, shakes and more from The Pizza Room in Akurdi, Pune. Home delivery via WhatsApp. Call 9604040501.",
  keywords: ["pizza", "pizza room", "Akurdi", "pune", "order pizza online", "pasta", "garlic bread"],
  openGraph: {
    title: "The Pizza Room",
    description: "Authentic pizza & more — Akurdi, Pune",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
