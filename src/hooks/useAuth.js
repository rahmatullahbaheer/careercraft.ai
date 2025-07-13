// Custom hook for session management
"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    isUnauthenticated: status === "unauthenticated",
    signIn,
    signOut,
  };
}

// HOC to protect routes
export function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      signIn();
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
