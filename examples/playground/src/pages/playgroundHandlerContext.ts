import type { PlaygroundMemoryApi } from "../api/memoryApi";

export type PlaygroundHandlerContext = {
  api: PlaygroundMemoryApi;
  nextId: () => number;
};

let entitySeq = 1_000;

export function createPlaygroundHandlerContext(
  api: PlaygroundMemoryApi,
): PlaygroundHandlerContext {
  return {
    api,
    nextId: () => entitySeq++,
  };
}

/** Reset id sequence in tests. */
export function resetPlaygroundEntityIdSequence(start = 1_000) {
  entitySeq = start;
}
