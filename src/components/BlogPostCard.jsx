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
        "group card flex flex-col h-full overflow-hidden border-0 bg-dark-100/75 hover:bg-dark-200/90 transition-colors duration-200 rounded-2xl",
        isCompact && "p-5"
      )}
    >
      {/* Cover Image (Only for default variant) */}
      {!isCompact && post.coverImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className={cn("flex flex-col flex-1", !isCompact ? "p-6" : "pt-0")}>
        {/* Tags */}
        <div className={cn("flex flex-wrap gap-2 mb-4", isCompact && "gap-1.5 mb-3")}>
          {post.tags.slice(0, isCompact ? 2 : 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-dark-200 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted border-0"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-heading font-normal text-text group-hover:text-lime transition-colors duration-200 leading-snug tracking-tight",
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
          <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-lime">
            {t("blog.read")}
            <ChevronRight size={12} />
          </span>
        ) : (
          <div className="mt-auto pt-4 border-0 flex items-center justify-between text-text-subtle text-xs">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              {new Date(post.date ? `${post.date}T12:00:00` : Date.now()).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
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
