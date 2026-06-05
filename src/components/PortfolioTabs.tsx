"use client";

import { useState } from "react";
import { Article } from "@/types/article";
import ArticleGrid from "./ArticleGrid";

interface PortfolioTabsProps {
  articles: Article[];
  copyItems: Article[];
}

type Tab = "journalism" | "copy";

export default function PortfolioTabs({ articles, copyItems }: PortfolioTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("journalism");

  return (
    <div>
      <div className="flex gap-2 mb-10">
        <button
          onClick={() => setActiveTab("journalism")}
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
            activeTab === "journalism"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
          }`}
        >
          Journalism
        </button>
        <button
          onClick={() => setActiveTab("copy")}
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
            activeTab === "copy"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
          }`}
        >
          Copy
        </button>
      </div>

      {activeTab === "journalism" && <ArticleGrid articles={articles} />}

      {activeTab === "copy" && (() => {
        const blogs = copyItems.filter((i) => i.category === "Blog");
        const social = copyItems.filter((i) => i.category === "Social");
        return (
          <div className="space-y-14">
            {blogs.length > 0 && (
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-6">Blogs</h4>
                <ArticleGrid articles={blogs} />
              </div>
            )}
            {social.length > 0 && (
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-6">Social Posts</h4>
                <ArticleGrid articles={social} />
              </div>
            )}
            {copyItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500 text-lg">No copy items available.</p>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
