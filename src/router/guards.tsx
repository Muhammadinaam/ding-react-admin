import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export function Guard({
  when,
  redirect,
  children,
}: {
  when: boolean;
  redirect: string;
  children: ReactElement;
}) {
  return when ? children : <Navigate to={redirect} replace />;
}

export function Protected({
  children,
  redirectTo = "/login",
}: {
  children: ReactElement;
  redirectTo?: string;
}) {
  const { isAuthenticated } = useAuth();
  return (
    <Guard when={isAuthenticated} redirect={redirectTo}>
      {children}
    </Guard>
  );
}

export function GuestOnly({
  children,
  redirectTo = "/",
}: {
  children: ReactElement;
  redirectTo?: string;
}) {
  const { isAuthenticated } = useAuth();
  return (
    <Guard when={!isAuthenticated} redirect={redirectTo}>
      {children}
    </Guard>
  );
}
