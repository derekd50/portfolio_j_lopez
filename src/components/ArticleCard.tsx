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
      className="block h-full p-6 bg-white border border-slate-200 rounded-3xl shadow-sm shadow-slate-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-100 transition-all duration-200"
    >
      <div className="flex flex-col h-full">
        {/* <span className="inline-block w-fit mb-3 px-3 py-1 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-full">
          {article.category}
        </span> */}
        <h3 className="mb-2 text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        <p className="mb-4 text-slate-600 text-sm flex-grow">
          {article.description}
        </p>
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>{article.publication}</span>
          {article.date && <time>{new Date(article.date).toLocaleDateString()}</time>}
        </div>
      </div>
    </a>
  );
}
