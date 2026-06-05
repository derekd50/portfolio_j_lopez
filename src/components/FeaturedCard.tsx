import { FeaturedItem } from "@/types/article";

interface FeaturedCardProps {
  item: FeaturedItem;
}

export default function FeaturedCard({ item }: FeaturedCardProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const isPlaceholder = !item.url;

  const cardContent = (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-600 border border-red-100">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          PDF
        </span>
      </div>
      <h3 className={`mb-3 text-xl font-bold transition-colors ${isPlaceholder ? "text-slate-400" : "text-slate-900 group-hover:text-blue-600"}`}>
        {item.title}
      </h3>
      <p className="mb-6 text-slate-500 text-sm flex-grow">{item.description}</p>
      <div className="mt-auto">
        {isPlaceholder ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            Coming Soon
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600">
            View PDF
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );

  if (isPlaceholder) {
    return (
      <div className="block h-full p-6 bg-white border border-dashed border-slate-200 rounded-3xl opacity-60">
        {cardContent}
      </div>
    );
  }

  return (
    <a
      href={`${basePath}${item.url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full p-6 bg-white border border-slate-200 rounded-3xl shadow-sm shadow-slate-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-100 transition-all duration-200"
    >
      {cardContent}
    </a>
  );
}
