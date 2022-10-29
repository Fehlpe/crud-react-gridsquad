import Container from "../../shared/components/container/Container";
import Box from "../../shared/components/box/Box";
import { Typography, TextField, Button } from "@mui/material";
import { Link, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Task from "../../config/data/interfaces/task/task";

function Register(): JSX.Element {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPassword2, setUserPassword2] = useState("");
  const userList = searchStorageLogIn();
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/");
  };
  interface User {
    username: string;
    email: string;
    password: string;
    notes: Task[];
  }

  function signUser(e: any): void {
    e.preventDefault();

    const returnCheckInputs = checkInputs();

    if (returnCheckInputs) {
      const newUser: User = {
        username: userName,
        email: userEmail,
        password: userPassword,
        notes: [],
      };
      userList.push(newUser);
      updateStorage(userList);
      navigateLogin();
    }
  }

  function checkInputs(): Boolean {
    if (
      userName !== "" &&
      userEmail !== "" &&
      userPassword !== "" &&
      userPassword2 !== ""
    ) {
      const returnCheckEmail = checkEmail();
      const returnCheckPasswords = checkPasswords();
      if (returnCheckPasswords && returnCheckEmail) {
        return true;
      }
      return false;
    }
    alert("Todos os campos devem ser preenchidos");
    return false;
  }

  function checkEmail() {
    let existingUser = userList.some((users) => users.email === userEmail);

    if (existingUser) {
      alert("Usuário já cadastrado");
      return false;
    }
    return true;
  }

  function checkPasswords(): Boolean {
    if (userPassword !== userPassword2) {
      alert("As senhas devem coincidir!");
      return false;
    }
    return true;
  }

  function searchStorageLogIn(): User[] {
    return JSON.parse(localStorage.getItem("users") || "[]");
  }

  function updateStorage(userList: User[]): void {
    localStorage.setItem("users", JSON.stringify(userList));
  }

  return (
    <Container>
      <Box>
        <Typography variant="h3">Cadastro</Typography>
        <TextField
          id="standard-basic"
          label="Nome"
          variant="standard"
          fullWidth={true}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="E-mail"
          variant="standard"
          fullWidth={true}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Senha"
          variant="standard"
          fullWidth={true}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Repita a senha"
          variant="standard"
          fullWidth={true}
          onChange={(e) => setUserPassword2(e.target.value)}
        />
        <RouterLink to="/" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            variant="outlined"
            fullWidth={true}
            sx={{ mt: "16px" }}
            onClick={signUser}
          >
            Cadastrar
          </Button>
        </RouterLink>
        <Typography>
          Já possui uma conta?{" "}
          <Link style={{ textDecoration: "none", color: "#176cc2" }} to="/">
            Conecte-se
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Register;
