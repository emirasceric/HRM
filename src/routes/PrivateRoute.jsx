import { Navigate } from "react-router-dom";

export default function PrivateRoute(props) {
  const token = localStorage.getItem("loggedUser");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return props.children;
}
