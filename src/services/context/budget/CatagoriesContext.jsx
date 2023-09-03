import { createContext, useCallback, useEffect, useReducer, useRef } from "react";
import { getCategories } from "../../apis/categoriesApi";

export const CatagoriesContext = createContext();
const intialState = {
  data: [],
  loading: true,
  error : null
};
const redFn = (state , action) => {
  switch (action.type) {
    case 'FETCH_START' : 
    return {...state , loading : true , error : null}
    case 'FETCH_SUCCESS' :
      return {...state , loading : false , error : null , data : action.payload};
      case 'FETCH_ERROR':
      return {...state , loading : false , error : action.payload};
      case 'STOP_LOADING':
      return {...state , loading : false};
    default:
    return state;
  }
}

export const CatagoriesProvider = ({ children }) => {
  const [state , dispatch] = useReducer(redFn , intialState)
  const isMount = useRef(false);
  const fetchData = useCallback( async () => {
      dispatch({type : 'FETCH_START'})
      try {
        const data = await getCategories()
        dispatch({type : 'FETCH_SUCCESS' , payload : data})
      }catch(error) {
        dispatch({type : 'FETCH_ERROR' , payload : error.message})
      }
    } , [])
  useEffect(() => {
    if (!isMount.current) {
    fetchData()
    isMount.current = true;
    }
  },[fetchData])
  return (
    <CatagoriesContext.Provider value={{...state  }}>
      {children}
      </CatagoriesContext.Provider>
  );
};
