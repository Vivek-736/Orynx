import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen font-sans overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      <p
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(160px, 35vw, 260px)",
          fontWeight: 800,
          letterSpacing: "-0.06em",
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px #e8e8e8",
          userSelect: "none",
          margin: 0,
          pointerEvents: "none",
        }}
      >
        404
      </p>

      <div className="relative z-10 flex flex-col items-center text-center">
        <Link href="/" className="flex items-center gap-2 mb-14">
          <Image src="/logo.svg" alt="Orynx Logo" width={22} height={22} />
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#0a0a0a",
            }}
          >
            Orynx
          </span>
        </Link>

        <div
          className="flex items-center gap-2 mb-5"
          style={{ color: "#0a0a0a" }}
        >
          <span
            style={{ width: 5, height: 5, borderRadius: "50%", background: "#0a0a0a", display: "inline-block" }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Error 404
          </span>
          <span
            style={{ width: 5, height: 5, borderRadius: "50%", background: "#0a0a0a", display: "inline-block" }}
          />
        </div>
        <h1
          style={{
            fontSize: "1.6rem",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#0a0a0a",
            margin: "0 0 0.6rem",
            lineHeight: 1.2,
          }}
        >
          Page not found
        </h1>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#9ca3af",
            fontWeight: 400,
            margin: "0 0 2.5rem",
            maxWidth: 300,
            lineHeight: 1.6,
          }}
        >
          The page you&apos;re looking for has vanished into the void — or never existed.
        </p>
        <div className="flex items-center">
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#fff",
              background: "#0a0a0a",
              border: "none",
              borderRadius: 8,
              padding: "10px 20px",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to home
          </Link>
        </div>

        <p
          style={{
            marginTop: "3.5rem",
            fontSize: "11px",
            color: "#d1d5db",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Orynx · All rights reserved
        </p>
      </div>
    </div>
  );
}