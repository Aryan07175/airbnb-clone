import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { Mermaid } from "@/components/Mermaid";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: CodeBlock,
    Callout,
    Mermaid,
  };
}
