import { Bebas_Neue, Playfair_Display, Inter } from "next/font/google";

export const bachBebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bach-bebas",
});

export const bachPlayfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-bach-playfair",
});

export const bachInter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-bach-inter",
});

export const bachFontClass = `${bachBebas.variable} ${bachPlayfair.variable} ${bachInter.variable}`;
