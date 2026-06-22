import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  User,
  ChevronRight,
} from "lucide-react";
import { getPostBySlug, getReadingTime, getAllPosts } from "../utils/blog";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  // Update document title for SEO
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Redevise Blog`;

      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", post.summary);

      // Update OG tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", post.title);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", post.summary);

      return () => {
        document.title = "Redevise | Optimization Infrastructure";
      };
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get related posts (same tags, excluding current)
  const relatedPosts = getAllPosts()
    .filter(
      (p) =>
        p.slug !== slug && p.tags.some((t) => post.tags.includes(t))
    )
    .slice(0, 3);

  return (
    <article className="relative min-h-screen pt-32 pb-24">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="glow-orb top-[5%] left-[50%] w-glow-lg h-glow-lg" />
        <div className="absolute inset-0 bg-dots" />
      </div>

      <div className="container relative z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-subtle hover:text-lime transition-colors duration-300 group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            Back to Blog
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-3xl mx-auto mb-12"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full border border-dark-400/40 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-text-subtle"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-text leading-tight tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Summary */}
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            {post.summary}
          </p>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-5 text-text-subtle text-sm">
            <span className="flex items-center gap-2">
              <User size={14} />
              {post.author}
            </span>
            <span className="w-px h-4 bg-dark-400/50" />
            <span className="flex items-center gap-2">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="w-px h-4 bg-dark-400/50" />
            <span className="flex items-center gap-2">
              <Clock size={14} />
              {getReadingTime(post.content)}
            </span>
          </div>
        </motion.header>

        {/* Cover Image */}
        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="max-w-4xl mx-auto mb-14 rounded-2xl overflow-hidden border border-dark-400/30"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto"
            />
          </motion.div>
        )}

        {/* Divider */}
        <div className="divider max-w-3xl mx-auto mb-14" />

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="blog-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="divider max-w-3xl mx-auto mt-16 mb-16" />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-sans text-xl font-bold text-text mb-8 tracking-tight">
              Related Articles
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group card p-5 flex flex-col"
                >
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {related.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-dark-400/30 px-2 py-0.5 text-[9px] font-medium uppercase tracking-widest text-text-subtle"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-sans text-sm font-bold text-text mb-2 leading-snug group-hover:text-lime transition-colors duration-300">
                    {related.title}
                  </h3>
                  <p className="text-text-subtle text-xs leading-relaxed line-clamp-2 mb-3">
                    {related.summary}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read
                    <ChevronRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </article>
  );
};

export default BlogPostPage;
