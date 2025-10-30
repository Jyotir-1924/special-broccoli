<div align="center">
  <img src="public/assets/images/BSlogo.png" alt="Blogsmith Logo" width="300"/>
  
  # Blogsmith
  
  ### 🚀 A Modern, AI-Powered Blogging Platform
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![tRPC](https://img.shields.io/badge/tRPC-10-2596BE?style=for-the-badge&logo=trpc)](https://trpc.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  
  **[Live Demo](https://blogsmith.vercel.app)** • **[Documentation](#features)** • **[Report Bug](https://github.com/Jyotir-1924/special-broccoli/issues)**
  
  <img src="https://img.shields.io/github/license/Jyotir-1924/special-broccoli?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/github/stars/Jyotir-1924/special-broccoli?style=flat-square" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/Jyotir-1924/special-broccoli?style=flat-square" alt="Forks"/>
  
</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Database Schema](#-database-schema)
- [API Routes](#-api-routes)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 About

**Blogsmith** is a cutting-edge, full-stack blogging platform that empowers writers to create, publish, and share their stories with the world. Built with modern web technologies and enhanced with AI capabilities, Blogsmith offers a seamless writing experience with powerful features for content creators.

### Why Blogsmith?

- ✨ **Beautiful UI** - Stunning, responsive design with smooth animations
- 🤖 **AI-Powered** - Intelligent blog summarization using GPT-3.5
- 🔐 **Secure Authentication** - Google OAuth & Email/Password with NextAuth
- ⚡ **Lightning Fast** - Built on Next.js 15 with optimized performance
- 📝 **Rich Text Editor** - Full-featured WYSIWYG editor with formatting tools
- 🏷️ **Smart Organization** - Category-based content management
- 👤 **Author Profiles** - Dedicated author pages with post collections
- 📱 **Mobile First** - Fully responsive across all devices

---

## ✨ Features

### 🔒 Authentication & User Management
- **Multiple Sign-In Options**
  - Google OAuth 2.0 integration
  - Email/Password authentication
  - Secure session management with NextAuth.js
- **User Profiles**
  - Customizable profile with bio
  - Profile picture support
  - Personal dashboard

### ✍️ Content Creation
- **Rich Text Editor**
  - Bold, italic, strikethrough formatting
  - Headings (H1, H2, H3)
  - Bullet and numbered lists
  - Blockquotes with custom styling
  - Code blocks with syntax highlighting
  - Hyperlink support
- **Draft System**
  - Save posts as drafts
  - Publish when ready
  - Edit anytime

### 🏷️ Organization
- **Category Management**
  - Create unlimited categories
  - Assign multiple categories per post
  - Filter posts by category
  - SEO-friendly category slugs

### 🤖 AI Features
- **AI-Powered Summarization**
  - One-click blog summaries
  - Powered by OpenAI GPT-3.5
  - Real-time streaming with typing effect
  - Concise 150-word summaries

### 👥 Author Features
- **Author Pages**
  - Dedicated author profiles
  - View all posts by author
  - Author bio and statistics
- **Personal Dashboard**
  - Manage all your posts
  - View published and draft posts
  - Quick edit/delete actions
  - Post statistics (total, published, drafts)

### 🔐 Security
- **Authorization**
  - Users can only edit/delete their own posts
  - Protected routes with middleware
  - Secure API endpoints
- **Data Protection**
  - SQL injection prevention with Drizzle ORM
  - XSS protection
  - CSRF tokens

### 🎨 User Experience
- **Beautiful Design**
  - Modern gradient UI
  - Smooth animations with Framer Motion
  - Custom orange & black theme
  - Professional typography (Montserrat font)
- **Responsive Layout**
  - Mobile-first design
  - Tablet optimized
  - Desktop enhanced
- **Performance**
  - Server-side rendering
  - Optimized images
  - Fast page loads

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **TipTap** | Rich text editor |
| **React Query** | Data fetching & caching |

### Backend
| Technology | Purpose |
|------------|---------|
| **tRPC** | End-to-end type-safe APIs |
| **Drizzle ORM** | Type-safe database queries |
| **PostgreSQL** | Relational database (Neon) |
| **NextAuth.js** | Authentication |
| **Zod** | Schema validation |

### AI & APIs
| Technology | Purpose |
|------------|---------|
| **OpenAI API** | GPT-3.5 for summarization |
| **Google OAuth** | Social authentication |

### DevOps
| Technology | Purpose |
|------------|---------|
| **Vercel** | Deployment & hosting |
| **GitHub** | Version control |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.9.0 or higher
- **npm** or **yarn**
- **PostgreSQL** database ([Neon](https://neon.tech))
- **OpenAI API key** (optional, for AI features)
- **Google OAuth credentials** (for Google sign-in)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/Jyotir-1924/special-broccoli.git
   cd special-broccoli
```

2. **Install dependencies**
```bash
   yarn install
   # or
   npm install
```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
```env
   # Database
   DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # OpenAI (Optional)
   OPENAI_API_KEY="sk-proj-xxxxx"
```

4. **Set up the database**
```bash
   # Generate migrations
   yarn drizzle-kit generate

   # Push schema to database
   yarn drizzle-kit push
```

5. **Run the development server**
```bash
   yarn dev
```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Schema

### Tables

#### **users**
```sql
- id: text (primary key)
- name: text
- email: text (unique)
- emailVerified: timestamp
- image: text
- password: text (hashed)
- bio: text
- createdAt: timestamp
```

#### **posts**
```sql
- id: serial (primary key)
- title: varchar(255)
- content: text
- slug: varchar(255) (unique)
- published: boolean
- authorId: text (foreign key → users.id)
- createdAt: timestamp
- updatedAt: timestamp
```

#### **categories**
```sql
- id: serial (primary key)
- name: varchar(100)
- description: text
- slug: varchar(100) (unique)
- createdAt: timestamp
```

#### **posts_to_categories** (Junction Table)
```sql
- postId: integer (foreign key → posts.id)
- categoryId: integer (foreign key → categories.id)
```

#### **accounts** (NextAuth)
```sql
- userId: text (foreign key → users.id)
- type: text
- provider: text
- providerAccountId: text
- refresh_token: text
- access_token: text
- expires_at: integer
```

#### **sessions** (NextAuth)
```sql
- sessionToken: text (primary key)
- userId: text (foreign key → users.id)
- expires: timestamp
```

### Relationships
```mermaid
erDiagram
    users ||--o{ posts : writes
    users ||--o{ accounts : has
    users ||--o{ sessions : has
    posts ||--o{ posts_to_categories : has
    categories ||--o{ posts_to_categories : has
```

---

## 🔌 API Routes

### tRPC Endpoints

#### **Posts Router** (`trpc.posts`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `getAll` | Query | Fetch all posts (with filters) | No |
| `getById` | Query | Fetch single post by ID | No |
| `getBySlug` | Query | Fetch single post by slug | No |
| `create` | Mutation | Create new post | Yes |
| `update` | Mutation | Update existing post | Yes (author only) |
| `delete` | Mutation | Delete post | Yes (author only) |

#### **Categories Router** (`trpc.categories`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `getAll` | Query | Fetch all categories | No |
| `getById` | Query | Fetch single category | No |
| `create` | Mutation | Create new category | Yes |
| `update` | Mutation | Update category | Yes |
| `delete` | Mutation | Delete category | Yes |

#### **Users Router** (`trpc.users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `getById` | Query | Fetch user profile | No |
| `getPostsCount` | Query | Get user's post statistics | No |

### REST Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | No |
| `POST` | `/api/ai/summarize` | Generate AI summary | No |
| `PATCH` | `/api/user/profile` | Update user profile | Yes |

---

### Manual Deployment
```bash
# Build for production
yarn build

# Start production server
yarn start
```

---

## 📁 Project Structure
```
blogsmith/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── ai/summarize/        # AI summarization
│   │   ├── auth/                # NextAuth endpoints
│   │   └── user/                # User management
│   ├── auth/                     # Auth pages
│   │   ├── signin/              # Sign in page
│   │   └── signup/              # Sign up page
│   ├── author/[id]/             # Author profile pages
│   ├── blog/                     # Blog pages
│   │   ├── new/                 # Create post
│   │   ├── edit/[id]/           # Edit post
│   │   └── post/[slug]/         # View post
│   ├── dashboard/               # Dashboard
│   │   └── categories/          # Category management
│   ├── profile/                 # User profile
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/                   # React components
│   ├── ai-summary.tsx           # AI summary component
│   ├── blog-card.tsx            # Blog post card
│   ├── navbar.tsx               # Navigation bar
│   ├── rich-text-editor.tsx    # TipTap editor
│   └── session-provider.tsx     # Auth provider
├── lib/                          # Utilities
│   ├── auth.ts                  # NextAuth config
│   ├── trpc.ts                  # tRPC client
│   └── trpc-provider.tsx        # tRPC provider
├── server/                       # Backend
│   ├── api/                     # tRPC routers
│   │   ├── routers/
│   │   │   ├── posts.ts
│   │   │   ├── categories.ts
│   │   │   └── users.ts
│   │   └── root.ts
│   ├── db/                      # Database
│   │   ├── schema.ts            # Drizzle schema
│   │   └── index.ts             # DB client
│   └── trpc.ts                  # tRPC setup
├── public/                       # Static files
│   └── assets/images/           # Images
├── types/                        # TypeScript types
│   └── next-auth.d.ts
├── .env                          # Environment variables
├── drizzle.config.ts            # Drizzle configuration
├── middleware.ts                # Auth middleware
├── package.json
├── tailwind.config.js
└── tsconfig.json
```
---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation for new features
- Test thoroughly before submitting PR

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Contact

**Jyotiraditya Gautam**

- GitHub: [@Jyotir-1924](https://github.com/Jyotir-1924)
- LinkedIn: [Jyotiraditya Gautam](https://www.linkedin.com/in/jyotiradityagautam/)
- Email: jyotiradityagautam@gmail.com

**Project Link:** [https://github.com/Jyotir-1924/special-broccoli](https://github.com/Jyotir-1924/special-broccoli)

**Live Demo:** [Vercel Link](https://blogsmith-tau.vercel.app/)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [tRPC](https://trpc.io/) - End-to-end type safety
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [OpenAI](https://openai.com/) - AI Summarization
- [Vercel](https://vercel.com/) - Deployment
- [Neon](https://neon.tech/) - PostgreSQL Hosting

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/Jyotir-1924/special-broccoli?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/Jyotir-1924/special-broccoli?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/Jyotir-1924/special-broccoli?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Jyotir-1924/special-broccoli?style=flat-square)

---

<div align="center">
  
  ### ⭐ Star this repository if you found it helpful!
  
  **Built with ❤️ by Jyotiraditya Gautam**
  
  © 2025 Blogsmith. All rights reserved.
  
</div>