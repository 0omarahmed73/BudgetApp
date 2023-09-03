import "./Header.css";
import logo from "../../../assets/imgs/logo.png";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/";
import Model from "../../ui/model/Model";
import BudgetForm from "../../budget/budgetform/BudgetForm";
export const Header = () => {
  const [showModel , setShowModel] = useState(false);
  const isMount = useRef(false);
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    if (!isMount.current) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
          setIsScroll(true);
        } else setIsScroll(false);
      });
    }
  }, []);
  return (
    <header className={`header ${+isScroll ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header-row">
          <div className="header-brand">
            <div className="logo">
              <img src={logo} alt="brand logo" />
            </div>
            <h1>Budget App</h1>
          </div>
          <div className="header-actions">
            <div className="header-action-add">
              <Button onClick={() => setShowModel(true)}>+</Button>
              <Model visible={showModel} closeModel={() => setShowModel(false)}>
                <BudgetForm closeModel={() => setShowModel(false)}/>
              </Model>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
