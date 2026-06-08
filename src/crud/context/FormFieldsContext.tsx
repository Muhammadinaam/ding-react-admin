import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";

type FormFieldsContextValue = {
  registerSource: (source: string) => () => void;
  getSources: () => string[];
};

const FormFieldsContext = createContext<FormFieldsContextValue | null>(null);

export function FormFieldsProvider({
  children,
  sourcesRef: externalSourcesRef,
}: {
  children: ReactNode;
  /** Optional ref shared with submit handler outside this provider. */
  sourcesRef?: MutableRefObject<Set<string>>;
}) {
  const internalSourcesRef = useRef(new Set<string>());
  const sourcesRef = externalSourcesRef ?? internalSourcesRef;

  const registerSource = useCallback(
    (source: string) => {
      sourcesRef.current.add(source);
      return () => {
        sourcesRef.current.delete(source);
      };
    },
    [sourcesRef],
  );

  const getSources = useCallback(
    () => Array.from(sourcesRef.current),
    [sourcesRef],
  );

  const value = useMemo(
    () => ({ registerSource, getSources }),
    [registerSource, getSources],
  );

  return (
    <FormFieldsContext.Provider value={value}>
      {children}
    </FormFieldsContext.Provider>
  );
}

export function useFormFieldsOptional() {
  return useContext(FormFieldsContext);
}

export function useRegisterFormSource(source: string) {
  const ctx = useFormFieldsOptional();
  const registerSource = ctx?.registerSource;

  useEffect(() => {
    if (!registerSource) return;
    return registerSource(source);
  }, [registerSource, source]);
}
