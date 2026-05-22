import { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-lg shadow-slate-950/40 hover:border-cyan-400 hover:shadow-cyan-500/20 transition-all duration-200"
    >
      <div className="flex flex-col h-full">
        <span className="inline-block w-fit mb-3 px-3 py-1 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-full">
          {article.category}
        </span>
        <h3 className="mb-2 text-xl font-bold text-white hover:text-cyan-300 transition-colors">
          {article.title}
        </h3>
        <p className="mb-4 text-slate-300 text-sm flex-grow">
          {article.description}
        </p>
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>{article.publication}</span>
          <time>{new Date(article.date).toLocaleDateString()}</time>
        </div>
      </div>
    </a>
  );
}
