import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "./(root)/context/Context";
import "./globals.scss";
import NavBar from "./(root)/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Alwaki Store",
  description: "Store for Alwaki products",
  image: "/icon-48x48.png",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CartProvider>{children}
          <NavBar />
        </CartProvider>

      </body>
    </html>
  );
}
