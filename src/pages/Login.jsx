import { useState } from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
import { login } from "../api/loginApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const handleSubmit = () => {
    if (username && password) {
      login(username, password)
        .then((response) => {
          localStorage.setItem("loggedUser", response);
          navigate("/home");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      style={{ height: "100vh" }}
    >
      <Grid item>
        <Typography>Login</Typography>
      </Grid>

      <Grid item>
        <TextField
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          label="Username"
        />
      </Grid>

      <Grid item>
        <TextField
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Grid>

      <Grid item>
        <Button type="button" onClick={handleSubmit}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
}
