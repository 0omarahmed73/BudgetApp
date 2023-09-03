import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  deleteTransactions,
  getTransactions,
} from "./../../apis/transactionsApi";

export const TransactionsContext = createContext();
const intialState = {
  data: [],
  loading: true,
  error: null,
};

const redFn = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: null, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "STOP_LOADING":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const TransactionProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    keys: null,
    category: null,
    type: null,
  });
  const [state, dispatch] = useReducer(redFn, intialState);
  const isMount = useRef(false);
  const handleDelete = async (id) => {
    try {
      dispatch({
        type: "FETCH_START",
      });
      await deleteTransactions(id);
      fetchData();
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };
  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await getTransactions();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, []);
  useEffect(() => {
    if (!isMount.current) {
      fetchData();
      isMount.current = true;
    }
  }, [fetchData]);
  const handleFilters = (filteredData) => {
    setFilters(filteredData);
  };
  const filteredData = useMemo(() => {
    let fdata = [...state.data];
    if (!fdata || !fdata.length) {
      return [];
    }
    if (filters.keys) {
      if (filters.keys === "date") {
        fdata = fdata.sort((a, b) => {
          const aDate = new Date(a.date).getTime();
          const bDate = new Date(b.date).getTime();
          return bDate - aDate;
        });
      }
      else if (filters.keys === "amount") {
        fdata = fdata.sort((a, b) => {
          return parseInt(b.amount) - parseInt(a.amount);
        });
      }
    }
    if (filters.category){
      fdata = fdata.filter(d => d.category == filters.category);
    }
    if (filters.type){
      fdata = fdata.filter(d => d.type === filters.type);
    }
    return fdata
  }, [state.data, filters]);

  const totals = useMemo(() => {
    let income = 0
    let expanse = 0;
    if (state.data && state.data.length) {
      state.data.forEach(d => {
        if (d.type === 'income')
        income += parseInt(d.amount)
      else {
        expanse += parseInt(d.amount)
      }
    })
    return {income , expanse , total : income - expanse}
    }
  } , [state.data])

  return (
    <TransactionsContext.Provider
      value={{ ...state, handleDelete, fetchData, handleFilters, filteredData , totals }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
