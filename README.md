# 🖋️ Inkwell

A modern, elegant blogging platform built with Next.js that empowers writers to share their stories with the world.

![Inkwell Banner](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## ✨ Features

- **🎨 Beautiful UI** - Clean, modern interface built with shadcn/ui components
- **📝 Rich Text Editor** - Write and format your stories with ease
- **🔐 User Authentication** - Secure sign-up and login functionality
- **📱 Responsive Design** - Perfect reading experience on any device
- **⚡ Fast Performance** - Built on Next.js 16 with optimized loading
- **🗄️ Database Integration** - Powered by Drizzle ORM for efficient data management
- **🌐 SEO Optimized** - Server-side rendering for better search visibility

## 🚀 Live Demo

Check out the live application: [blog-app-opal-alpha.vercel.app](https://blog-app-opal-alpha.vercel.app)

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- A PostgreSQL database (or your preferred database)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dndmein-rgb/Inkwell.git
   cd Inkwell
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   DATABASE_URL=your_database_connection_string
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   # Add other required environment variables
   ```

4. **Run database migrations**
   ```bash
   npm run db:push
   # or
   npx drizzle-kit push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see your application running.

## 📁 Project Structure

```
Inkwell/
├── .vscode/          # VS Code configuration
├── drizzle/          # Database migrations
├── public/           # Static assets
├── src/
│   ├── app/         # Next.js app directory (pages & routing)
│   ├── components/  # React components
│   ├── lib/         # Utility functions & configurations
│   └── db/          # Database schema & queries
├── components.json   # shadcn/ui configuration
├── drizzle.config.ts # Drizzle ORM configuration
└── package.json      # Project dependencies
```

## 🎯 Usage

### Creating a New Post
1. Sign in to your account
2. Click on "Create Story" or "Write"
3. Compose your story using the rich text editor
4. Add a title, tags, and optional cover image
5. Publish or save as draft

### Reading Stories
- Browse the homepage to discover stories
- Use the search feature to find specific topics
- Filter by categories or tags
- Follow your favorite authors

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio for database management

### Database Management

This project uses Drizzle ORM for database operations. To manage your database:

```bash
# Generate migrations
npx drizzle-kit generate

# Run migrations
npx drizzle-kit push

# Open Drizzle Studio
npx drizzle-kit studio
```

## 🚢 Deployment

### Deploy to Vercel

The easiest way to deploy Inkwell is using the [Vercel Platform](https://vercel.com):

1. Push your code to a GitHub repository
2. Import your repository to Vercel
3. Configure environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dndmein-rgb/Inkwell)

### Other Deployment Options

Inkwell can be deployed to any platform that supports Next.js:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs) - For the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) - For beautiful UI components
- [Drizzle ORM](https://orm.drizzle.team/) - For the excellent ORM
- [Vercel](https://vercel.com/) - For hosting and deployment




  <br><br>
  If you find this project helpful, please consider giving it a ⭐️
</div>
