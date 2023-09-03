import { CurrencyDollar, Pencil, Trash } from "@phosphor-icons/react";
import React, { useContext, useMemo, useState } from "react";
import Button from "./../../../../ui/button/Button";
import { TransactionsContext } from "../../../../../services/context/budget/TransactionsContext";
import Model from "../../../../ui/model/Model";
import BudgetForm from "../../../budgetform/BudgetForm";

const SingleTrans = ({transaction , categories}) => {
  const [showModel , setShowModel] = useState(false);
  const {handleDelete} = useContext(TransactionsContext)
  const currentCategory = useMemo(() => {
    let cat = categories.find(c => {
      return c.id === parseInt(transaction.category)
    })
    if (cat && cat.name){
      return cat.name
    } else ''
  } , [categories , transaction])
  return (
    <div className="trans-item">
      <div className={`trans-item-icon ${transaction.type === 'expanse' ? 'data-error' : ''}` }>
        <CurrencyDollar />
      </div>
      <div className="trans-item-data">
        <h4>{transaction.title}</h4>
        <div>
          <small>${transaction.amount} , </small>
          <small>{transaction.date} , </small>
          <small>{currentCategory}</small>

        </div>
      </div>
      <div className="trans-item-actions">
        <Button onClick={() => setShowModel(true)} icon>
          <Pencil />
        </Button>
        <Button onClick={() => handleDelete(transaction.id)} icon type="error">
          <Trash />
        </Button>
      </div>
      <Model visible={showModel} closeModel={() => setShowModel(false)}>
                <BudgetForm closeModel={() => setShowModel(false)} defaultData={transaction}/>
              </Model>

    </div>
  );
};

export default SingleTrans;
