import Image from "next/image";
import Header from "@/components/Header";
import ArticleGrid from "@/components/ArticleGrid";
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
  const { journalist, articles } = portfolioData;

  const sortedArticles = [...(articles || [])].sort(
    (a: Article, b: Article) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-950">
        {/* Top image hero */}
        <section className="relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0">
            <Image
              src="/images/sa_skyline_retro.png"
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
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">
                  Journalist Portfolio
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                  {journalist.name || "Journalist Portfolio"}
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-slate-200">
                  {journalist.bio || "Professional journalist and storyteller"}
                </p>
              </div>
              <div className="hidden lg:flex justify-end">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-lg text-white/90 max-w-sm">
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 mb-4">
                    Featured Links
                  </p>
                  <p className="text-sm leading-7 text-slate-200">
                    Access the journalist's work across multiple publishing sites with a clean directory-style presentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-16 sm:py-20 bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold mb-2 text-white">
                Featured Works
              </h3>
              <p className="text-slate-400">
                Browse through my published articles and pieces
              </p>
            </div>
            <ArticleGrid articles={sortedArticles} />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-slate-900 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">
              Get in Touch
            </h3>
            <div className="bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl shadow-slate-950/40 p-8 sm:p-12 max-w-2xl mx-auto">
              <p className="text-slate-300 mb-6 text-center">
                Interested in collaborating or discussing a story? Feel free to
                reach out.
              </p>
              <div className="flex justify-center">
                <SocialLinks
                  twitter={journalist.socialLinks?.twitter}
                  linkedin={journalist.socialLinks?.linkedin}
                  github={journalist.socialLinks?.github}
                  email={journalist.email}
                />
              </div>
              {journalist.email && (
                <p className="text-center mt-6 text-slate-400">
                  Email:{" "}
                  <a
                    href={`mailto:${journalist.email}`}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    {journalist.email}
                  </a>
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>
          © {new Date().getFullYear()} {journalist.name || "Portfolio"}. All
          rights reserved.
        </p>
      </footer>
    </>
  );
}

