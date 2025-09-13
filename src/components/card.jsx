import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const Card = ({
  transactions,
  setTransaction,
  setIsTransaction,
  setTransactionData,
  setFormBtn,
}) => {
  const handleEdit = async (currEle) => {
    setFormBtn("edit");
    setTransactionData({
      _id: currEle._id,
      title: currEle.title,
      amount: currEle.amount,
      source: currEle.source,
      date: new Date(currEle.date).toISOString().split("T")[0],
    });
    setIsTransaction(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/transactions/delete-transaction/${id}`
      );
      if (res.status === 200) {
        setTransaction(transactions.filter((e) => e._id !== id));
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div>
      {transactions && transactions.length > 0 ? (
        <div className="card">
          {transactions.map((e) => (
            <div className="card-item" key={e._id}>
              <h4 id="title">{capitalize(e.title)}</h4>
              <div className="card-icons">
                <FaEdit id="card-icon-edit" onClick={() => handleEdit(e)} />
                <MdDelete
                  id="card-icon-delete"
                  onClick={() => handleDelete(e._id)}
                />
              </div>
              <h4
                id="amount"
                style={
                  e.source === "income" ? { color: "green" } : { color: "red" }
                }
              >
                ₹{e.amount}
              </h4>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No transactions yet...</p>
        </div>
      )}
    </div>
  );
};

export default Card;
