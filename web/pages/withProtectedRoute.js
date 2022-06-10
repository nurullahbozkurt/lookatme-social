import React from "react";
import { useAuth } from "../states/auth";
import { useRouter } from "next/router";

const withProtectedRoute = (Component) => {
  return () => {
    const { localUser, userLoaded } = useAuth();
    const router = useRouter();

    if (typeof window === "undefined") {
      return;
    }
    if (!localUser && !userLoaded) {
      router.push("/auth/login");
    }
    if (localUser && !userLoaded) {
      return <Component />;
    }
  };
};

export default withProtectedRoute;
