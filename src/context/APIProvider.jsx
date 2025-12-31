import { useReducer, useCallback, useMemo, useRef } from 'react';
import { APIContext } from './APIContext';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Initial reducer state (UI state only)
const initialState = {
  data: {},
  loading: {},
  error: {},
};

// Action types
const actions = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  CLEAR_STATE: 'CLEAR_STATE',
};

// Reducer
const apiReducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_START:
      return {
        ...state,
        loading: { ...state.loading, [action.key]: true },
        error: { ...state.error, [action.key]: null },
      };

    case actions.FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, [action.key]: action.payload },
        loading: { ...state.loading, [action.key]: false },
        error: { ...state.error, [action.key]: null },
      };

    case actions.FETCH_ERROR:
      return {
        ...state,
        loading: { ...state.loading, [action.key]: false },
        error: { ...state.error, [action.key]: action.payload },
      };

    case actions.CLEAR_STATE:
      return initialState;

    default:
      return state;
  }
};

// Provider
export const APIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  // Cache stored outside React state
  const cacheRef = useRef({});
  const cacheTimeRef = useRef({});

  const fetchData = useCallback(async (endpoint, options = {}) => {
    const {
      skipCache = false,
      method = 'GET',
      body = null,
    } = options;

    const cacheKey = `${method}:${endpoint}`;

    // Serve from cache
    if (!skipCache && cacheRef.current[cacheKey]) {
      const age = Date.now() - cacheTimeRef.current[cacheKey];
      if (age < CACHE_DURATION) {
        return cacheRef.current[cacheKey];
      }
    }

    dispatch({ type: actions.FETCH_START, key: cacheKey });

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body && method !== 'GET' ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // Update cache
      cacheRef.current[cacheKey] = data;
      cacheTimeRef.current[cacheKey] = Date.now();

      dispatch({
        type: actions.FETCH_SUCCESS,
        key: cacheKey,
        payload: data,
      });

      return data;
    } catch (error) {
      dispatch({
        type: actions.FETCH_ERROR,
        key: cacheKey,
        payload: error.message || 'Unknown error',
      });
      throw error;
    }
  }, []);

  const clearCache = useCallback(() => {
    cacheRef.current = {};
    cacheTimeRef.current = {};
    dispatch({ type: actions.CLEAR_STATE });
  }, []);

  const value = useMemo(
    () => ({
      state,
      fetchData,
      clearCache,
    }),
    [state, fetchData, clearCache]
  );

  return (
    <APIContext.Provider value={value}>
      {children}
    </APIContext.Provider>
  );
};
