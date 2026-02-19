import "./globals.css";
import { Space_Grotesk, DM_Serif_Display } from "next/font/google";
import Sidebar from "../components/Sidebar";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-dm" });

export const metadata = {
  title: "National Rail Transit Scenario Intelligence",
  description: "Demo dashboard for rail scenario intelligence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSerif.variable}`}>
      <body>
        <div className="min-h-screen bg-ink bg-grid">
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6 lg:p-10">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
