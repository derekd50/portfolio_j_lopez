"use client";

import { useState } from "react";
import { Article, FeaturedItem } from "@/types/article";
import ArticleGrid from "./ArticleGrid";
import FeaturedCard from "./FeaturedCard";

interface PortfolioTabsProps {
  articles: Article[];
  copyItems: Article[];
  featuredItems: FeaturedItem[];
}

type Tab = "all" | "featured" | "journalism" | "copy";

const PREVIEW_COUNT = 6;

function AllSection({ articles, copyItems, featuredItems }: PortfolioTabsProps) {
  const publications = articles.filter((a) => a.category !== "Rankings");
  const rankings = articles.filter((a) => a.category === "Rankings");
  const blogs = copyItems.filter((i) => i.category === "Blog");
  const social = copyItems.filter((i) => i.category === "Social");

  return (
    <div className="space-y-14">
      {featuredItems.length > 0 && (
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-6">Featured</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <FeaturedCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
      {blogs.length > 0 && (
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-6">Blogs</h4>
          <ArticleGrid articles={blogs} showCount={false} />
        </div>
      )}
      {social.length > 0 && (
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-6">Social Posts</h4>
          <ArticleGrid articles={social} showCount={false} />
        </div>
      )}
      {publications.length > 0 && (
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-6">Publications</h4>
          <ArticleGrid articles={publications} showCount={false} />
        </div>
      )}
      {rankings.length > 0 && (
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-6">Rankings & Reports</h4>
          <ArticleGrid articles={rankings} showCount={false} />
        </div>
      )}
    </div>
  );
}

function JournalismSection({ articles }: { articles: Article[] }) {
  const publications = articles.filter((a) => a.category !== "Rankings");
  const rankings = articles.filter((a) => a.category === "Rankings");

  return (
    <div className="space-y-14">
      {publications.length > 0 && <CopySection title="Publications" items={publications} />}
      {rankings.length > 0 && <CopySection title="Rankings & Reports" items={rankings} />}
    </div>
  );
}

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

export default function PortfolioTabs({ articles, copyItems, featuredItems }: PortfolioTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const blogs = copyItems.filter((i) => i.category === "Blog");
  const social = copyItems.filter((i) => i.category === "Social");

  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "featured", label: "Featured" },
    { id: "copy", label: "Copywriting" },
    { id: "journalism", label: "Journalism" },
  ];

  return (
    <div>
      <div className="flex gap-2 mb-10 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "all" && (
        <AllSection articles={articles} copyItems={copyItems} featuredItems={featuredItems} />
      )}

      {activeTab === "featured" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <FeaturedCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {activeTab === "journalism" && (
        <JournalismSection articles={articles} />
      )}

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