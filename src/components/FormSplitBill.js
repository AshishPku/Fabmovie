import React, { useState } from "react";
import Button from "./Button";
const FormSplitBill = ({ selectedFriend, handleSplitBill }) => {
  const [billValue, setBillValue] = useState(0);
  const [YourExpense, setYourExpense] = useState(0);
  const [billPayment, setBillPayment] = useState(true);
  const handleBill = (e) => {
    e.preventDefault();
    if (!billValue) return;
    handleSplitBill(
      billPayment ? YourExpense - billValue : Number(YourExpense)
    );
  };
  return (
    <div className="form-split">
      <h3>Split bill with {selectedFriend.name}</h3>
      <form>
        <div>
          <label>Bill Value</label>
          <input
            type="number"
            value={billValue}
            onChange={(e) => setBillValue(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Your expense:</label>
          <input
            type="number"
            value={YourExpense}
            onChange={(e) =>
              setYourExpense(
                Number(e.target.value) > billValue
                  ? YourExpense
                  : e.target.value < 0
                  ? 0
                  : e.target.value
              )
            }
          />
        </div>
        <div>
          <label>{selectedFriend.name} expense:</label>
          <input type="text" disabled value={billValue - YourExpense} />
        </div>
        <div>
          <label>Who is paying the bill!</label>
          <select onChange={(e) => setBillPayment(e.target.validationMessage)}>
            <option>You</option>
            <option>{selectedFriend.name}</option>
          </select>
        </div>
        <Button onClick={handleBill}>Split Bill</Button>
      </form>
    </div>
  );
};

export default FormSplitBill;