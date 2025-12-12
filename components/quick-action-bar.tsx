"use client"

import Link from "next/link"
import { Home, Gamepad2, Wallet, User, Banknote } from "lucide-react"
import { usePathname } from "next/navigation"

const actions = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Gamepad2, label: "Games", href: "/#games" },
  { icon: Wallet, label: "Deposit", href: "/deposit" },
  { icon: Banknote, label: "Cash Out", href: "/cashout" },
  { icon: User, label: "Account", href: "/register" },
]

export function QuickActionBar() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {actions.map((action) => {
          const isActive = pathname === action.href
          return (
            <Link
              key={action.label}
              href={action.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-white"
              }`}
            >
              <action.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
              <span className="text-xs font-medium">{action.label}</span>
              {isActive && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
