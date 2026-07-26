import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import SmoothScroll from "@/components/ui/SmoothScroll";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Airbnb | Escape to Places You'll Never Forget",
  description: "Breathtaking cliffside ocean villas, cozy pine-forest A-frames, and romantic stargazing eco glass homes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased selection:bg-[#FF385C] selection:text-white`}>
      <body className="min-h-full flex flex-col bg-[#F8F9FA] text-gray-900 font-sans">
        <AppProvider>
          <SmoothScroll>
            <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />
            {children}
          </SmoothScroll>
        </AppProvider>
      </body>
    </html>
  );
}
