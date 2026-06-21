import { Alert } from "antd";

export type FormGlobalErrorsAlertProps = {
  errors: string[];
};

export function FormGlobalErrorsAlert({ errors }: FormGlobalErrorsAlertProps) {
  if (!errors.length) return null;

  if (errors.length === 1) {
    return (
      <Alert
        type="error"
        title={errors[0]}
        showIcon
        style={{ marginBottom: 16 }}
      />
    );
  }

  return (
    <Alert
      type="error"
      title="Could not save"
      showIcon
      style={{ marginBottom: 16 }}
      description={
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {errors.map((msg) => (
            <li key={msg}>{msg}</li>
          ))}
        </ul>
      }
    />
  );
}
