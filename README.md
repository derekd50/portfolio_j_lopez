# Journalist Portfolio Site

A modern, static portfolio website for Jalen Lopez showcasing published works, featured PDF pieces, and copywriting samples. Built with Next.js and deployed via GitHub Pages.

## Features

- **Three-Tab Portfolio** — Featured (PDFs), Copywriting (Blogs & Social), and Journalism tabs
- **Featured PDF Section** — Showcase long-form pieces with optional award badges and "Coming Soon" placeholders
- **Show More / Show Less** — Expandable lists on tabs with more than six items
- **Static Export** — Deploys as pure HTML/CSS/JS to GitHub Pages
- **Responsive Design** — Mobile-friendly with Tailwind CSS
- **Dark Hero Section** — Full-bleed background image with headshot and bio card

## Tech Stack

- **Next.js 16** — React framework with static export support
- **React 19** — Latest React
- **TypeScript** — Type-safe development
- **Tailwind CSS 4** — Utility-first styling
- **GitHub Pages** — Free hosting with automatic deployment via GitHub Actions

## Quick Start

### Development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site locally.

### Edit Portfolio Content

Edit `public/data/portfolio.json` to update:
- Journalist name, bio tagline, email, and social links
- `articles` — journalism publication links (Journalism tab)
- `copyItems` — blog posts and social posts (Copywriting tab)
- `featuredItems` — PDF documents (Featured tab)

### Add Images

Place images in `public/images/`:
- `Headshot.jpg` — circular headshot shown in the hero section
- `sa_skyline_retro.png` — hero background image

### Build & Deploy

```bash
npm run build  # Creates static export in ./out
```

Push to the `main` branch — GitHub Actions builds and deploys automatically.

## GitHub Pages Deployment

The site is configured as a GitHub Pages user page (no `basePath` required). The `NEXT_PUBLIC_BASE_PATH` environment variable is available if you need to adjust asset paths for a project-page repo.

### GitHub Actions Workflow

The workflow at `.github/workflows/deploy.yml` runs on every push to `main`:

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
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
```

Enable Pages in your repository settings (Source: GitHub Actions) to activate deployment.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page (hero, portfolio, contact sections)
│   └── globals.css       # Global styles
├── components/
│   ├── ArticleCard.tsx   # Card for journalism/copy links
│   ├── ArticleGrid.tsx   # Responsive grid of ArticleCards
│   ├── CategoryFilter.tsx
│   ├── FeaturedCard.tsx  # PDF card with optional award badge
│   ├── Header.tsx        # Top navigation bar
│   ├── PortfolioTabs.tsx # Featured / Copywriting / Journalism tabs
│   ├── SearchBar.tsx
│   └── SocialLinks.tsx   # Email, LinkedIn, Twitter icons
├── types/
│   └── article.ts        # TypeScript interfaces (Article, FeaturedItem)
public/
├── data/
│   └── portfolio.json    # All portfolio content
├── images/
│   ├── Headshot.jpg
│   └── sa_skyline_retro.png
└── pdfs/                 # PDF files linked from featuredItems
```

## Portfolio JSON Format

```json
{
  "journalist": {
    "name": "Your Name",
    "email": "contact@example.com",
    "bio": "Short tagline shown under your name",
    "socialLinks": {
      "twitter": "https://twitter.com/username",
      "linkedin": "https://linkedin.com/in/profile",
      "github": "https://github.com/username"
    }
  },
  "articles": [
    {
      "id": "1",
      "title": "Publication Name",
      "description": "Brief description of your work there",
      "category": "Bio",
      "url": "https://publication.com/author/you",
      "publication": "Publication Name",
      "tags": ["tag1", "tag2"]
    }
  ],
  "copyItems": [
    {
      "id": "1",
      "title": "Article Title",
      "description": "Brief description",
      "category": "Blog",
      "url": "https://example.com/article",
      "publication": "Publisher Name",
      "tags": ["tag1"]
    }
  ],
  "featuredItems": [
    {
      "id": "1",
      "title": "Piece Title",
      "description": "What this piece covers",
      "url": "/pdfs/filename.pdf",
      "award": "Optional award name"
    }
  ]
}
```

**`articles` categories:** Bio, Esports, Gaming, Guides, Features, Review, or any custom string

**`copyItems` categories:** `Blog` (shown under Blogs) or `Social` (shown under Social Posts)

**`featuredItems`:** Leave `url` empty or omit it to render a "Coming Soon" placeholder card. The optional `award` field displays an amber badge on the card.

## Scripts

- `npm run dev` — Development server
- `npm run build` — Production static export
- `npm run lint` — ESLint check

## License

MIT
