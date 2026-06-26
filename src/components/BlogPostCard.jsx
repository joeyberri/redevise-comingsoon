import { Link } from "react-router-dom";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { getReadingTime } from "../utils/blog";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { cn } from "../utils/cn";

const BlogPostCard = ({ post, variant = "default" }) => {
  const { t, locale } = useLanguage();
  const isCompact = variant === "compact";

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={cn(
        "group card flex flex-col h-full overflow-hidden",
        isCompact && "p-5"
      )}
    >
      {/* Cover Image (Only for default variant) */}
      {!isCompact && post.coverImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}

      <div className={cn("flex flex-col flex-1", !isCompact ? "p-6" : "pt-0")}>
        {/* Tags */}
        <div className={cn("flex flex-wrap gap-2 mb-4", isCompact && "gap-1.5 mb-3")}>
          {post.tags.slice(0, isCompact ? 2 : 3).map((tag) => (
            <span
              key={tag}
              className="rounded border border-text/10 bg-text/5 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-text-subtle"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-sans font-bold text-text group-hover:text-lime transition-colors duration-300 leading-snug tracking-tight",
            isCompact ? "text-sm mb-2" : "text-lg mb-3"
          )}
        >
          {post.title}
        </h3>

        {/* Summary */}
        <p
          className={cn(
            "text-text-muted text-sm leading-relaxed line-clamp-3 mb-auto",
            isCompact && "text-text-subtle text-xs line-clamp-2 mb-3"
          )}
        >
          {post.summary}
        </p>

        {/* Meta Row / Read Link */}
        {isCompact ? (
          <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {t("blog.read")}
            <ChevronRight size={12} />
          </span>
        ) : (
          <div className="mt-5 pt-4 border-t border-dark-400/20 flex items-center justify-between text-text-subtle text-xs">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              {new Date(post.date).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              {getReadingTime(post.content)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default BlogPostCard;
