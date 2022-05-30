import React from "react";
import { useAuth } from "../states/auth";
import { useRouter } from "next/router";

const withProtectedRoute = (Component) => {
  return () => {
    const { user, userLoaded } = useAuth();
    const router = useRouter();

    if (typeof window === "undefined") {
      return;
    }
    if (!user && !userLoaded) {
      router.push("/auth/login");
    }
    if (user && !userLoaded) {
      return <Component />;
    }
  };
};

export default withProtectedRoute;
