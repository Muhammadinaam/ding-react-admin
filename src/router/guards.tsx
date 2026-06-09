import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { usePermissions } from "../context/PermissionsProvider";

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

export function RequirePermission({
  permission,
  redirect,
  children,
}: {
  permission: string;
  redirect: string;
  children: ReactElement;
}) {
  const can = usePermissions();
  return (
    <Guard when={can(permission)} redirect={redirect}>
      {children}
    </Guard>
  );
}
