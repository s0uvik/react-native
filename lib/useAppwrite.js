import { useEffect, useState } from "react";
import { Alert } from "react-native";

/**
 * The `useAppwrite` function is a custom React hook that manages data fetching, loading state, and
 * error handling using the Appwrite API.
 * @param fn - The `fn` parameter in the `useAppwrite` function is a function that is expected to be
 * passed as an argument. This function is responsible for fetching data from an external source, such
 * as an API call using Appwrite SDK or any other data fetching operation.
 * @returns The `useAppwrite` custom hook is returning an object with three properties:
 * 1. `data`: This is the state variable that holds the fetched data.
 * 2. `isLoading`: This is a boolean state variable that indicates whether data is currently being
 * fetched (true) or not (false).
 * 3. `refetch`: This is a function that can be called to manually trigger a data fetch operation
 */
const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
