import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LandNyaya (ల్యాండ్ న్యాయ) - AP Autonomous Land Law & Statutory Due Diligence Platform",
  description: "AI-Powered LegalTech Agent for Andhra Pradesh Land Laws, MeeBhoomi 1-B Audits, Section 22-A Prohibited Properties, F-Line Demarcation, and Statutory Dispute Prevention.",
  keywords: "AP Land Law, MeeBhoomi, Section 22A, F-Line Survey Demarcation, Pattadar Passbook Act 1971, LegalTech, Title Due Diligence, Andhra Pradesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#070b14] text-slate-100 font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
