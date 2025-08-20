import { getMe } from "@/entities/auth";
import type { Roles } from "@/entities/types";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

type AuthMiddlewareProps = {
  children: ReactNode;
  toRolesAvailable: Roles[];
};

function AuthMiddleware(props: AuthMiddlewareProps) {
  const { children, toRolesAvailable } = props;
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<Roles>();

  const navigate = useNavigate();
  // check authorization
  useEffect(() => {
    const handler = async () => {
      try {
        const userData = await getMe();
        if (!userData?.uuid) {
          navigate({ to: "/login", replace: true });
          return;
        }
        setUserRole(userData.role)
      } catch (error) {
        navigate({ to: "/login", replace: true });
      } finally {
        setLoading(false);
      }
    };
    handler();
  }, []);

  if (loading) {
    // TODO: Replace with a full-page wrapper
    return "Loading";
  }

  else if (!userRole)
    return <Navigate to="/login" />

  else if (!toRolesAvailable.includes(userRole))
    return <Navigate to="/not-found" />;


  return children;
}

export default AuthMiddleware;