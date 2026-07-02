'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-renderer w-full text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed text-base sm:text-lg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 mt-8 mb-4 border-b border-slate-800/80 pb-3">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-slate-900 mt-8 mb-4 border-b border-slate-800/60 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl sm:text-2xl font-semibold text-white dark:text-white light:text-slate-900 mt-6 mb-3">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed text-slate-300 dark:text-slate-300 light:text-slate-700">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-extrabold text-white dark:text-white light:text-slate-900">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-purple-300 dark:text-purple-300 light:text-purple-800">
              {children}
            </em>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 dark:text-blue-400 light:text-blue-600 font-medium underline underline-offset-4 hover:text-blue-300 transition-colors"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-6 pl-2 text-slate-300 dark:text-slate-300 light:text-slate-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-6 pl-2 text-slate-300 dark:text-slate-300 light:text-slate-700">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="p-4 sm:p-6 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border-l-4 border-purple-500 text-slate-200 dark:text-slate-200 light:text-slate-800 italic mb-6 shadow-md">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !String(children).includes('\n');
            if (isInline) {
              return (
                <code className="px-2 py-0.5 rounded bg-slate-900 dark:bg-slate-900 light:bg-slate-200 text-purple-300 dark:text-purple-300 light:text-purple-800 font-mono text-sm border border-slate-800 dark:border-slate-800 light:border-slate-300">
                  {children}
                </code>
              );
            }
            return (
              <div className="my-6 rounded-2xl overflow-hidden border border-slate-800 dark:border-slate-800 light:border-slate-300 bg-slate-950 dark:bg-slate-950 light:bg-slate-900 shadow-2xl">
                {match && (
                  <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-mono font-bold text-slate-400 uppercase">
                    {match[1]}
                  </div>
                )}
                <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-200">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-300 shadow-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-white">
              <table className="w-full text-left border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border-b border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 font-bold uppercase tracking-wider text-xs">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-800/60 dark:divide-slate-800/60 light:divide-slate-200">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-white/5 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="p-3.5 sm:p-4 font-bold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-3.5 sm:p-4 text-slate-300 dark:text-slate-300 light:text-slate-700">
              {children}
            </td>
          ),
          img: ({ src, alt }) => {
            const srcStr = typeof src === 'string' ? src : '';
            const isVideoUrl = srcStr && /\.(mp4|webm|mov|ogg)$/i.test(srcStr);
            if (isVideoUrl) {
              return (
                <video
                  controls
                  className="rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-300 shadow-2xl max-w-full w-full my-6 object-cover mx-auto"
                  src={srcStr}
                />
              );
            }
            return (
              <img
                src={srcStr}
                alt={alt}
                className="rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-300 shadow-2xl max-w-full h-auto my-6 object-cover mx-auto max-h-[500px]"
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
