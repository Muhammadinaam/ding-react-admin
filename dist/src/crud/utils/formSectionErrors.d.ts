import { MutableRefObject } from 'react';
import { FieldValues, FormState, UseFormGetFieldState } from 'react-hook-form';
export declare function sectionHasError<T extends FieldValues>(sources: Set<string>, getFieldState: UseFormGetFieldState<T>, formState: FormState<T>): boolean;
export declare function useSectionSourceRefs(count: number): MutableRefObject<Set<string>>[];
export declare function useActivateFirstErrorSection(sectionRefs: MutableRefObject<Set<string>>[], activate: (index: number) => void): void;
//# sourceMappingURL=formSectionErrors.d.ts.map