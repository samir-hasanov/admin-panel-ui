import React from "react";
import Loading from "./Loading";
import ErrorGrid from "./form/ErrorGrid";

const AsyncGrid = ({ children, isLoading, isError }) => {
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <div>
        <ErrorGrid isError={isError} />
      </div>
    );
  }

  return <>{children}</>;
};

export default AsyncGrid;
