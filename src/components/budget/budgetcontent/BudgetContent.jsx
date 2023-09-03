import Tabs from "../../ui/tabs/Tabs";
import "./BudgetContent.css";
import Tab from "./../../ui/tabs/Tab";
import Transactions from "./transactions/Transactions";
import { useContext, useMemo } from "react";
import { TransactionsContext } from "./../../../services/context/budget/TransactionsContext";
import { CatagoriesContext } from "../../../services/context/budget/CatagoriesContext";
import DonChart from "../../ui/chart/DonChart";

const BudgetContent = () => {
  const incomeColors = [
    "#557B83",
    "#82954B",
    "#A2D5AB",
    "#E5EFC1",
    "#85C88A",
    "#0d5235",
    "#82A284",
    "#BABD42",
  ]
  
  const expanseColors = [
    "#4C0033",
    "#790252",
    "#AF0171",
    "#E80F88",
    "#513252",
    "#7A4069",
    "#CA4E79",
    "#FFC18E",
  ]
  
  const { data: transaction } = useContext(TransactionsContext);
  const { data: category } = useContext(CatagoriesContext);
  const chartData = useMemo(() => {
    const data = [...transaction];
    const chart = { income: null, expanse: null };
    if (transaction && transaction.length && category && category.length) {
      chart.income = {};
      chart.expanse = {};
      data.forEach((d) => {
        let catName = category.find((c) => c.id == d.category).name;
        if (d.type === "income") {
          chart.income[catName] = chart.income[catName]
            ? chart.income[catName] + d.amount
            : d.amount;
        } else if (d.type === "expanse") {
          chart.expanse[catName] = chart.expanse[catName]
            ? chart.expanse[catName] + d.amount
            : d.amount;
        }
      });
    }
    return chart;
  }, [transaction, category]);
  console.log(chartData);
  return (
    <div className="budget-content">
      <div className="container">
        <Tabs>
          <Tab title="data">
            <Transactions />
          </Tab>
          <Tab title="income"><DonChart data={chartData.income} colors={incomeColors} /></Tab>
          <Tab title="expanses"><DonChart data={chartData.expanse} colors={expanseColors} /></Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default BudgetContent;
