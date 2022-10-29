import Container from "../../shared/components/container/Container";
import Box from "../../shared/components/box/Box";
import { Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Task from "../../config/data/interfaces/task/task";
import { Link } from "react-router-dom";

function Login(): JSX.Element {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/home");
  };

  interface User {
    username: string;
    email: string;
    password: string;
    notes: Task[];
  }

  function logUser(e: any): void {
    e.preventDefault();

    let returnCheck = checkUser();

    if (returnCheck) {
      navigateHome();
    }
  }

  function checkUser(): Boolean {
    const userList = searchStorageSignIn();

    const existingUser = userList.some(
      (users) => users.email === userLogin && users.password === userPassword
    );

    if (existingUser) {
      setLogged(userLogin);
      return true;
    } else {
      alert("E-mail ou senha inválidos");
      return false;
    }
  }

  function searchStorageSignIn(): User[] {
    return JSON.parse(localStorage.getItem("users") || "[]");
  }

  function setLogged(userLogin: string): void {
    sessionStorage.setItem("logged", userLogin);
  }

  return (
    <Container>
      <Box>
        <Typography variant="h3">Login</Typography>
        <TextField
          id="standard-basic"
          label="E-mail"
          variant="standard"
          fullWidth={true}
          onChange={(e) => setUserLogin(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Senha"
          variant="standard"
          fullWidth={true}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <Typography style={{ textDecoration: "none", width: "100%" }}>
          <Button
            variant="outlined"
            fullWidth={true}
            sx={{ mt: "16px" }}
            onClick={logUser}
          >
            Entrar
          </Button>
        </Typography>
        <Typography>
          Não possui uma conta? <Link style={{ textDecoration: 'none', color: "#176cc2" }} to="/register">Criar conta</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
