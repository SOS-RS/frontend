import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { LoadingScreen } from "@/components";
import { SessionContext } from "@/contexts";

const withAuth = (WrappedComponent: React.ElementType) => {
  const WithAuth = ({ ...props }) => {
    const { session, loading } = useContext(SessionContext);

    if (loading) return <LoadingScreen />;
    else if (session) return <WrappedComponent {...props} />;
    else return <Navigate to="/signin" />;
  };

  return WithAuth;
};

export { withAuth };
