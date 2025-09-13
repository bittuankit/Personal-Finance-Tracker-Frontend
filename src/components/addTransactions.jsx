import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";

const AddTransactions = ({
  setIsTransaction,
  isTransaction,
  setTransactions,
  transactions,
  transactionData,
  setTransactionData,
  formBtn,
  setFormBtn,
}) => {
  const handleClose = () => {
    setIsTransaction(false);
    setTransactionData({
      title: "",
      amount: "",
      source: "",
      date: "",
    });
    setFormBtn("add");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({ ...transactionData, [name]: value });
  };

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();

    const formBtnValue = e.nativeEvent.submitter.value;

    if (formBtnValue === "add") {
      const res = await axios.post(
        "http://localhost:4000/api/v1/transactions/post-transactions",
        transactionData
      );
      setTransactions([res.data.transactionPostData, ...transactions]);
    }

    if (formBtnValue === "edit") {
      const res = await axios.put(
        `http://localhost:4000/api/v1/transactions/update-transactions/${transactionData._id}`,
        { ...transactionData }
      );
      setIsTransaction(false);
    }

    setTransactionData({
      title: "",
      amount: "",
      source: "",
      date: "",
    });
  };

  return (
    <div
      className="addTransactions"
      style={isTransaction ? { display: "block" } : { display: "none" }}
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
            {formBtn === "add" ? "Add Transactions" : "Edit Transactions"}
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
              value={transactionData.title}
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
              value={transactionData.amount}
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
              value={transactionData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="submit">
            <input id="submit" type="submit" value={formBtn} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactions;
