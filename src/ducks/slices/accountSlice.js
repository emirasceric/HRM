import { createSlice } from "@reduxjs/toolkit";
import { getAccounts } from "../../api/accountApi";

const initialState = {
  accounts: [],
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccounts: (state, action) => {
      state.accounts = action.payload;
    },
  },
});

export const { fetchAccounts } = accountSlice.actions;

export const getAccountsAction = () => (dispatch) => {
  getAccounts()
    .then((response) => {
      dispatch(fetchAccounts(response));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export default accountSlice.reducer;
