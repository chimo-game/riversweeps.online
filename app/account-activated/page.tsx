import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Account Activated | RiverSweeps",
  description: "Your RiverSweeps account is now active. Start playing and claiming rewards.",
}

export default function AccountActivatedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f2847] to-[#0a1628] text-white">
      <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        <div className="relative w-40 h-40 mb-8 drop-shadow-2xl">
          <Image src="/File31.webp" alt="Account activated badge" fill className="object-contain" priority />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl max-w-3xl w-full backdrop-blur">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Congrats! Your account is activated 🎉</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            You&apos;re all set to dive into RiverSweeps. Claim your welcome bonus, explore top games, and start winning today.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="bg-primary/10 border border-primary/30 rounded-2xl p-5 text-left">
              <h3 className="text-xl font-semibold mb-2">Next steps</h3>
              <ul className="space-y-2 text-white/80">
                <li>• Claim your welcome offer</li>
                <li>• Try the featured games</li>
                <li>• Secure your account in settings</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left">
              <h3 className="text-xl font-semibold mb-2">Need help?</h3>
              <p className="text-white/80">Our 24/7 support team is ready. Reach out anytime for assistance.</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              href="/"
              className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition hover:scale-105"
            >
              Go to Home
            </Link>
            <Link
              href="/deposit"
              className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-pink-600 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition hover:scale-105"
            >
              Deposit & Play
            </Link>
            <Link
              href="/games/galaxy-fishing"
              className="px-8 py-3 rounded-xl font-semibold border border-white/20 hover:border-white/40 transition hover:bg-white/5"
            >
              Explore Games
            </Link>
          </div>
        </div>

        <div className="relative w-full max-w-3xl h-64 mt-12">
          <Image src="/File3.webp" alt="Celebrate with RiverSweeps" fill className="object-contain drop-shadow-2xl" />
        </div>
      </div>
    </div>
  )
}

