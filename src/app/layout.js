import { Cookie, Alumni_Sans_Pinstripe } from "next/font/google";

import "./globals.css";

import Header from "../components/Header.js";

// Fonts:
const headingFont = Cookie({
  weight: ["400"],
  variable: "--font-heading",
});
const naviFont = Alumni_Sans_Pinstripe({
  weight: ["400"],
  variable: "--font-navi",
});

//  Main component
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${naviFont.variable}`}>
      <body>
        <Header />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
