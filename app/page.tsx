import { Navbar } from "@/components/navbar";
import { GameGrid } from "@/components/game-grid";
import { HeroBanner } from "@/components/hero-banner";
import { FeaturesSection } from "@/components/features-section";
import { JackpotSection } from "@/components/jackpot-section";
import { WinnersTicker } from "@/components/winners-ticker";
import { SocialProofToast } from "@/components/social-proof-toast";
import { VipSection } from "@/components/vip-section";
import { FloatingElements } from "@/components/floating-elements";
import { LeaderboardSection } from "@/components/leaderboard-section";
import { QuickActionBar } from "@/components/quick-action-bar";

export default function Home() {
  const popularGames = [
    {
      id: "buffalo",
      title: "Buffalo",
      category: "Slots",
      thumbnail: "/buffalo-wild-west-slot-game-fire.jpg",
      description: "Wild buffalo slot",
      gameUrl: "#",
    },
    {
      id: "fortune-fish",
      title: "Fortune Fish Frenzy",
      category: "Fishing",
      thumbnail: "/fortune-fish-frenzy-aquarium-slot.jpg",
      description: "Fish frenzy game",
      gameUrl: "#",
    },
    {
      id: "lucky-fishing",
      title: "Lucky Fishing",
      category: "Fishing",
      thumbnail: "/lucky-fishing-ducks-tropical.jpg",
      description: "Lucky fishing game",
      gameUrl: "#",
    },
    {
      id: "egypt-fortunes",
      title: "Egypt Fortunes",
      category: "Slots",
      thumbnail: "/egyptian-pharaoh-slot-game-gold.jpg",
      description: "Egyptian slot",
      gameUrl: "#",
    },
    {
      id: "reel-rider",
      title: "Reel Rider",
      category: "Slots",
      thumbnail: "/motorcycle-biker-slot-game-neon.jpg",
      description: "Biker slot game",
      gameUrl: "#",
    },
    {
      id: "triple-fortune",
      title: "Triple Fortune",
      category: "Slots",
      thumbnail: "/asian-fortune-slot-game-red-gold.jpg",
      description: "Fortune slot",
      gameUrl: "#",
    },
    {
      id: "golden-dragon",
      title: "Golden Dragon",
      category: "Slots",
      thumbnail: "/golden-dragon-slot-game-fire.jpg",
      description: "Dragon slot",
      gameUrl: "#",
    },
    {
      id: "ocean-king",
      title: "Ocean King",
      category: "Fishing",
      thumbnail: "/underwater-ocean-fish-game-blue.jpg",
      description: "Ocean fishing",
      gameUrl: "#",
    },
    {
      id: "blackjack-vip",
      title: "Blackjack VIP",
      category: "Table Games",
      thumbnail: "/blackjack-cards-casino-table.jpg",
      description: "VIP blackjack",
      gameUrl: "#",
    },
    {
      id: "roulette-live",
      title: "Live Roulette",
      category: "Live",
      thumbnail: "/roulette-wheel-casino-red-black.jpg",
      description: "Live roulette",
      gameUrl: "#",
    },
    {
      id: "candy-rush",
      title: "Candy Rush",
      category: "Arcade",
      thumbnail: "/candy-colorful-match-game.jpg",
      description: "Candy game",
      gameUrl: "#",
    },
    {
      id: "speed-racer",
      title: "Speed Racer",
      category: "Racing",
      thumbnail: "/racing-car-neon-speed-game.jpg",
      description: "Racing game",
      gameUrl: "#",
    },
  ];

  const playNowGames = [
    {
      id: "red-ball",
      title: "Red Ball",
      category: "Arcade",
      thumbnail: "/red-ball-adventure-game.jpg",
      description: "Red ball adventure",
      gameUrl: "#",
    },
    {
      id: "stickman-bike",
      title: "Stickman Bike",
      category: "Racing",
      thumbnail: "/stickman-bike-racing-game.jpg",
      description: "Stickman racing",
      gameUrl: "#",
    },
    {
      id: "rock-paper",
      title: "Rock Paper Scissors",
      category: "Puzzle",
      thumbnail: "/rock-paper-scissors-hand-game.jpg",
      description: "Classic game",
      gameUrl: "#",
    },
    {
      id: "car-crash",
      title: "Car Crash",
      category: "Racing",
      thumbnail: "/car-crash-destruction-game.jpg",
      description: "Car crash game",
      gameUrl: "#",
    },
    {
      id: "chicken-merge",
      title: "Chicken Merge",
      category: "Puzzle",
      thumbnail: "/chicken-merge-puzzle-game-cute.jpg",
      description: "Merge puzzle",
      gameUrl: "#",
    },
    {
      id: "connect-4",
      title: "Connect 4",
      category: "Puzzle",
      thumbnail: "/connect-four-board-game.jpg",
      description: "Classic connect 4",
      gameUrl: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative pb-16 md:pb-0">
      <FloatingElements />

      <Navbar />
      <WinnersTicker />

      <HeroBanner />

      <main id="games" className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <GameGrid
          title="Popular Games"
          games={popularGames}
          icon="star"
          showSearch
        />
      </main>

      <FeaturesSection />

      <VipSection />

      <LeaderboardSection />

      <JackpotSection />

      <main className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
        <GameGrid title="Play Now" games={playNowGames} icon="gamepad" />
      </main>

      <footer className="border-t border-border bg-card/50 py-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
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
