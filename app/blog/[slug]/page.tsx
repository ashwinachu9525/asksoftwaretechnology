import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Calendar, User, ArrowLeft, Share2, Sparkles, BookOpen } from 'lucide-react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

export const revalidate = 0;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  // Related articles
  const relatedPosts = await prisma.post.findMany({
    where: {
      id: { not: post.id },
    },
    take: 2,
  });

  return (
    <article className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6 pb-8 border-b border-slate-800">
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.25]">
          {post.title}
        </h1>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{post.author}</p>
              <p className="text-xs text-slate-400">ABC Technologies Engineering</p>
            </div>
          </div>
        </div>
      </div>

      {/* Excerpt callout */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border-l-4 border-blue-500 text-slate-200 font-medium text-lg italic leading-relaxed">
        &ldquo;{post.excerpt}&rdquo;
      </div>

      {/* Content */}
      <MarkdownRenderer content={post.content} />

      {/* Author Bio Box */}
      <div className="glass-card p-8 rounded-3xl mt-16 space-y-4 border border-white/10">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-extrabold text-white text-xl">
            {post.author.charAt(0)}
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">About the Author: {post.author}</h4>
            <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">ABC Architecture & Research Group</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Our senior engineers and systems architects regularly share industry insights, benchmarking reports, and architectural deep-dives. Want to consult directly with our team?
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300"
          >
            <span>Schedule Architecture Discovery Call</span>
            <Sparkles className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="space-y-6 pt-12 border-t border-slate-800">
          <h3 className="text-2xl font-bold text-white">More Engineering Insights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rel: any) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-blue-500/50 transition-all"
              >
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">{rel.category}</span>
                  <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
