import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddTransactions: false,
  formBtnValue: "add",
  allTransactions: null,
  transactionData: {
    title: "",
    amount: "",
    source: "",
    date: "",
  },
};

export const transactionsSlice = createSlice({
  name: "transactionsSlice",
  initialState,
  reducers: {
    setIsAddTransactions: (state, action) => {
      state.isAddTransactions = action.payload;
    },
    setFormBtnValue: (state, action) => {
      state.formBtnValue = action.payload;
    },
    setAllTransactions: (state, action) => {
      state.allTransactions = action.payload;
    },
    setTransactionData: (state, action) => {
      state.transactionData = action.payload;
    },
  },
});

export const {
  setIsAddTransactions,
  setFormBtnValue,
  setAllTransactions,
  setTransactionData,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
