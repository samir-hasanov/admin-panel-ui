import React from "react";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";

const Async = ({ children, isLoading, isError }) => {
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <div>
        <ErrorPage isError={isError} />
      </div>
    );
  }

  return <>{children}</>;
};

export default Async;
