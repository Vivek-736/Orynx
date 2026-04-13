"use client";

import Link from "next/link";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div
      className="flex min-h-screen w-full overflow-hidden relative font-sans"
      style={{ background: "#ffffff" }}
    >
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="topFade"
            gradientUnits="userSpaceOnUse"
            x1="0" y1="0"
            x2="0" y2="50"
          >
            <stop offset="0%" stopColor="#d8d8d8" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <linearGradient
            id="bottomFade"
            gradientUnits="userSpaceOnUse"
            x1="0" y1="100"
            x2="0" y2="50"
          >
            <stop offset="0%" stopColor="#d8d8d8" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        <polygon
          points="48,0 100,0 100,50 55,50"
          fill="url(#topFade)"
        />

        <polygon
          points="48,100 100,100 100,50 55,50"
          fill="url(#bottomFade)"
        />

        <line
          x1="48" y1="0" x2="55" y2="50"
          stroke="#c0c0c0"
          strokeWidth="0.2"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="55" y1="50" x2="48" y2="100"
          stroke="#c0c0c0"
          strokeWidth="0.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div
        className="hidden md:flex flex-col justify-between relative z-10"
        style={{
          width: "50%",
          padding: "3.5rem",
          background: "#ffffff",
        }}
      >
        <div>
          <Link
            href="/"
            className="flex items-center gap-3 w-fit"
            style={{ marginBottom: "4rem" }}
          >
            <Image
              src="/logo.svg"
              alt="Orynx Logo"
              width={32}
              height={32}
              className="cursor-pointer"
            />
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#0a0a0a",
              }}
            >
              Orynx
            </span>
          </Link>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <h1
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.08,
                color: "#0a0a0a",
                margin: 0,
              }}
            >
              Next-Gen
              <br />
              AI Voice Lab
            </h1>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#6b7280",
                maxWidth: "340px",
                lineHeight: 1.72,
                fontWeight: 400,
                margin: 0,
              }}
            >
              Experience professional voice cloning technology. Create and
              deploy hyper-realistic AI voices with precision.
            </p>

            <div
              style={{ display: "flex", gap: "8px", flexWrap: "wrap", paddingTop: "8px" }}
            >
              {["Voice Cloning", "Real-time Synthesis", "Neural TTS"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "#f3f4f6",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    padding: "4px 12px",
                    fontSize: "11.5px",
                    color: "#374151",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              color: "#d1d5db",
              userSelect: "none",
              cursor: "default",
            }}
          >
            Made with Passion By Vivek
          </div>
        </div>
      </div>

      <div
        className="flex-1 flex items-center justify-center relative z-10 min-h-screen md:min-h-0 p-6 md:pl-20 md:pr-8 md:py-8"
        style={{ background: "transparent" }}
      >
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e9eaed",
              borderRadius: "14px",
              boxShadow:
                "0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08)",
              width: "100%",
              overflow: "hidden",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};