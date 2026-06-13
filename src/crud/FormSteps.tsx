import { Button, Space, Steps, type StepsProps } from "antd";
import {
  Children,
  isValidElement,
  useMemo,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

export type FormStepProps = {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
};

export function FormStep(_props: FormStepProps) {
  return null;
}

function isFormStep(child: ReactNode): child is ReactElement<FormStepProps> {
  return isValidElement(child) && child.type === FormStep;
}

export type FormStepsProps = {
  children: ReactNode;
  initialStep?: number;
  /** Show Previous / Next controls below the active step. Default true. */
  showNavigation?: boolean;
  /** Allow clicking step headers to change the active step. Default false. */
  allowStepSelect?: boolean;
  stepsStyle?: CSSProperties;
  navigationStyle?: CSSProperties;
} & Pick<StepsProps, "size" | "direction" | "type" | "status">;

export function FormSteps({
  children,
  initialStep = 0,
  showNavigation = true,
  allowStepSelect = false,
  stepsStyle,
  navigationStyle,
  size,
  direction,
  type,
  status,
}: FormStepsProps) {
  const steps = useMemo(
    () => Children.toArray(children).filter(isFormStep),
    [children],
  );
  const [current, setCurrent] = useState(initialStep);
  const lastIndex = steps.length - 1;

  const stepItems = useMemo(
    () =>
      steps.map((step) => ({
        title: step.props.title,
        description: step.props.description,
      })),
    [steps],
  );

  return (
    <>
      <Steps
        current={current}
        items={stepItems}
        style={{ marginBottom: 24, ...stepsStyle }}
        onChange={allowStepSelect ? setCurrent : undefined}
        size={size}
        direction={direction}
        type={type}
        status={status}
      />

      {steps.map((step, index) => (
        <div
          key={(step.key as string | undefined) ?? String(index)}
          style={{ display: current === index ? undefined : "none" }}
        >
          {step.props.children}
        </div>
      ))}

      {showNavigation && steps.length > 1 ? (
        <Space style={{ marginTop: 16, ...navigationStyle }}>
          <Button disabled={current === 0} onClick={() => setCurrent((s) => s - 1)}>
            Previous
          </Button>
          <Button
            type="primary"
            disabled={current === lastIndex}
            onClick={() => setCurrent((s) => s + 1)}
          >
            Next
          </Button>
        </Space>
      ) : null}
    </>
  );
}
