import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Employees from "./pages/Employees";
import Projects from "./pages/Projects";
import store from "./ducks/store";
import { Provider } from "react-redux";
import AccountDetails from "./pages/AccountDetails";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,

    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      {
        path: "home",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "accounts",
        element: (
          <PrivateRoute>
            <Accounts />
          </PrivateRoute>
        ),
      },
      {
        path: "accounts/:id",
        element: (
          <PrivateRoute>
            <AccountDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "employees",
        element: (
          <PrivateRoute>
            <Employees />
          </PrivateRoute>
        ),
      },
      {
        path: "projects",
        element: (
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
