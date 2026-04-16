import "./globals.css";
import type { Metadata } from "next";
import { Spline_Sans } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/client";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const spline = Spline_Sans({
  variable: "--font-spline-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Orynx - Your Voice AI Lab",
    template: "%s | Orynx"
  },
  description: "Orynx is an intelligent AI Powered voice ai lab for tts and voice cloning",
  icons: {
    icon: "/logo.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
      <TRPCReactProvider>
        <html
          suppressHydrationWarning
          lang="en"
        >
          <body
            className={`${spline.className} antialiased`}
          >
            <NuqsAdapter>
              {children}
            </NuqsAdapter>
            <Toaster />
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}