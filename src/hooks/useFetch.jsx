// import {useState} from "react";

// const useFetch = (cb, options = {}) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(null);
//   const [error, setError] = useState(null);

//   const fn = async (...args) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await cb(options, ...args);
//       setData(response);
//       setError(null);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {data, loading, error, fn};
// };

// export default useFetch;


import { useState } from "react";

const useFetch = (fn, params = null) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn(params);
      setData(result);
    } catch (err) {
      setError(err);
    }
    setLoading(false); // ✅ Ensure this runs always!
  };

  return { loading, data, error, fn: execute };
};

export default useFetch;
