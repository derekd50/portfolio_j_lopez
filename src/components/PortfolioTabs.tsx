"use client";

import { useState } from "react";
import { Article } from "@/types/article";
import ArticleGrid from "./ArticleGrid";

interface PortfolioTabsProps {
  articles: Article[];
  copyItems: Article[];
}

type Tab = "journalism" | "copy";

const PREVIEW_COUNT = 6;

function CopySection({ title, items }: { title: string; items: Article[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, PREVIEW_COUNT);
  const hasMore = items.length > PREVIEW_COUNT;

  return (
    <div>
      <h4 className="text-xl font-bold text-slate-800 mb-6">{title}</h4>
      <ArticleGrid articles={visible} />
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="px-6 py-2 rounded-full text-sm font-semibold border border-slate-300 text-slate-600 bg-white hover:border-slate-500 transition-all duration-200"
          >
            {expanded ? "Show less" : `Show ${items.length - PREVIEW_COUNT} more`}
          </button>
        </div>
      )}
    </div>
  );
}

export default function PortfolioTabs({ articles, copyItems }: PortfolioTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("copy");

  const blogs = copyItems.filter((i) => i.category === "Blog");
  const social = copyItems.filter((i) => i.category === "Social");

  return (
    <div>
      <div className="flex gap-2 mb-10">
        <button
          onClick={() => setActiveTab("copy")}
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
            activeTab === "copy"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
          }`}
        >
          Copywriting
        </button>
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
      </div>

      {activeTab === "journalism" && <ArticleGrid articles={articles} />}

      {activeTab === "copy" && (
        <div className="space-y-14">
          {blogs.length > 0 && <CopySection title="Blogs" items={blogs} />}
          {social.length > 0 && <CopySection title="Social Posts" items={social} />}
          {copyItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No copy items available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
