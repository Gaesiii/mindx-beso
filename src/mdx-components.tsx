import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: (props) => <h1 className="mt-8 text-3xl font-semibold tracking-tight" {...props} />,
  h2: (props) => <h2 className="mt-7 text-2xl font-semibold tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-6 text-xl font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="mt-3 leading-7 text-slate-700" {...props} />,
  ul: (props) => <ul className="mt-3 ml-6 list-disc space-y-2 text-slate-700" {...props} />,
  ol: (props) => <ol className="mt-3 ml-6 list-decimal space-y-2 text-slate-700" {...props} />,
  code: (props) => <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm" {...props} />,
  pre: (props) => (
    <pre
      className="mt-4 overflow-x-auto rounded-xl border bg-slate-950 p-4 text-sm text-slate-100"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote className="mt-4 border-l-4 border-slate-300 pl-4 text-slate-700 italic" {...props} />
  ),
  a: (props) => <a className="text-blue-600 underline underline-offset-4" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
