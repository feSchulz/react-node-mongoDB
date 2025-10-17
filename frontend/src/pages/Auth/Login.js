import "./Auth.css";

//components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

//Hooks
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
   const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    console.log(user);
    dispatch(login(user));
  };
  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p>Faça o login para ver o que há de novo...</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Não tem uma conta ? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Login;
