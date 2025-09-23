import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAddTransactions,
  setFormBtnValue,
  setTransactionData,
} from "../redux/slice";
import {
  usePostTransactionsMutation,
  useUpdateTransactionsMutation,
} from "../redux/services";

const AddTransactions = () => {
  const { isAddTransactions, formBtnValue, transactionData } = useSelector(
    (state) => state.transactions
  );

  const dispatch = useDispatch();

  const [postTransactionsData] = usePostTransactionsMutation();
  const [
    updateTask,
    { isSuccess: isTaskUpdatedSuccess, error: isTaskUpdatedError },
  ] = useUpdateTransactionsMutation();

  const handleClose = () => {
    dispatch(setIsAddTransactions(false));
    dispatch(setFormBtnValue("add"));
    dispatch(
      setTransactionData({
        title: "",
        amount: "",
        source: "",
        date: "",
      })
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setTransactionData({ ...transactionData, [name]: value }));
  };

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();

    if (formBtnValue === "add") {
      await postTransactionsData(transactionData);
    }

    if (formBtnValue === "edit") {
      await updateTask(transactionData);
      dispatch(setIsAddTransactions(false));
    }

    dispatch(
      setTransactionData({
        title: "",
        amount: "",
        source: "",
        date: "",
      })
    );
  };

  return (
    <div
      className="addTransactions"
      style={isAddTransactions ? { display: "block" } : { display: "none" }}
    >
      <div className="addCard">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3>
            {formBtnValue === "add" ? "Add Transactions" : "Edit Transactions"}
          </h3>
          <IoMdCloseCircle
            style={{ fontSize: "2rem", cursor: "pointer" }}
            onClick={handleClose}
          />
        </div>
        <form method="post" onSubmit={handleTransactionSubmit}>
          <div className="title">
            <label htmlFor="title">Enter Title: </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="e.g travelling, movies, salary"
              value={transactionData.title ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="amount">
            <label htmlFor="amount">Enter Amount: </label>
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="e.g 500,1200"
              value={transactionData.amount ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="categories">
            <p>Transaction Source:</p>
            <div className="radio">
              <div>
                <input
                  type="radio"
                  id="source"
                  name="source"
                  value="income"
                  checked={transactionData.source === "income"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="income">Income</label>
              </div>
              <br></br>
              <div>
                <input
                  type="radio"
                  id="source"
                  name="source"
                  value="expense"
                  checked={transactionData.source === "expense"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="expense">Expense</label>
              </div>
            </div>
            <br></br>
          </div>
          <div className="date">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              id="date"
              value={transactionData.date ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="submit">
            <input id="submit" type="submit" value={formBtnValue} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactions;
