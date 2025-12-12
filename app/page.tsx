import { Navbar } from "@/components/navbar";
import { GameGrid } from "@/components/game-grid";
import { HeroBanner } from "@/components/hero-banner";
import { FeaturesSection } from "@/components/features-section";
import { JackpotSection } from "@/components/jackpot-section";
import { WinnersTicker } from "@/components/winners-ticker";
import { SocialProofToast } from "@/components/social-proof-toast";
import { FloatingElements } from "@/components/floating-elements";
import { LeaderboardSection } from "@/components/leaderboard-section";
import { QuickActionBar } from "@/components/quick-action-bar";
import Link from "next/link";
import { Banknote, Wallet } from "lucide-react";

export default function Home() {
  const popularGames = [
    {
      id: "buffalo",
      title: "Buffalo Cash Pool",
      category: "Slots",
      thumbnail: "/File8.webp",
      description: "Wild buffalo slot",
      gameUrl: "#",
    },
    {
      id: "fortune-fish",
      title: "Fortune Fish Frenzy",
      category: "Fishing",
      thumbnail: "/File10.webp",
      description: "Fish frenzy game",
      gameUrl: "#",
    },
    {
      id: "lucky-fishing",
      title: "Lucky Fishing",
      category: "Fishing",
      thumbnail: "/File47.webp",
      description: "Lucky fishing game",
      gameUrl: "#",
    },
    {
      id: "egypt-fortunes",
      title: "Egypt Fortunes",
      category: "Slots",
      thumbnail: "/File14.webp",
      description: "Egyptian slot",
      gameUrl: "#",
    },
    {
      id: "reel-rider",
      title: "Reel Rider",
      category: "Slots",
      thumbnail: "/File16.webp",
      description: "Biker slot game",
      gameUrl: "#",
    },
    {
      id: "triple-fortune",
      title: "Triple Fortune",
      category: "Slots",
      thumbnail: "/File18.webp",
      description: "Fortune slot",
      gameUrl: "#",
    },
    {
      id: "dragon-coin",
      title: "Dragon Coin",
      category: "Slots",
      thumbnail: "/File9.webp",
      description: "Dragon slot",
      gameUrl: "#",
    },
    {
      id: "thunder-fishing",
      title: "Thunder Fishing",
      category: "Fishing",
      thumbnail: "/File44.webp",
      description: "Thunder fishing",
      gameUrl: "#",
    },
    {
      id: "elephants-gold",
      title: "Elephant's Gold",
      category: "Slots",
      thumbnail: "/File11.webp",
      description: "Elephant slot",
      gameUrl: "#",
    },
    {
      id: "luck-of-panda",
      title: "Luck of Panda",
      category: "Slots",
      thumbnail: "/File13.webp",
      description: "Panda slot",
      gameUrl: "#",
    },
    {
      id: "power-of-zorro",
      title: "Power of Zorro",
      category: "Slots",
      thumbnail: "/File15.webp",
      description: "Zorro slot",
      gameUrl: "#",
    },
    {
      id: "cactus-riches",
      title: "Cactus Riches",
      category: "Slots",
      thumbnail: "/File17.webp",
      description: "Cactus slot",
      gameUrl: "#",
    },
  ];

  const playNowGames = [
    {
      id: "candy-heroes",
      title: "Candy Heroes",
      category: "Arcade",
      thumbnail: "/File46.webp",
      description: "Candy adventure",
      gameUrl: "#",
    },
    {
      id: "galaxy-fishing",
      title: "Galaxy Fishing",
      category: "Fishing",
      thumbnail: "/File45.webp",
      description: "Space fishing",
      gameUrl: "#",
    },
    {
      id: "lucky-fishing-remastered",
      title: "Lucky Fishing Remastered",
      category: "Fishing",
      thumbnail: "/File12.webp",
      description: "Remastered fishing",
      gameUrl: "#",
    },
    {
      id: "thunder-fishing-2",
      title: "Thunder Fishing",
      category: "Fishing",
      thumbnail: "/File19.webp",
      description: "Zeus fishing",
      gameUrl: "#",
    },
    {
      id: "fortune-fish-2",
      title: "Fortune Fish",
      category: "Fishing",
      thumbnail: "/File10.webp",
      description: "Fortune fishing",
      gameUrl: "#",
    },
    {
      id: "buffalo-2",
      title: "Buffalo Cash",
      category: "Slots",
      thumbnail: "/File8.webp",
      description: "Buffalo cash pool",
      gameUrl: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative pb-16 md:pb-0">
      <FloatingElements />

      <Navbar />
      <WinnersTicker />

      <HeroBanner />

      {/* Deposit & Cash Out quick section */}
      <section className="max-w-5xl mx-auto px-6 mt-4 mb-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/deposit"
            className="group flex items-center justify-between md:justify-start gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-pink-600 text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition hover:scale-[1.01]"
          >
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6" />
              <div className="text-left">
                <div className="text-sm uppercase opacity-80">Add funds</div>
                <div className="text-lg font-bold">Deposit</div>
              </div>
            </div>
            <span className="text-sm opacity-80">Start playing</span>
          </Link>
          <Link
            href="/cashout"
            className="group flex items-center justify-between md:justify-start gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition hover:scale-[1.01]"
          >
            <div className="flex items-center gap-3">
              <Banknote className="w-6 h-6" />
              <div className="text-left">
                <div className="text-sm uppercase opacity-80">Withdraw</div>
                <div className="text-lg font-bold">Cash Out</div>
              </div>
            </div>
            <span className="text-sm opacity-80">Instant payouts</span>
          </Link>
        </div>
      </section>

      <main id="games" className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <GameGrid title="Popular Games" games={popularGames} icon="star" />
      </main>

      <FeaturesSection />

      <LeaderboardSection />

      <JackpotSection />

      <main className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
        <GameGrid title="Play Now" games={playNowGames} icon="gamepad" />
      </main>

      <footer className="border-t border-border bg-card/50 py-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/File1.svg" alt="RiverSweeps" className="w-8 h-8" />
            <span className="font-bold text-white">RiverSweeps</span>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            Play responsibly. 18+ only. Licensed and regulated.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">Support 24/7</span>
          </div>
        </div>
      </footer>

      <SocialProofToast />
      <QuickActionBar />
    </div>
  );
}
