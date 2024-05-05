import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { SessionContext } from "@/contexts";
import { LoadingScreen } from "@/components";

const withGuest = (WrappedComponent: React.ElementType) => {
  const WithGuest = ({ ...props }) => {
    const { session, loading } = useContext(SessionContext);

    if (loading) return <LoadingScreen />;
    else if (session) return <Navigate to="/" />;
    else return <WrappedComponent {...props} />;
  };

  return WithGuest;
};

export { withGuest };
