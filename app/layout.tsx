import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import { CartProvider } from "@/lib/CartContext";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import PageLoader from "@/components/ui/PageLoader";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DRIFT — Wear the Moment",
  description: "High-end minimal fashion for the modern mover.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="antialiased selection:bg-[#C4622D] selection:text-white">
        <CartProvider>
          <PageLoader />
          <CustomCursor />
          <ScrollProgressBar />
          <SmoothScroll>
            <Nav />
            <main>{children}</main>
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
