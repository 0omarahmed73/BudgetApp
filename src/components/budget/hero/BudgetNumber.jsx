import React from 'react'

const BudgetNumber = (props) => {
  return (
    <div className="budget-numbers">
      <div className="budget-numbers-icon">
        {props.children}
      </div>
      <div className="budget-numbers-money">
        <div>${props.money}</div>
        <small>{props.title}</small>
      </div>
    </div>
  )
}

export default BudgetNumber