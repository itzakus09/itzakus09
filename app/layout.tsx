import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calisthenics AI Coach",
  description: "Adaptive calisthenics training, progress tracking and AI coaching.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
