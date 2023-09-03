import React, { useContext, useState } from "react";
import { CatagoriesContext } from "../../../../../services/context/budget/CatagoriesContext";
import { TransactionsContext } from "../../../../../services/context/budget/TransactionsContext";
const TransHeader = () => {
  const { data } = useContext(CatagoriesContext);
  const { handleFilters} = useContext(TransactionsContext)
  const [inputs , setInputs] = useState({
    keys : '',
    category : '',
    type : ''
  })
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(d => {
      return {...d , [name] : value}
    })
    handleFilters(d => {
      return {...d , [name] : value}
    })
  };
  console.log(inputs);
  return (
    <div className="trans-header">
      <h3 className="trans-header-title">Recent Transactions</h3>
      <div className="trans-header-filters">
        <select name="keys" className="filters-select" value={inputs.keys} onChange={handleChange}>
          <option value="">Sort By</option>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <select
          name="category"
          className="filters-select"value={inputs.category} 
          onChange={handleChange}
        >
          <option value="">Categories</option>
          {data
            ? data.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })
            : ""}
        </select>
        <select name="type" className="filters-select" value={inputs.type} onChange={handleChange}>
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expanse">Expanse</option>
        </select>
      </div>
    </div>
  );
};

export default TransHeader;
