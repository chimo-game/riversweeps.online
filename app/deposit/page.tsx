"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { LoadingOverlay } from "@/components/loading-overlay";
import {
  DollarSign,
  Bitcoin,
  Gift,
  Shield,
  Zap,
  ChevronRight,
  Check,
  Copy,
} from "lucide-react";
import btcQr from "@/assets/BTC_QR.png";
import solanaQr from "@/assets/Solana_QR.jpg";
import xrpQr from "@/assets/XRP_QR.jpg";
import dogeQr from "@/assets/Doge_QR.png";
import bnbQr from "@/assets/BNB_QR.jpg";
import tronQr from "@/assets/Tron_QR.jpg";
import usdtQr from "@/assets/USDT_QR.jpg";
import usdcQr from "@/assets/USDC_QR.jpg";
import btcIcon from "@/assets/bitcoin-btc-logo.svg";
import solIcon from "@/assets/solana-sol-logo.svg";
import xrpIcon from "@/assets/xrp_logo.svg";
import dogeIcon from "@/assets/dogecoin-doge-logo.svg";
import bnbIcon from "@/assets/bnb-bnb-logo.svg";
import trxIcon from "@/assets/tron-trx-logo.svg";
import usdtIcon from "@/assets/tether-usdt-logo.svg";
import usdcIcon from "@/assets/usd-coin-usdc-logo.svg";

const depositAmounts = [10, 25, 50, 100, 250, 500];

type PaymentMethod = {
  id: string;
  name: string;
  ticker: string;
  network: string;
  icon: StaticImageData;
  badge: string;
  address: string;
  qr: StaticImageData;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: "btc",
    name: "Bitcoin",
    ticker: "BTC",
    network: "Bitcoin Network",
    icon: btcIcon,
    badge: "0% fee",
    address: "bc1qheujxha5h8evndpcfuf5hpstrg67ppjpkq8l0y",
    qr: btcQr,
  },
  {
    id: "sol",
    name: "Solana",
    ticker: "SOL",
    network: "Solana Network",
    icon: solIcon,
    badge: "Fast",
    address: "J79NUawUXcr5EPWwz8gEXPw3LLALm1DDTVqSPXbzw94i",
    qr: solanaQr,
  },
  {
    id: "xrp",
    name: "XRP",
    ticker: "XRP",
    network: "XRP Network",
    icon: xrpIcon,
    badge: "Low fee",
    address: "raj4giHrQxmJYwTnHRBZWQLobDUmp4EREk",
    qr: xrpQr,
  },
  {
    id: "doge",
    name: "Dogecoin",
    ticker: "DOGE",
    network: "Dogecoin Network",
    icon: dogeIcon,
    badge: "Community pick",
    address: "DMq4YifKuUUc2sSUEHKgo2hq8R1fVeiqKD",
    qr: dogeQr,
  },
  {
    id: "bnb",
    name: "BNB",
    ticker: "BNB",
    network: "BNB Smart Chain",
    icon: bnbIcon,
    badge: "Low fee",
    address: "0x892167B555Cc2C6c4505ca9d782cb128Edfb58fa",
    qr: bnbQr,
  },
  {
    id: "trx",
    name: "Tron",
    ticker: "TRX",
    network: "TRON Network",
    icon: trxIcon,
    badge: "Fast",
    address: "TUsKCntkhEdgbTU71x3UzFQxHziyuQCjor",
    qr: tronQr,
  },
  {
    id: "usdt",
    name: "USDT",
    ticker: "USDT",
    network: "BNB Smart Chain",
    icon: usdtIcon,
    badge: "Stablecoin",
    address: "0x9c1fff5158a14bded845fb4b2c53edc64bed6e66",
    qr: usdtQr,
  },
  {
    id: "usdc",
    name: "USDC",
    ticker: "USDC",
    network: "BNB Smart Chain",
    icon: usdcIcon,
    badge: "Stablecoin",
    address: "0x9c1fff5158a14bded845fb4b2c53edc64bed6e66",
    qr: usdcQr,
  },
];

export default function DepositPage() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const finalAmount = customAmount
    ? Number.parseFloat(customAmount)
    : selectedAmount;

  const isPinValid = /^\d{12}$/.test(pin);
  const formattedPin = pin.replace(/(\d{2})(?=\d)/g, "$1-");
  const isFormValid = Boolean(finalAmount && username.trim() && isPinValid);

  const loadingMessages = [
    "Connecting to payment gateway...",
    "Verifying payment details...",
    "Processing transaction...",
    "Adding credits to your account...",
    "Success!",
  ];

  const handleDeposit = () => {
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    router.push("/");
  };

  const currentMethod =
    paymentMethods.find((m) => m.id === selectedMethod) ?? paymentMethods[0];

  const handleCopyAddress = async (address: string, id: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedId(id);
    } catch {
      setCopiedId(null);
    }
  };

  useEffect(() => {
    if (!copiedId) return;
    const timer = setTimeout(() => setCopiedId(null), 1500);
    return () => clearTimeout(timer);
  }, [copiedId]);

  return (
    <div className="min-h-screen bg-background">
      <LoadingOverlay
        isLoading={isLoading}
        messages={loadingMessages}
        onComplete={handleLoadingComplete}
      />

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">
            <span className="rainbow-text">Deposit Funds</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Add funds to your account and start playing instantly
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Select Amount
              </h2>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
                {depositAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`py-3 px-4 rounded-xl font-bold transition-all ${
                      selectedAmount === amount && !customAmount
                        ? "bg-gradient-to-r from-primary to-pink-600 text-white shadow-lg shadow-primary/30"
                        : "bg-secondary text-white hover:bg-secondary/80 border border-border"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Enter custom amount"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-lg"
                />
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
              <h2 className="text-xl font-bold text-white">Account Details</h2>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  PIN (12 digits)
                </label>
                <input
                  value={formattedPin}
                  onChange={(e) =>
                    setPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 12))
                  }
                  placeholder="13-84-34-54-22-45"
                  inputMode="numeric"
                  maxLength={17} // allow for 12 digits + 5 dashes in display
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                {!isPinValid && pin.length > 0 && (
                  <p className="text-xs text-red-400 mt-1">
                    PIN must be exactly 12 digits.
                  </p>
                )}
                {pin.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: 12 digits grouped in pairs (e.g. 13-84-34-54-22-45).
                  </p>
                )}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Bitcoin className="w-5 h-5 text-primary" />
                Crypto Payment Method
              </h2>

              <div className="grid sm:grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                      selectedMethod === method.id
                        ? "bg-gradient-to-r from-primary/25 to-pink-600/20 border-2 border-primary shadow-lg shadow-primary/20"
                        : "bg-secondary border border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                          selectedMethod === method.id
                            ? "bg-white border-primary/60 shadow-md shadow-primary/20"
                            : "bg-white border-border"
                        }`}
                      >
                        <Image
                          src={method.icon}
                          alt={`${method.name} icon`}
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      </div>
                      <div className="text-left">
                        <div className="text-white font-semibold">
                          {method.name}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {method.network}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedMethod === method.id
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {selectedMethod === method.id && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-gradient-to-br from-primary via-pink-500 to-blue-500" />

              <div className="relative flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-primary uppercase tracking-[0.08em]">
                    Send crypto
                  </p>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                      {currentMethod.ticker}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      · {currentMethod.network}
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Use this network only or funds may be lost.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/15 text-white border border-primary/40 text-sm font-semibold">
                  {currentMethod.name}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Wallet Address
                  </div>
                  <div className="bg-secondary/80 border border-border rounded-xl p-3 flex items-start justify-between gap-3">
                    <div className="break-all text-white text-sm md:text-base">
                      {currentMethod.address}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyAddress(
                          currentMethod.address,
                          currentMethod.id
                        )
                      }
                      className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {copiedId === currentMethod.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Add memo/tag only if your wallet requires it.
                  </div>
                </div>

                <div className="bg-secondary/70 border border-border rounded-xl p-4 flex flex-col items-center justify-center gap-3">
                  <div className="text-sm text-muted-foreground">Scan QR</div>
                  <div className="relative w-44 h-44 md:w-48 md:h-48 overflow-hidden rounded-xl bg-background/60">
                    <Image
                      src={currentMethod.qr}
                      alt={`${currentMethod.name} QR`}
                      fill
                      className="object-contain rounded-xl"
                      sizes="(max-width: 768px) 176px, 192px"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 border border-border sticky top-6">
              <h2 className="text-xl font-bold text-white mb-4">Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Deposit Amount</span>
                  <span className="text-white font-semibold">
                    ${finalAmount || 0}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Bonus (100%)</span>
                  <span className="text-green-500 font-semibold">
                    +${finalAmount || 0}
                  </span>
                </div>
                <div className="h-px bg-border"></div>
                <div className="flex justify-between text-white">
                  <span className="font-semibold">Total Credits</span>
                  <span className="text-2xl font-bold text-primary">
                    ${(finalAmount || 0) * 2}
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Gift className="w-8 h-8 text-green-500" />
                  <div>
                    <div className="text-green-500 font-bold">100% BONUS</div>
                    <div className="text-muted-foreground text-sm">
                      Double your first deposit!
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDeposit}
                disabled={isLoading || !isFormValid}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                DEPOSIT ${finalAmount || 0}
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-4 mt-6 text-muted-foreground text-sm">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  <span>Instant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
