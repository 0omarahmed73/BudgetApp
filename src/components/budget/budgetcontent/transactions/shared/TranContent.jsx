import React, { useContext } from "react";
import SingleTrans from "./SingleTrans";
import axiosApi from "../../../../../services/apis/axiosApi";
import { TransactionsContext } from "../../../../../services/context/budget/TransactionsContext";
import { CatagoriesContext } from './../../../../../services/context/budget/CatagoriesContext';
const TranContent = () => {
  const {filteredData : data , loading , error } = useContext(TransactionsContext)
  const {data : categories , loading : catLoad } = useContext(CatagoriesContext)
  
  return (
    <div className="trans-content">
      {data && categories.length && !error && !loading ? data.map(el => {
        return <SingleTrans categories={categories} transaction={el} key={el.id} />
      }) : !catLoad && !error && !loading && !data.length ? <p className="no-data">No Data</p> : ''}
      {catLoad && loading ? <p className="loader"></p> : ''}
      {error && !catLoad && !loading ? <p className="error">Error! : {error}</p> : ''}
    </div>
  );
};

export default TranContent;
