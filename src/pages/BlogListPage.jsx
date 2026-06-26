import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, Tag, ArrowRight, BookOpen } from "lucide-react";
import { getAllPosts, getAllTags, getReadingTime } from "../utils/blog";
import { useSEO } from "../utils/useSEO.js";
import CtaFooter from "../sections/CtaFooter.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const BlogListPage = ({ onOpenInquiry = () => {} }) => {
  const { t, locale } = useLanguage();
  const allPosts = getAllPosts();
  const allTags = getAllTags();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  useSEO({ key: "blog" });

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [allPosts, searchQuery, activeTag]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <>
      <section className="relative min-h-screen pt-32 pb-24">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="glow-orb top-[10%] left-[20%] w-glow-lg h-glow-lg" />
        <div className="glow-orb top-[60%] right-[10%] w-glow h-glow" />
        <div className="absolute inset-0 bg-dots" />
      </div>

      <div className="container relative z-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-16 max-w-3xl"
        >
          <div className="pill mb-6">
            <BookOpen size={12} className="inline mr-2 -mt-px" />
            {t('blog.pill')}
          </div>
          <h1 className="section-title mb-4">
            {t('blog.title')}
          </h1>
          <p className="section-sub">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
        >
          {/* Search */}
          <div className="relative max-w-md w-full">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle"
            />
            <input
              id="blog-search"
              type="text"
              placeholder={t('blog.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-dark-400/50 bg-dark-50/50 py-3 pl-11 pr-4 font-sans text-sm text-text placeholder:text-text-subtle/60 outline-none transition-all duration-300 focus:border-lime/30 focus:ring-1 focus:ring-lime/20"
            />
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`rounded border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all duration-300 ${
                !activeTag
                  ? "border-lime/30 bg-lime/10 text-lime"
                  : "border-text/10 bg-text/5 text-text-subtle hover:border-text/30 hover:text-text-muted"
              }`}
            >
              {t('blog.allTags')}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`rounded border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all duration-300 ${
                  activeTag === tag
                    ? "border-lime/30 bg-lime/10 text-lime"
                    : "border-text/10 bg-text/5 text-text-subtle hover:border-text/30 hover:text-text-muted"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="divider mb-12" />

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <Search size={48} className="text-dark-400 mb-4" />
            <p className="text-lg font-medium text-text-muted mb-2">
              {t('blog.noArticles')}
            </p>
            <p className="text-sm text-text-subtle">
              {t('blog.noArticlesSub')}
            </p>
          </motion.div>
        )}

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="mb-16"
          >
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group block card p-0 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Cover Image */}
                {featuredPost.coverImage && (
                  <div className="lg:w-1/2 h-64 lg:h-auto overflow-hidden">
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Content */}
                <div className={`p-8 md:p-10 flex flex-col justify-center ${featuredPost.coverImage ? 'lg:w-1/2' : 'w-full'}`}>
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 rounded border border-lime/30 bg-lime/10 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-lime">
                      {t('blog.featured')}
                    </span>
                    {featuredPost.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded border border-text/10 bg-text/5 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-text-subtle"
                      >
                        <Tag size={9} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-sans text-2xl md:text-3xl font-bold text-text mb-4 leading-tight tracking-tight group-hover:text-lime transition-colors duration-300">
                    {featuredPost.title}
                  </h2>
                  <p className="text-text-muted text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                    {featuredPost.summary}
                  </p>
                  <div className="flex items-center gap-4 text-text-subtle text-xs">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {new Date(featuredPost.date).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {getReadingTime(featuredPost.content)}
                    </span>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lime group-hover:gap-3 transition-all duration-300">
                    {t('blog.readArticle')}
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Post Grid */}
        {remainingPosts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group card flex flex-col h-full overflow-hidden"
                >
                  {/* Cover */}
                  {post.coverImage && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex flex-col flex-1 p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-text/10 bg-text/5 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-text-subtle"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-sans text-lg font-bold text-text mb-3 leading-snug tracking-tight group-hover:text-lime transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-text-muted text-sm leading-relaxed line-clamp-3 mb-auto">
                      {post.summary}
                    </p>

                    {/* Meta */}
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
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
    <CtaFooter onOpenInquiry={onOpenInquiry} />
  </>
  );
};

export default BlogListPage;
