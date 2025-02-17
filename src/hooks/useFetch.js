import { useState } from "react";
import axios from "axios";

const useFetch = () => {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const request = async (url, method = "GET", body = null, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios({
        url,
        method,
        data: body,
        ...options,
      });

      setData(response.data);
      return response.data; 
    } catch (err) {
      setError(
        err.message || "An error occurred while processing the request."
      );
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request };
};

export default useFetch;
