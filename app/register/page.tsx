"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { LoadingOverlay } from "@/components/loading-overlay"
import { AccountCreatedModal } from "@/components/account-created-modal"
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  Gift,
  Shield,
  Zap,
  AlertCircle,
  CheckCircle2,
  Ticket,
  Loader2,
} from "lucide-react"
import confetti from "canvas-confetti"

interface ValidationErrors {
  username?: string
  email?: string
  password?: string
  agreeTerms?: string
}

interface ValidFields {
  username: boolean
  email: boolean
  password: boolean
}

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [validFields, setValidFields] = useState<ValidFields>({
    username: false,
    email: false,
    password: false,
  })
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agreeTerms: false,
  })

  // Coupon State
  const [couponCode, setCouponCode] = useState("")
  const [couponStatus, setCouponStatus] = useState<"idle" | "loading" | "valid" | "invalid">("idle")
  const [couponMessage, setCouponMessage] = useState("")

  const loadingMessages = [
    "Validating information...",
    "Creating your account...",
    "Setting up your profile...",
    "Preparing welcome bonus...",
    "Almost done...",
  ]

  const validateUsername = (username: string): string | undefined => {
    if (!username) return "Username is required"
    if (username.length < 3) return "Username must be at least 3 characters"
    if (username.length > 20) return "Username must be less than 20 characters"
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Username can only contain letters, numbers, and underscores"
    return undefined
  }

  const validateEmail = (email: string): string | undefined => {
    if (!email) return "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address"
    return undefined
  }

  const validatePassword = (password: string): string | undefined => {
    if (!password) return "Password is required"
    if (password.length < 8) return "Password must be at least 8 characters"
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter"
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter"
    if (!/[0-9]/.test(password)) return "Password must contain at least one number"
    return undefined
  }

  const validateFieldLive = (field: string, value: string) => {
    let error: string | undefined
    switch (field) {
      case "username":
        error = validateUsername(value)
        break
      case "email":
        error = validateEmail(value)
        break
      case "password":
        error = validatePassword(value)
        break
    }

    if (touched[field] || value.length > 0) {
      setErrors((prev) => ({ ...prev, [field]: error }))
    }

    setValidFields((prev) => ({
      ...prev,
      [field]: !error && value.length > 0,
    }))
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    validateFieldLive(field, value)
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      agreeTerms: !formData.agreeTerms ? "You must agree to the terms" : undefined,
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== undefined)
  }

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true })
    const newErrors = { ...errors }
    switch (field) {
      case "username":
        newErrors.username = validateUsername(formData.username)
        break
      case "email":
        newErrors.email = validateEmail(formData.email)
        break
      case "password":
        newErrors.password = validatePassword(formData.password)
        break
    }
    setErrors(newErrors)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({
      username: true,
      email: true,
      password: true,
      agreeTerms: true,
    })

    if (validateForm()) {
      setIsLoading(true)
    }
  }

  const handleApplyCoupon = async () => {
    if (!couponCode) return

    setCouponStatus("loading")
    setCouponMessage("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (
      couponCode.toUpperCase() === "WELCOME500" ||
      couponCode.toUpperCase() === "RIVER2024" ||
      couponCode.toUpperCase() === "WELCOME20"
    ) {
      setCouponStatus("valid")
      const bonusAmount = couponCode.toUpperCase() === "WELCOME20" ? "$20" : "$500"
      setCouponMessage(`Coupon applied! ${bonusAmount} bonus added.`)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#22c55e", "#16a34a", "#ffffff"],
      })
    } else {
      setCouponStatus("invalid")
      setCouponMessage("Invalid coupon code. Please try again.")
    }
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setShowSuccessModal(true)
  }

  const InputError = ({ message }: { message?: string }) => {
    if (!message) return null
    return (
      <div className="flex items-center gap-1 mt-1.5 text-red-400 text-sm animate-in slide-in-from-top-1">
        <AlertCircle className="w-4 h-4" />
        <span>{message}</span>
      </div>
    )
  }

  const getInputClass = (field: keyof ValidationErrors) => {
    const baseClass =
      "w-full pl-12 pr-4 py-3 rounded-xl bg-secondary border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all"
    if (touched[field] && errors[field]) {
      return `${baseClass} border-red-500 focus:ring-red-500 focus:border-transparent`
    }
    if (validFields[field as keyof ValidFields]) {
      return `${baseClass} border-green-500 focus:ring-green-500 focus:border-transparent`
    }
    return `${baseClass} border-border focus:ring-primary focus:border-transparent`
  }

  const getPasswordInputClass = (field: keyof ValidationErrors) => {
    const baseClass =
      "w-full pl-12 pr-12 py-3 rounded-xl bg-secondary border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all"
    if (touched[field] && errors[field]) {
      return `${baseClass} border-red-500 focus:ring-red-500 focus:border-transparent`
    }
    if (validFields[field as keyof ValidFields]) {
      return `${baseClass} border-green-500 focus:ring-green-500 focus:border-transparent`
    }
    return `${baseClass} border-border focus:ring-primary focus:border-transparent`
  }

  const ValidIcon = ({ isValid }: { isValid: boolean }) => {
    if (!isValid) return null
    return (
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-in zoom-in duration-200">
        <CheckCircle2 className="w-5 h-5" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <LoadingOverlay isLoading={isLoading} messages={loadingMessages} onComplete={handleLoadingComplete} />

      <AccountCreatedModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        username={formData.username || "Player"}
      />

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <div className="hidden lg:block">
            <h1 className="text-4xl font-bold text-white mb-4">
              Join <span className="rainbow-text">RiverSweeps</span> Today
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Create your account and start winning with thousands of other players!
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Welcome Bonus</h3>
                  <p className="text-muted-foreground text-sm">Get up to $500 bonus on your first deposit!</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Instant Play</h3>
                  <p className="text-muted-foreground text-sm">Access 500+ games instantly after registration</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Secure & Licensed</h3>
                  <p className="text-muted-foreground text-sm">Your data and funds are always protected</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 rounded-xl bg-card/30 border border-border">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-muted-foreground text-sm">Active Players</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card/30 border border-border">
                <div className="text-2xl font-bold text-green-500">$2M+</div>
                <div className="text-muted-foreground text-sm">Paid Out</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card/30 border border-border">
                <div className="text-2xl font-bold text-cyan-500">500+</div>
                <div className="text-muted-foreground text-sm">Games</div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* Coupon Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-orange-500/30 rounded-2xl p-4 mb-6 group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Ticket className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-orange-100 font-bold text-lg">Use Code: WELCOME20</h3>
                  <p className="text-orange-200/70 text-sm">Get $20 free bonus on signup!</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border shadow-xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Create Account</h2>
                <p className="text-muted-foreground mt-2">Fill in your details to get started</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleChange("username", e.target.value)}
                      onBlur={() => handleBlur("username")}
                      className={getInputClass("username")}
                      placeholder="Choose a username"
                    />
                    <ValidIcon isValid={validFields.username} />
                  </div>
                  {touched.username && <InputError message={errors.username} />}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      className={getInputClass("email")}
                      placeholder="Enter your email"
                    />
                    <ValidIcon isValid={validFields.email} />
                  </div>
                  {touched.email && <InputError message={errors.email} />}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      onBlur={() => handleBlur("password")}
                      className={getPasswordInputClass("password")}
                      placeholder="Create a password"
                    />
                    <div className="absolute right-12 top-1/2 -translate-y-1/2">
                      {validFields.password && (
                        <CheckCircle2 className="w-5 h-5 text-green-500 animate-in zoom-in duration-200" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {touched.password && <InputError message={errors.password} />}
                </div>

                {/* Coupon Code Input */}
                <div className="pt-2">
                  <label className="block text-sm font-medium text-white mb-2">
                    Coupon Code <span className="text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase())
                          if (couponStatus !== "idle") {
                            setCouponStatus("idle")
                            setCouponMessage("")
                          }
                        }}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl bg-secondary border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
                          couponStatus === "valid"
                            ? "border-green-500 focus:ring-green-500 text-green-500"
                            : couponStatus === "invalid"
                              ? "border-red-500 focus:ring-red-500"
                              : "border-border focus:ring-primary"
                        }`}
                        placeholder="WELCOME500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={!couponCode || couponStatus === "loading" || couponStatus === "valid"}
                      className={`px-6 rounded-xl font-bold transition-all min-w-[100px] flex items-center justify-center ${
                        couponStatus === "valid"
                          ? "bg-green-500/20 text-green-500 border border-green-500/50 cursor-default"
                          : couponStatus === "loading"
                            ? "bg-secondary text-white border border-border cursor-not-allowed"
                            : "bg-secondary hover:bg-white/10 text-white border border-border hover:border-white/30"
                      }`}
                    >
                      {couponStatus === "loading" ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : couponStatus === "valid" ? (
                        "Applied"
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </div>
                  {couponStatus === "valid" && (
                    <p className="text-green-400 text-sm mt-2 flex items-center gap-1.5 animate-in slide-in-from-top-1">
                      <CheckCircle2 className="w-4 h-4" /> {couponMessage}
                    </p>
                  )}
                  {couponStatus === "invalid" && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1.5 animate-in slide-in-from-top-1">
                      <AlertCircle className="w-4 h-4" /> {couponMessage}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div className="pt-2">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded border-border bg-secondary text-primary focus:ring-primary"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {touched.agreeTerms && <InputError message={errors.agreeTerms} />}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-pink-600 text-white font-bold text-lg hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  CREATE ACCOUNT
                </button>
              </form>

              <p className="text-center text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link href="#" className="text-primary hover:underline font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}