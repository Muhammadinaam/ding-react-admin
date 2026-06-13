import { useEffect, useRef, type MutableRefObject } from "react";
import {
  useFormContext,
  useFormState,
  type FieldPath,
  type FieldValues,
  type FormState,
  type UseFormGetFieldState,
} from "react-hook-form";

export function sectionHasError<T extends FieldValues>(
  sources: Set<string>,
  getFieldState: UseFormGetFieldState<T>,
  formState: FormState<T>,
): boolean {
  for (const source of sources) {
    if (getFieldState(source as FieldPath<T>, formState).invalid) {
      return true;
    }
  }
  return false;
}

export function useSectionSourceRefs(count: number) {
  const refs = useRef<MutableRefObject<Set<string>>[]>([]);

  while (refs.current.length < count) {
    refs.current.push({ current: new Set() });
  }
  if (refs.current.length > count) {
    refs.current.length = count;
  }

  return refs.current;
}

export function useActivateFirstErrorSection(
  sectionRefs: MutableRefObject<Set<string>>[],
  activate: (index: number) => void,
) {
  const { control, getFieldState, setFocus } = useFormContext<FieldValues>();
  const formState = useFormState({ control });
  const prevSubmitCount = useRef(0);
  const prevErrorCount = useRef(0);

  useEffect(() => {
    if (formState.submitCount === 0) return;

    const errorCount = Object.keys(formState.errors).length;
    const submitChanged = formState.submitCount !== prevSubmitCount.current;
    const serverErrorsArrived =
      !submitChanged && errorCount > 0 && prevErrorCount.current === 0;

    prevSubmitCount.current = formState.submitCount;
    prevErrorCount.current = errorCount;

    if ((!submitChanged && !serverErrorsArrived) || errorCount === 0) {
      return;
    }

    const first = sectionRefs.findIndex((ref) =>
      sectionHasError(ref.current, getFieldState, formState),
    );
    if (first < 0) return;

    activate(first);

    const firstInvalid = [...sectionRefs[first].current].find((source) =>
      getFieldState(source as FieldPath<FieldValues>, formState).invalid,
    );
    if (firstInvalid) {
      requestAnimationFrame(() => {
        void setFocus(firstInvalid as FieldPath<FieldValues>);
      });
    }
  }, [
    activate,
    formState,
    formState.errors,
    formState.submitCount,
    getFieldState,
    sectionRefs,
    setFocus,
  ]);
}
