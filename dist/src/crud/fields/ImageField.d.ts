import { FieldSourceProps, FieldRules } from '../types';
export type ImageFieldProps = FieldSourceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    hideLabel?: boolean;
    /** Allow clearing an existing or newly selected image. */
    clearable?: boolean;
    accept?: string;
    /** Max preview width in pixels. */
    previewWidth?: number;
};
export declare function ImageField({ source, name, label, required, rules, hideLabel, hidden, clearable, accept, previewWidth, }: ImageFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ImageField.d.ts.map