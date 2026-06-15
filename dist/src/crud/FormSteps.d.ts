import { StepsProps } from 'antd';
import { CSSProperties, ReactNode } from 'react';
export type FormStepProps = {
    title: ReactNode;
    description?: ReactNode;
    children: ReactNode;
};
export declare function FormStep(_props: FormStepProps): null;
export type FormStepsProps = {
    children: ReactNode;
    initialStep?: number;
    /** Show Previous / Next controls below the active step. Default true. */
    showNavigation?: boolean;
    /** Allow clicking step headers to change the active step. Default false. */
    allowStepSelect?: boolean;
    stepsStyle?: CSSProperties;
    navigationStyle?: CSSProperties;
} & Partial<Pick<StepsProps, "size" | "direction" | "type" | "status">>;
export declare function FormSteps({ children, initialStep, showNavigation, allowStepSelect, stepsStyle, navigationStyle, size, direction, type, status, }: FormStepsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FormSteps.d.ts.map