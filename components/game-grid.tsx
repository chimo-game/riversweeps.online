"use client"

import { GameCard } from "./game-card"
import type { Game } from "@/types/game"
import { Star, Gamepad2 } from "lucide-react"

interface GameGridProps {
  title: string
  games: Game[]
  icon?: "star" | "gamepad"
}

export function GameGrid({ title, games, icon }: GameGridProps) {
  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-6">
        {icon === "star" && <Star className="w-6 h-6 text-primary" />}
        {icon === "gamepad" && <Gamepad2 className="w-6 h-6 text-primary" />}
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>

      {games.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No games found.</p>
        </div>
      )}
    </section>
  )
}
