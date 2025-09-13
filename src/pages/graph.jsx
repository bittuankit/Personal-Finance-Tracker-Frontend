import { useEffect, useState } from "react";
import { BarChart, LineChart } from "../components/chart";

const Graph = ({ transactions }) => {
  const [expenseData, setExpenseData] = useState(new Array(7).fill(0));
  const [incomeData, setIncomeData] = useState(new Array(7).fill(0));
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const getDayIndex = (e) => {
    const date = new Date(e);
    let day = date.getDay();
    return day === 0 ? 6 : day - 1;
  };

  useEffect(() => {
    let expenseArr = new Array(7).fill(0);
    let incomeArr = new Array(7).fill(0);
    let exp = 0;
    let inc = 0;

    transactions.forEach((e) => {
      const dayIndex = getDayIndex(e.date);
      if (e.source.includes("expense")) {
        expenseArr[dayIndex] += Math.abs(e.amount);
        exp += Math.abs(e.amount);
      } else if (e.source.includes("income")) {
        incomeArr[dayIndex] += e.amount;
        inc += e.amount;
      }
    });

    setExpenseData(expenseArr);
    setIncomeData(incomeArr);
    setTotalExpense(exp);
    setTotalIncome(inc);
  }, [transactions]);

  return (
    <div className="graph">
      <section className="top">
        <div className="allTransactions">
          Total Transactions: {transactions.length}
        </div>
        <div className="allExpense">Total Expense: {totalExpense}</div>
        <div className="allIncome">Total Income: {totalIncome}</div>
      </section>
      <section className="bottom">
        <LineChart
          transactions={transactions.length}
          expense={expenseData}
          income={incomeData}
        />
        <BarChart expense={expenseData} income={incomeData} />
      </section>
    </div>
  );
};

export default Graph;
