import { createSlice } from "@reduxjs/toolkit";
import { getEmployees } from "../../api/employeeApi";

const initialState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    fetchEmployees: (state, action) => {
      console.log(state, action);
      state.employees = action.payload;
    },
  },
});

export const { fetchEmployees } = employeeSlice.actions;

export const getEmployeesAction = () => (dispatch) => {
  getEmployees()
    .then((response) => {
      dispatch(fetchEmployees(response));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export default employeeSlice.reducer;
