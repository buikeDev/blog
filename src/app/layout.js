import React from "react";
import Navbar from "../components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../components/footer/Footer";
import { ThemeContextProvider } from "../context/ThemeContext";
import ThemeProvider from "../providers/ThemeProvider";
import AuthProvider from "../providers/AuthProvider";
import PropTypes from "prop-types";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App – Stories & Insights",
  description:
    "A modern blog sharing stories, insights, and perspectives that matter. Explore articles on tech, travel, culture, and more.",
  openGraph: {
    title: "Blog App – Stories & Insights",
    description:
      "A modern blog sharing stories, insights, and perspectives that matter. Explore articles on tech, travel, culture, and more.",
    url: "https://blog-t9vn.vercel.app/",
    siteName: "Blog App",
    images: [
      {
        url: "/favicon.ico", // fallback, update when you have a social image
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
    site: "@yourtwitter", // update when you have a Twitter handle
    images: [
      {
        url: "/favicon.ico",
        alt: "Blog App Logo",
      },
    ],
  },
  metadataBase: new URL("https://blog-t9vn.vercel.app/"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
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
