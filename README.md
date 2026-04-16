<div align="center">
  <img src="./public/logo.svg" alt="Orynx Logo" width="80" height="80" />
  <h1>Orynx</h1>
  <p><strong>Next-Generation AI Voice Synthesis & Cloning Platform</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
  [![Typescript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
</div>

---

## ✨ Overview

Orynx is a state-of-the-art AI audio platform designed for creators, developers, and enterprises. Leveraging high-fidelity neural synthesis, Orynx allows you to transform text into lifelike speech and clone voices with unprecedented accuracy using just a few seconds of audio.

## 🚀 Key Features

- 🎙️ **Neural Text-to-Speech**: Crystal clear, emotionally aware voice synthesis across multiple languages.
- 🧬 **Instant Voice Cloning**: Create a custom digital twin of any voice with as little as 10 seconds of source audio.
- 🔍 **Voice Explorer**: A curated library of professional-grade voices categorized for every use case—from audiobooks to customer service.
- ⚡ **Real-time Generation**: Optimized pipeline using Cloudflare R2 and tRPC for near-instant audio delivery.
- 📱 **Adaptive UI**: A premium, glassmorphic dashboard experience that looks stunning on both desktop and mobile.
- 🔐 **Secure by Design**: Integrated with Clerk for foolproof enterprise-grade authentication and organization management.

## 🛠️ Tech Stack

- **Core**: [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **State & API**: [tRPC](https://trpc.io/) (End-to-end typesafety)
- **Database**: [PostgreSQL](https://www.postgresql.org/) via [Prisma ORM](https://prisma.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Storage**: [Cloudflare R2](https://www.cloudflare.com/products/r2/) (S3-compatible)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Shadcn/UI](https://ui.shadcn.com/)
- **Validation**: [Zod](https://zod.dev/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL instance
- Cloudflare R2 Bucket
- Clerk Account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vivek-736/orynx.git
   cd orynx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your credentials:
   ```env
   DATABASE_URL="postgresql://..."
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
   CLERK_SECRET_KEY="..."
   R2_ACCOUNT_ID="..."
   R2_ACCESS_KEY_ID="..."
   R2_SECRET_ACCESS_KEY="..."
   R2_BUCKET_NAME="..."
   ```

4. **Database Migration**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

<div align="center">
  <p>Built with ❤️ by the Vivek</p>
</div>