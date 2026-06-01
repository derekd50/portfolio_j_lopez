import { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";

interface ArticleGridProps {
  articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No links available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <div className="text-center text-sm text-slate-500 pt-6">
        Showing {articles.length} links
      </div>
    </div>
  );
}
