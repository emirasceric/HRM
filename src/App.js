import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout/Layout";
import { getAccountsAction } from "./ducks/slices/accountSlice";
import { getEmployeesAction } from "./ducks/slices/employeeSlice";
import { getProjectsAction } from "./ducks/slices/projectSlice";
import { Routes, Route, Outlet } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import AccountDetails from "./pages/AccountDetails";
import Projects from "./pages/Projects";
import Employees from "./pages/Employees";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountsAction());
    dispatch(getEmployeesAction());
    dispatch(getProjectsAction());
  }, []);

  return (
    <>
      <Layout />

      <Outlet />
      {/* 
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="accounts"
          element={
            <PrivateRoute>
              <Accounts />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="accounts/:id"
          element={
            <PrivateRoute>
              <AccountDetails />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="employees"
          element={
            <PrivateRoute>
              <Employees />
            </PrivateRoute>
          }
        ></Route>
      </Routes> */}
    </>
  );
}

export default App;
