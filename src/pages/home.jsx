import { MdFormatListBulletedAdd } from "react-icons/md";
import { useState } from "react";
import Card from "../components/card";
import AddTransactions from "../components/addTransactions";

const Home = ({ transactions, setTransactions }) => {
  const [query, setQuery] = useState("");
  const [isTransaction, setIsTransaction] = useState(false);
  const [formBtn, setFormBtn] = useState("add");
  const [transactionData, setTransactionData] = useState({
    title: "",
    amount: "",
    source: "",
    date: "",
  });
  const [categories, setCategories] = useState("all");

  let filteredTransactions = transactions
    .filter(
      (element) =>
        element.title.toLowerCase().includes(query) ||
        element.amount.toString().includes(query) ||
        element.date.toString().includes(query)
    )
    .filter((element) =>
      categories === "all" ? true : element.source === categories
    );

  const handleIsTransaction = () =>
    isTransaction ? setIsTransaction(false) : setIsTransaction(true);

  return (
    <>
      <AddTransactions
        setIsTransaction={setIsTransaction}
        isTransaction={isTransaction}
        setTransactions={setTransactions}
        transactions={transactions}
        transactionData={transactionData}
        setTransactionData={setTransactionData}
        formBtn={formBtn}
        setFormBtn={setFormBtn}
      />
      <div className="home">
        <section className="top">
          <form className="transaction-form">
            <input
              id="search"
              type="search"
              placeholder="Search title, amount and date"
              onChange={(e) => setQuery(e.target.value)}
            />
            <MdFormatListBulletedAdd
              id="transaction-icon"
              onClick={handleIsTransaction}
            />
          </form>
        </section>
        <section className="middle">
          <div className="btn">
            <div className="category-btn">
              <select
                id="categories"
                name="categories"
                onChange={(e) => setCategories(e.target.value)}
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
        </section>
        <section className="bottom">
          <Card
            transactions={filteredTransactions}
            setTransaction={setTransactions}
            setIsTransaction={setIsTransaction}
            setTransactionData={setTransactionData}
            setFormBtn={setFormBtn}
          />
        </section>
      </div>
    </>
  );
};

export default Home;
