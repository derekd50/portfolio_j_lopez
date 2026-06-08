import Image from "next/image";
import Header from "@/components/Header";
import PortfolioTabs from "@/components/PortfolioTabs";
import SocialLinks from "@/components/SocialLinks";
import { Article } from "@/types/article";
import fs from "fs";
import path from "path";

// Load portfolio data from JSON file
async function getPortfolioData() {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "portfolio.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error loading portfolio data:", error);
    return { journalist: {}, articles: [] };
  }
}

export default async function Home() {
  const portfolioData = await getPortfolioData();
  const { journalist, articles, copyItems, featuredItems } = portfolioData;

  const sortedArticles = [...(articles || [])].sort(
    (a: Article, b: Article) => Number(a.id) - Number(b.id)
  );
  const sortedCopyItems = [...(copyItems || [])].sort(
    (a: Article, b: Article) => Number(a.id) - Number(b.id)
  );
  const sortedFeaturedItems = [...(featuredItems || [])].sort(
    (a: { id: string }, b: { id: string }) => Number(a.id) - Number(b.id)
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        {/* Top image hero */}
        <section className="relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/sa_skyline_retro.png`}
              alt="Journalism hero banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-slate-950/70" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="text-white">
                <div className="relative w-44 h-44 mb-6">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/Headshot.jpg`}
                    alt={journalist.name || "Portfolio owner"}
                    fill
                    className="object-cover rounded-full border-2 border-white/20 shadow-xl"
                  />
                </div>
                <p className="text-sm uppercase tracking-[0.35em] text-blue-300 mb-4">
                  Writing Portfolio
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                  {journalist.name || "Journalist Portfolio"}
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-slate-200">
                  {journalist.bio || "Professional journalist and storyteller"}
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-lg text-white/90 max-w-sm">
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-300 mb-4">
                    Bio
                  </p>
                  <p className="text-sm leading-7 text-slate-200">
                    Copywriter and former reporter with more than six years of experience creating engaging stories and strategic content for audiences across digital, print, and social platforms. My work has been published across multiple outlets, with coverage spanning business, economic development, lifestyle, culture, and community issues. I currently lead the content team at SWBC, serving as the primary Copywriter across twelve divisions.
                  </p>
                  <a
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/pdfs/jalenlopezresume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold text-blue-300 hover:text-white transition-colors"
                  >
                    View Resume
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-16 sm:py-20 bg-stone-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold mb-2 text-slate-900">
                Portfolio
              </h3>
              <p className="text-slate-500">
                Access my published articles and pieces
              </p>
            </div>
            <PortfolioTabs articles={sortedArticles} copyItems={sortedCopyItems} featuredItems={sortedFeaturedItems} />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-stone-50 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-slate-900">
              Get in Touch
            </h3>
            <div className="bg-white border border-slate-200 rounded-3xl shadow-lg shadow-slate-200/60 p-8 sm:p-12 max-w-2xl mx-auto">
              <p className="text-slate-600 mb-6 text-center">
                Good content starts with a conversation.
              </p>
              <div className="flex justify-center">
                <SocialLinks
                  twitter={journalist.socialLinks?.twitter}
                  linkedin={journalist.socialLinks?.linkedin}
                  github={journalist.socialLinks?.github}
                  email={journalist.email}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-8 text-center text-sm">
        <p>
          © {new Date().getFullYear()} {journalist.name || "Portfolio"}. All
          rights reserved.
        </p>
      </footer>
    </>
  );
}

