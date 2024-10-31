import "./globals.css";
import StoreProvider from "../lib/StoreProvider";

import { Inter as FontSans } from "next/font/google"
import Script from 'next/script';

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/app/components/theme-provider"

import { Toaster } from "@/components/ui/sonner"
 
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Benchmarking",
  description: "Visualising data.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script> */}
      {/* <Script
    src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"
    strategy="beforeInteractive"
  /> */}
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
