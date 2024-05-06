import { useState, useEffect } from 'react';

const useFetch = <T>(fetchFn: () => Promise<T>) => {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<unknown>(undefined);
    const [fetchedData, setFetchedData] = useState<T | undefined>(undefined);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setFetchedData(data);
            } catch (error) {
                setError({ error: "Failed to fetch data." });
            }

            setIsFetching(false);
        }

        fetchData();
    }, [fetchFn]);

    return { isFetching, error, fetchedData };
};

export default useFetch