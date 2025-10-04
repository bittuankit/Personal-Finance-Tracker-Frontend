import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  setIsAddTransactions,
  setFormBtnValue,
  setTransactionData,
} from "../redux/transactionSlice";
import { useDeleteTransactionsMutation } from "../redux/services";

const Card = ({ transactions }) => {
  const [deleteTask] = useDeleteTransactionsMutation();

  const dispatch = useDispatch();

  const handleEdit = async (currEle) => {
    dispatch(
      setTransactionData({
        _id: currEle._id,
        title: currEle.title,
        amount: currEle.amount,
        source: currEle.source,
        date: new Date(currEle.date).toISOString().split("T")[0],
      })
    );
    dispatch(setIsAddTransactions(true));
    dispatch(setFormBtnValue("edit"));
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
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
