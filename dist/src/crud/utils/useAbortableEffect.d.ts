import { DependencyList } from 'react';
/**
 * Runs an async effect with an `AbortSignal` that aborts on cleanup.
 * Use with `params.signal` on DataProvider reads and `isAbortError` in catch blocks.
 */
export declare function useAbortableEffect(effect: (signal: AbortSignal) => void | Promise<void>, deps: DependencyList): void;
//# sourceMappingURL=useAbortableEffect.d.ts.map