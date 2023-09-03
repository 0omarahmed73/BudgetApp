import "./Hero.css";
import BudgetNumber from "./BudgetNumber";
import { Coins, CreditCard, Wallet } from "@phosphor-icons/react";
import { useContext } from "react";
import { TransactionsContext } from "../../../services/context/budget/TransactionsContext";
export const Hero = () => {
  const {totals} = useContext(TransactionsContext)
  console.log(totals)
  return (
    <div className="hero-budget">
      <div className="img">
        <div className="hero-budget-bg">
          <img src="https://unsplash.it/1200/400" alt="randomImg" />
        </div>
        </div>
      <div className="container">
        <div className="hero-budget-numbers">
          <BudgetNumber money={totals ? totals.total : ''} title="total money">
            <Coins weight="duotone" />
          </BudgetNumber>
          <BudgetNumber money={totals ? totals.income : ''} title="total income">
            <Wallet  weight="duotone" />
          </BudgetNumber>
          <BudgetNumber money={totals ? totals.expanse : ''} title="total expanse">
            <CreditCard  weight="duotone" />
          </BudgetNumber>
        </div>
      </div>
    </div>
  );
};
