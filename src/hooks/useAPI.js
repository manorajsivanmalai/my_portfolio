import { useContext, useEffect, useState } from 'react';
import { APIContext } from '../context/APIContext';

/**
 * Custom hook to use API context
 * Returns { data, loading, error, fetchData, clearCache }
 *
 * Usage:
 * const { data: projects, loading, error, fetchData } = useAPI();
 * useEffect(() => {
 *   fetchData('/api/projects');
 * }, []);
 */
export const useAPI = () => {
  const context = useContext(APIContext);

  if (!context) {
    throw new Error('useAPI must be used within APIProvider');
  }

  return {
    data: context.state.data,
    loading: context.state.loading,
    error: context.state.error,
    fetchData: context.fetchData,
    clearCache: context.clearCache,
  };
};

/**
 * Advanced hook for fetching a specific endpoint
 * Handles loading state automatically
 *
 * Usage:
 * const { data: projects, loading, error } = useFetchEndpoint('/api/projects');
 */
export const useFetchEndpoint = (endpoint, options = {}) => {
  const { data, loading, error, fetchData } = useAPI();
  const initializedRef = React.useRef(false);

  useEffect(() => {
    let isMounted = true;

    if (!initializedRef.current && isMounted) {
      fetchData(endpoint, options)
        .then(() => {
          if (isMounted) initializedRef.current = true;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return () => {
      isMounted = false;
    };
    // Intentionally exclude `options` from deps to avoid refetch loops when callers pass fresh object literals.
  }, [endpoint, fetchData]);

  return {
    data: data[endpoint],
    loading: loading[endpoint] || false,
    error: error[endpoint] || null,
    refetch: () => fetchData(endpoint, { skipCache: true, ...options }),
  };
};
