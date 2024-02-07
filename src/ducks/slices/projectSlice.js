import { createSlice } from "@reduxjs/toolkit";
import { getProjects } from "../../api/projectApi";

const initialState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    fetchProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const { fetchProjects } = projectSlice.actions;

export const getProjectsAction = () => (dispatch) => {
  getProjects()
    .then((response) => {
      dispatch(fetchProjects(response));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export default projectSlice.reducer;
