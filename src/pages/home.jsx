import { MdFormatListBulletedAdd } from "react-icons/md";
import { useState } from "react";
import Card from "../components/card";
import AddTransactions from "../components/addTransactions";
import { useDispatch } from "react-redux";
import { setIsAddTransactions } from "../redux/slice";
import { useGetTransactionsQuery } from "../redux/services";

const Home = () => {
  const allTransactions = useGetTransactionsQuery();
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState("all");

  const dispatch = useDispatch();

  let filteredTransactions = allTransactions?.data?.transactions
    .filter(
      (element) =>
        element.title.toLowerCase().includes(query) ||
        element.amount.toString().includes(query) ||
        element.date.toString().includes(query)
    )
    .filter((element) =>
      categories === "all" ? true : element.source === categories
    );

  const handleIsTransaction = () => {
    dispatch(setIsAddTransactions(true));
  };

  return (
    <>
      <AddTransactions />
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
          <Card transactions={filteredTransactions} />
        </section>
      </div>
    </>
  );
};

export default Home;
