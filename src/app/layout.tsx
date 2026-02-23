import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DockAndChat } from "@/components/layout/DockAndChat";
import renewalData from "@/data/renewal.json";

export const metadata: Metadata = {
  title: renewalData.projectInfo.projectName,
  description: renewalData.projectInfo.coreConcept,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
      </head>
      <body className="antialiased bg-primary-950 text-white selection:bg-primary-500 selection:text-white">
        <Header
          logo={renewalData.layout.header.logo}
          navigation={renewalData.layout.header.navigation}
          actions={renewalData.layout.header.actions}
        />

        <main className="min-h-screen">
          {children}
        </main>

        {renewalData.layout.floatingDock.enabled && (
          <DockAndChat items={renewalData.layout.floatingDock.items} />
        )}

        <Footer
          brandTextBig={renewalData.layout.footer.brandTextBig}
          copyright={renewalData.layout.footer.copyright}
          columns={renewalData.layout.footer.columns}
        />
      </body>
    </html>
  );
}

