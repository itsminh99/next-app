import AppProvider from "contexts/AppProvider";
import type { Metadata } from "next";
import { inter } from "public/fonts";
import "public/styles/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://itsminh99.dev"),
  alternates: {
    canonical: "/",
  },
  title: {
    template: "%s | NextJS",
    default: "NextJS", // a default is required when creating a template
  },
  description: "Base NextJS using NextJS latest version",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
