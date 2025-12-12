"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroBanner() {
  const [activeUsers, setActiveUsers] = useState(12847);
  const [totalUsers, setTotalUsers] = useState(847293);

  // Simulate live counter updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 5) - 2);
      setTotalUsers((prev) => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 pt-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#0a1628] border border-primary/20">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12">
          {/* Left content */}
          <div className="text-center lg:text-left mb-8 lg:mb-0 flex-1">
            {/* Live Stats */}
            <div className="flex flex-nowrap md:flex-wrap gap-4 mb-6 justify-center lg:justify-start overflow-x-auto">
              <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-semibold text-sm sm:text-base whitespace-nowrap">
                  {activeUsers.toLocaleString()} Online
                </span>
              </div>
              <div className="flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2">
                <UserPlus className="w-4 h-4 text-primary" />
                <span className="text-primary font-semibold text-sm sm:text-base whitespace-nowrap">
                  {totalUsers.toLocaleString()} Users
                </span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                WELCOME TO
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                RIVERSWEEPS
              </span>
            </h1>

            <p className="text-foreground/70 text-lg mb-8 max-w-md mx-auto lg:mx-0">
              Join thousands of players winning big every day. Register now and
              claim your welcome bonus!
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <Link
                href="/register"
                className="group relative inline-flex items-center justify-center w-full max-w-[260px] mx-auto md:mx-0 md:w-auto md:min-w-[340px] text-center whitespace-nowrap px-3.5 py-2 md:px-10 md:py-4 bg-[linear-gradient(90deg,rgba(21,163,224,1)_0%,rgba(20,111,230,1)_100%)] rounded-lg md:rounded-xl font-bold text-sm md:text-lg text-white shadow-lg shadow-sky-400/30 hover:shadow-sky-400/50 transition-all duration-300 animate-heartbeat"
              >
                <span className="inline-flex items-center gap-2 justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  REGISTER ACCOUNT
                </span>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-8 justify-center lg:justify-start text-foreground/50 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Instant Withdrawals</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Secure & Licensed</span>
              </div>
            </div>
          </div>

          {/* Right content - Featured image */}
          <div className="relative w-full lg:w-1/2 h-64 lg:h-96">
            <Image
              src="/File3.webp"
              alt="Coin Village"
              fill
              className="object-contain float-animation"
            />
          </div>
        </div>

        {/* Floating decorations */}
        <div className="absolute top-10 left-10 w-8 h-8 rounded-full bg-yellow-500 opacity-60 float-animation" />
        <div
          className="absolute bottom-20 right-20 w-6 h-6 rounded-full bg-yellow-500 opacity-40 float-animation"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-20 w-4 h-4 rounded-full bg-primary opacity-50 float-animation"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-20 right-40 w-10 h-10 bg-primary/20 rotate-45 float-animation"
          style={{ animationDelay: "0.5s" }}
        />
      </div>
    </section>
  );
}
