import axios from "axios";
import Graph from "./pages/graph";
import Home from "./pages/home";
import { useEffect, useState } from "react";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async () => {
    const res = await axios(
      "http://localhost:4000/api/v1/transactions/get-transactions"
    );
    setTransactions(res.data.transactions);
  };

  useEffect(() => {
    getTransactions();
  }, [transactions]);

  return (
    <div className="container">
      <Home transactions={transactions} setTransactions={setTransactions} />
      <Graph transactions={transactions} />
    </div>
  );
};

export default App;
