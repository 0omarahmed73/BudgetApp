import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { TransactionProvider } from "./services/context/budget/TransactionsContext.jsx";
import { CatagoriesProvider } from "./services/context/budget/CatagoriesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TransactionProvider>
    <CatagoriesProvider>
      <App/>
    </CatagoriesProvider>
    </TransactionProvider>
  </React.StrictMode>
);
