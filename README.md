# Multi-User Blogging Platform

A modern, full-stack blogging platform built with Next.js 15, PostgreSQL, Drizzle ORM, and tRPC. This project demonstrates type-safe API development, database management, and a clean, responsive UI.

## 🚀 Features

### Core Features
- ✅ **Blog Post Management**: Full CRUD operations for blog posts
- ✅ **Category System**: Create, manage, and assign categories to posts
- ✅ **Draft & Published Status**: Save posts as drafts or publish them
- ✅ **Category Filtering**: Filter blog posts by category
- ✅ **Slug-based URLs**: SEO-friendly URLs for all posts
- ✅ **Responsive Design**: Mobile-first, fully responsive UI
- ✅ **Type-Safe APIs**: End-to-end type safety with tRPC

### Pages
- **Landing Page**: Hero section, features showcase, and footer
- **Blog Listing**: View all published posts with category filtering
- **Individual Post View**: Read full blog posts
- **Dashboard**: Manage all posts (drafts and published)
- **Post Editor**: Create and edit blog posts with category assignment

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data fetching and caching (via tRPC)

### Backend
- **tRPC** - End-to-end type-safe APIs
- **Drizzle ORM** - Type-safe database ORM
- **PostgreSQL** - Relational database (hosted on Neon)
- **Zod** - Schema validation

### State Management
- **Zustand** - Global state management (where needed)
- **React Query** - Server state management

## 📦 Installation

### Prerequisites
- Node.js 20.9.0 or higher
- npm, yarn, or pnpm
- PostgreSQL database (local or cloud-hosted like Neon)

### Setup Steps

1. **Clone the repository**
```bash
   git clone <repository-url>
   cd blog-platform-project
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
   DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

4. **Generate and push database schema**
```bash
   yarn drizzle-kit generate
   yarn drizzle-kit push
```

5. **Run the development server**
```bash
   yarn dev
   # or
   npm run dev
```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure
```
blog-platform-project/
├── app/                      # Next.js App Router
│   ├── api/
│   │   └── trpc/[trpc]/     # tRPC API endpoint
│   ├── blog/                # Blog pages
│   ├── dashboard/           # Dashboard pages
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── navbar.tsx
│   ├── blog-card.tsx
│   └── ...
├── server/                  # Backend logic
│   ├── api/
│   │   ├── routers/        # tRPC routers
│   │   │   ├── posts.ts
│   │   │   └── categories.ts
│   │   └── root.ts         # Main router
│   ├── db/
│   │   ├── schema.ts       # Database schema
│   │   └── index.ts        # Database client
│   └── trpc.ts             # tRPC configuration
├── lib/                     # Utilities
│   ├── trpc.ts             # tRPC client
│   └── trpc-provider.tsx   # tRPC provider
├── drizzle/                 # Database migrations
├── .env                     # Environment variables
├── drizzle.config.ts       # Drizzle configuration
├── package.json
└── README.md
```

## 🗄️ Database Schema

### Tables

**posts**
- `id` - Primary key
- `title` - Post title
- `content` - Post content (text)
- `slug` - URL-friendly slug (unique)
- `published` - Published status (boolean)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

**categories**
- `id` - Primary key
- `name` - Category name
- `description` - Optional description
- `slug` - URL-friendly slug (unique)
- `createdAt` - Creation timestamp

**posts_to_categories** (Junction Table)
- `postId` - Foreign key to posts
- `categoryId` - Foreign key to categories
- Many-to-many relationship

## 🔌 API Endpoints (tRPC)

### Posts Router (`trpc.posts`)

- `getAll` - Fetch all posts (with optional filters)
- `getById` - Fetch single post by ID
- `getBySlug` - Fetch single post by slug
- `create` - Create new post
- `update` - Update existing post
- `delete` - Delete post

### Categories Router (`trpc.categories`)

- `getAll` - Fetch all categories
- `getById` - Fetch single category
- `create` - Create new category
- `update` - Update existing category
- `delete` - Delete category

## 🎨 UI Components

- **Navbar** - Site navigation with links
- **BlogCard** - Post preview card component
- **Hero Section** - Landing page hero
- **Features Section** - Platform features showcase
- **Footer** - Site footer

## 🚧 Development

### Available Scripts
```bash
# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Generate database migrations
yarn drizzle-kit generate

# Push schema to database
yarn drizzle-kit push

# Open Drizzle Studio (database GUI)
yarn drizzle-kit studio
```

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `NEXT_PUBLIC_APP_URL` | App URL (optional, for production) | `https://yourdomain.com` |

## 📝 Features Roadmap

### Completed ✅
- [x] Blog post CRUD
- [x] Category management
- [x] Category filtering
- [x] Landing page
- [x] Blog listing page
- [x] Responsive design

### In Progress 🚧
- [ ] Individual blog post page
- [ ] Post editor with markdown support
- [ ] Dashboard page

### Planned 📋
- [ ] Search functionality
- [ ] Post statistics (word count, reading time)
- [ ] Dark mode
- [ ] Image upload
- [ ] SEO meta tags
- [ ] Pagination

## 🤝 Contributing

This is an assignment/portfolio project. Contributions are not currently accepted.

## 📄 License

This project is created for educational/assignment purposes.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Built as part of a full-stack development assignment
- Tech stack: Next.js, tRPC, Drizzle ORM, PostgreSQL
- Deployed on: [Vercel/Your hosting platform]

---

**Note**: This project was completed in [X days] as part of a technical assessment demonstrating full-stack development skills with modern web technologies.