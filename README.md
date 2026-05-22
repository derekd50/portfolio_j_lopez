# Journalist Portfolio Site

A modern, static portfolio website for journalists to showcase their published works, articles, and investigative pieces. Built with Next.js and optimized for GitHub Pages hosting.

## Features

- ✅ **Portfolio Gallery** - Display articles in a responsive grid layout
- ✅ **Search & Filter** - Find articles by category, title, or tags
- ✅ **Social Media Integration** - Links to Twitter, LinkedIn, GitHub
- ✅ **Static Export** - Deploys as pure HTML/CSS/JS to GitHub Pages
- ✅ **Responsive Design** - Mobile-friendly with Tailwind CSS
- ✅ **Dark Theme** - Professional dark header with light content areas

## Tech Stack

- **Next.js 16** - React framework with static export support
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **GitHub Pages** - Free hosting with automatic deployment

## Quick Start

### Development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site locally.

### Edit Your Portfolio

Edit `public/data/portfolio.json` to update:
- Journalist name, bio, email
- Social media links
- Your articles with title, description, category, publication, and URL

### Build & Deploy

```bash
npm run build  # Create static export in ./out
```

Then deploy to GitHub Pages using the workflow below.

## GitHub Pages Deployment

### Setup

If using a **project repository** (e.g., `username/portfolio_lopez_j`):
- Edit `next.config.ts` and uncomment: `basePath: "/portfolio_lopez_j"`

If using a **user page** repository (e.g., `username/username.github.io`):
- Keep `basePath` commented out

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v2
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v2
```

Then push to GitHub and enable Pages in repository settings.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Styles
├── components/          # React components
│   ├── ArticleCard.tsx
│   ├── ArticleGrid.tsx
│   ├── CategoryFilter.tsx
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   └── SocialLinks.tsx
├── types/
│   └── article.ts       # TypeScript interfaces
public/
└── data/
    └── portfolio.json    # Your portfolio content
```

## Portfolio JSON Format

```json
{
  "journalist": {
    "name": "Your Name",
    "email": "contact@example.com",
    "bio": "Your professional bio",
    "socialLinks": {
      "twitter": "https://twitter.com/username",
      "linkedin": "https://linkedin.com/in/profile",
      "github": "https://github.com/username"
    }
  },
  "articles": [
    {
      "id": "1",
      "title": "Article Title",
      "description": "Brief description",
      "category": "News",
      "date": "2026-04-28",
      "url": "https://publication.com/article",
      "publication": "Publication Name",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

**Categories:** News, Features, Opinion, Investigation, Other

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - ESLint check

## License

MIT
