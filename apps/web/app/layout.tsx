import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "USA Job Portal | AI Job Applications",
  description: "Find US jobs and create job-specific resumes and cover letters.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
