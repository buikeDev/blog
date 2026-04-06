import React from "react";
import Navbar from "../components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../components/footer/Footer";
import { ThemeContextProvider } from "../context/ThemeContext";
import ThemeProvider from "../providers/ThemeProvider";
import AuthProvider from "../providers/AuthProvider";
import PropTypes from "prop-types";
import Script from "next/script";
import SideAds from "../components/ads/SideAds";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App – Stories & Insights",
  description:
    "A modern blog sharing stories, insights, and perspectives that matter. Explore articles on tech, travel, culture, and more.",
  icons: {
    icon: "/nemeblog.ico",
    shortcut: "/nemeblog.ico",
    apple: "/nemeblog.ico",
  },
  openGraph: {
    title: "Blog App – Stories & Insights",
    description:
      "A modern blog sharing stories, insights, and perspectives that matter. Explore articles on tech, travel, culture, and more.",
    url: "https://blog-t9vn.vercel.app/",
    siteName: "Blog App",
    images: [
      {
        url: "/nemeblog.ico",
        width: 1200,
        height: 630,
        alt: "Blog App Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog App – Stories & Insights",
    description:
      "A modern blog sharing stories, insights, and perspectives that matter. Explore articles on tech, travel, culture, and more.",
    site: "https://x.com/bkem_der_brainy?s=21", // update when you have a Twitter handle
    images: [
      {
        url: "/nemeblog.ico",
        alt: "Blog App Logo",
      },
    ],
  },
  metadataBase: new URL("https://blog-t9vn.vercel.app/"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      {process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      )}
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <SideAds
                  leftSlot={process.env.NEXT_PUBLIC_ADSENSE_LEFT_SLOT || ""}
                  rightSlot={process.env.NEXT_PUBLIC_ADSENSE_RIGHT_SLOT || ""}
                />
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
