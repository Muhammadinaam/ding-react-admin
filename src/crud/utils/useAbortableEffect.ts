import { useEffect, type DependencyList } from "react";

/**
 * Runs an async effect with an `AbortSignal` that aborts on cleanup.
 * Use with `params.signal` on DataProvider reads and `isAbortError` in catch blocks.
 */
export function useAbortableEffect(
  effect: (signal: AbortSignal) => void | Promise<void>,
  deps: DependencyList,
): void {
  useEffect(() => {
    const controller = new AbortController();
    void effect(controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
