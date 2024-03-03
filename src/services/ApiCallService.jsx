import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/apiSlice";

const ApiCallService = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);

  useEffect(() => {
    // Dispatch the fetchData thunk
    dispatch(fetchData("https://api.example.com/data"));
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <div>Data: {data}</div>;
};

export default ApiCallService;
