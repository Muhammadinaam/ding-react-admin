import { ReactNode } from 'react';
export declare function isSourceHidden(source: string, hidden: boolean | undefined, hiddenSources: Set<string>): boolean;
export declare function useHiddenSources(): Set<string>;
/** Recursively hide descendant fields whose `source` is in `sources` (via context). */
export declare function HiddenSources({ sources, children, }: {
    sources: Iterable<string>;
    children: ReactNode;
}): string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import('react').ReactPortal | import('react').ReactElement<unknown, string | import('react').JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null | undefined;
//# sourceMappingURL=HiddenSources.d.ts.map