import "@/lib/cron";
import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Header from "./components/header";
import Footer from "./components/Footer";
import ConditionalLayout from "./components/ConditionalLayout";
import { SessionProvider } from "next-auth/react";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MyBirBilling – Paragliding in Bir Billing",
  description:
    "Experience certified paragliding adventures in Bir Billing, Himachal Pradesh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          referrerPolicy="no-referrer"
        />
      </head>

      <body className={poppins.className}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        

      </body>
    </html>
  );
}
