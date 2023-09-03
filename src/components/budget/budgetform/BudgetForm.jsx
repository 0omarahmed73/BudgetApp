import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../../ui";
import "./BudgetForm.css";
import { CatagoriesContext } from "../../../services/context/budget/CatagoriesContext";
import {
  getTransactions,
  postTransactions,
  updateTransactions,
} from "../../../services/apis/transactionsApi";
import { TransactionsContext } from "../../../services/context/budget/TransactionsContext";

let initialState = {
  title: "",
  amount: "",
  type: "income",
  category: "",
  date: "",
};
const BudgetForm = ({ closeModel, defaultData }) => {
  if (defaultData) {
    initialState = { ...defaultData };
  }
  const { fetchData } = useContext(TransactionsContext);
  const [data, setData] = useState(initialState);
  const [validation, setValidation] = useState({
    isValid: false,
    touched: false,
    data: {}, // title : {isValid , touched , error }
  });
  const { data: categories, loading, error } = useContext(CatagoriesContext);
  const isMount = useRef(false);
  const [loading2, setLoading2] = useState(false);
  const clearForm = () => {
    setData((d) => {
      return {
        title: "",
        amount: "",
        type: "income",
        category: "",
        date: "",
      };
    });
  };
  const handleValidation = useCallback(
    (touchedKey) => {
      let vdata = { ...validation };
      vdata.isValid = true;
      vdata.touched = true;
      const stateData = { ...data };
      if (stateData.id) {
        delete stateData.id;
      }

      Object.keys(stateData).forEach((key) => {
        let isValid = true;
        let error = null;
        let touched = vdata.data[key]?.touched || false;
        if (touchedKey === key) {
          touched = true;
        }

        if (!data[key] && !data[key].trim()) {
          isValid = false;
          error = "Field is required!";
        }

        if (key === "amount" && data[key] && isNaN(data[key])) {
          isValid = false;
          error = "Please add a valid number";
        }

        if (
          key === "amount" &&
          data[key] &&
          !isNaN(data[key]) &&
          +data[key] <= 0
        ) {
          isValid = false;
          error = "Please add a number bigger than zero";
        }

        if (!touched) {
          vdata.touched = false;
          error = null;
        }
        if (!isValid) {
          vdata.isValid = false;
        }
        vdata.data[key] = { isValid, error, touched };
      });
      setValidation(vdata);
    },
    [data, validation]
  );
  useEffect(() => {
    if (!isMount.current) {
      handleValidation();
      isMount.current = true;
    }
  }, [handleValidation]);
  useEffect(() => {
    if (!defaultData) {
      clearForm();
    }
  }, [defaultData]);
  const handleChange = (e) => {
    setValidation((d) => {
      if (d.data[e.target.name]?.error) {
        d.data[e.target.name].error = null;
      }
      return d;
    });
    setData((d) => {
      return { ...d, [e.target.name]: e.target.value };
    });
  };

  const handleBlur = (e) => {
    handleValidation(e.target.name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading2(true);
    try {
      if (!defaultData) {
        await postTransactions(data);
      } else {
        await updateTransactions(defaultData.id, data);
      }
      fetchData();
      setLoading2(false);
      closeModel();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(validation);
  return (
    <div className="new-budget">
      <h2> {defaultData ? "Edit" : "Add new"} Budget</h2>

      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="title"> Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className={validation.data.title?.error ? "error" : ""}
            placeholder="title..."
            value={data.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {validation.data.title?.error ? (
            <p className="error">{validation.data.title?.error}</p>
          ) : (
            ""
          )}
        </div>

        <div className="form-group">
          <label htmlFor="amount"> Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className={validation.data.amount?.error ? "error" : ""}
            placeholder="amount..."
            value={data.amount}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {validation.data.amount?.error ? (
            <p className="error">{validation.data.amount?.error}</p>
          ) : (
            ""
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type"> Type</label>
            <select
              id="type"
              name="type"
              className={validation.data.type?.error ? "error" : ""}
              placeholder="type..."
              value={data.type}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="income"> Income </option>
              <option value="expanse"> Expanse </option>
            </select>
            {validation.data.type?.error ? (
              <p className="error">{validation.data.type?.error}</p>
            ) : (
              ""
            )}
          </div>

          {loading ? (
            <p> loading</p>
          ) : (
            <div className="form-group">
              <label htmlFor="category"> Category</label>
              <select
                id="category"
                name="category"
                className={validation.data.category?.error ? "error" : ""}
                placeholder="category..."
                value={data.category}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value=""> Select Category </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {" "}
                    {cat.name}{" "}
                  </option>
                ))}
              </select>
              {validation.data.category?.error ? (
                <p className="error">{validation.data.category?.error}</p>
              ) : (
                ""
              )}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date"> Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className={validation.data.date?.error ? "error" : ""}
            placeholder="date..."
            value={data.date}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {validation.data.date?.error ? (
            <p className="error">{validation.data.date?.error}</p>
          ) : (
            ""
          )}{" "}
        </div>

        <Button
          disabled={validation.isValid && !loading2 ? false : true}
          size="large"
          block
        >
          {defaultData ? "Save Changes" : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default BudgetForm;
