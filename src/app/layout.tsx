import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "VANAE | The Art of Rooted Living | 3 & 4 BHK Luxury Residences in Kollur, Hyderabad",
  description:
    "Planted in the rapidly evolving landscape of Kollur, by ORR Exit 2, Hyderabad. Vanae is a unique residential marvel 36 floors high across 6 towers with 11-foot-high ceilings, 1,00,000 sqft clubhouse, and over 50 curated lifestyle amenities.",
  keywords: [
    "VANAE",
    "VANAE Residences",
    "Kollur Luxury Apartments",
    "ORR Exit 2 Hyderabad",
    "3 BHK Flats Kollur",
    "4 BHK Flats Kollur",
    "Luxury Residences Hyderabad",
    "The Art of Rooted Living",
  ],
  openGraph: {
    title: "VANAE | The Art of Rooted Living | 3 & 4 BHK Residences in Kollur",
    description:
      "A new skyline is taking root. Planted in Kollur by ORR Exit 2. 36 floors, 6 towers, 11-foot-high ceilings, and 1,00,000 sqft clubhouse.",
    images: ["/assets/vanae-logo.jpg"],
  },
  icons: {
    icon: "/assets/vanae-logo.jpg",
    shortcut: "/assets/vanae-logo.jpg",
    apple: "/assets/vanae-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0f0708] text-white selection:bg-gold selection:text-black">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
