import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";
import { ViewportHeightHandler } from "@/components/ViewportHeightHandler";
import { getSiteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme = createTheme({
  primaryColor: "orange",
  defaultRadius: "sm",
  colors: {
    dark: [
      "#faf3e7",
      "#f5e6d3",
      "#e8c9a0",
      "#d4a574",
      "#8b5e3c",
      "#6b4423",
      "#4a2f18",
      "#3d1f0f",
      "#2c1810",
      "#1a0e08",
    ],
  },
  other: {
    bodyBg: "#f5e6d3",
  },
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: "Jonas' Bachelor Website",
  description: "Jonas' Bachelor Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ background: "#f5e6d3" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: "#f5e6d3", minHeight: "100vh", color: "#2c1810" }}
      >
        <ViewportHeightHandler />
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
