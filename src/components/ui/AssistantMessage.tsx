import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownComponents: Components = {
	h1: ({ children }) => (
		<h1 className="mb-3 mt-5 text-lg font-bold leading-snug text-white first:mt-0">
			{children}
		</h1>
	),
	h2: ({ children }) => (
		<h2 className="mb-2 mt-5 border-b border-white/10 pb-2 text-base font-semibold leading-snug text-white first:mt-0">
			{children}
		</h2>
	),
	h3: ({ children }) => (
		<h3 className="mb-2 mt-4 text-sm font-semibold leading-snug text-white first:mt-0">
			{children}
		</h3>
	),
	p: ({ children }) => (
		<p className="my-2 leading-7 last:mb-0 first:mt-0">{children}</p>
	),
	ul: ({ children }) => (
		<ul className="my-3 list-disc space-y-2 pl-5 marker:text-red-400 last:mb-0">
			{children}
		</ul>
	),
	ol: ({ children }) => (
		<ol className="my-3 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-red-400 last:mb-0">
			{children}
		</ol>
	),
	li: ({ children }) => <li className="py-0.5 pl-1 leading-7">{children}</li>,
	strong: ({ children }) => (
		<strong className="font-semibold text-white">{children}</strong>
	),
	em: ({ children }) => <em className="text-zinc-100">{children}</em>,
	blockquote: ({ children }) => (
		<blockquote className="my-4 rounded-r-lg border-l-2 border-red-500/70 bg-black/20 py-2 pl-4 pr-3 text-zinc-300">
			{children}
		</blockquote>
	),
	hr: () => <hr className="my-5 border-white/10" />,
	code: ({ children, className }) =>
		className ? (
			<code className={`${className} font-mono text-xs leading-6`}>
				{children}
			</code>
		) : (
			<code className="rounded-md border border-white/10 bg-black/40 px-1.5 py-0.5 font-mono text-[0.9em] text-red-200">
				{children}
			</code>
		),
	pre: ({ children }) => (
		<pre className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-4 text-xs leading-6">
			{children}
		</pre>
	),
	table: ({ children }) => (
		<section
			aria-label="Tabela da resposta"
			className="my-4 overflow-x-auto rounded-xl border border-white/10"
		>
			<table className="w-full border-collapse text-left text-xs sm:text-sm">
				{children}
			</table>
		</section>
	),
	thead: ({ children }) => (
		<thead className="bg-white/5 text-zinc-100">{children}</thead>
	),
	th: ({ children }) => (
		<th className="whitespace-nowrap border-b border-white/10 px-3 py-2.5 font-semibold sm:px-4">
			{children}
		</th>
	),
	td: ({ children }) => (
		<td className="min-w-28 border-b border-white/5 px-3 py-2.5 align-top leading-6 last:border-0 sm:px-4">
			{children}
		</td>
	),
	a: ({ children, href }) => (
		<a
			href={href}
			className="text-red-300 underline decoration-red-500/40 underline-offset-2 hover:text-red-200"
			rel="noreferrer"
			target="_blank"
		>
			{children}
		</a>
	),
};

export default function AssistantMessage({ content }: { content: string }) {
	return (
		<div className="max-w-[85%] min-w-0 wrap-break-word rounded-2xl rounded-tl-md border border-white/8 bg-zinc-900 px-4 py-3 text-sm leading-7 text-zinc-200 sm:max-w-[80%] sm:px-5 sm:py-4">
			<ReactMarkdown
				components={markdownComponents}
				remarkPlugins={[remarkGfm]}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
