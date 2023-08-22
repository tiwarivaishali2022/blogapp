import React, { useContext, useState } from "react";
import {Navigate} from 'react-router-dom'
import { UserContext } from "../../context/userContext";
import styles from "./RegisterPage.module.css";

const Login = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [redirect, setRedirect] = useState(false);
const { setUserInfo } = useContext(UserContext);

async function login(ev) {
  ev.preventDefault();
  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (response.ok) {
    await response.json().then((userInfo) => {
      setUserInfo(userInfo);
      setRedirect(true);
    });
  } else {
    alert("wrong credentials");
  }
}

if (redirect) {
  return <Navigate to={"/"} />;
}
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={login}>
        <p className={styles.title}>Login </p>
        <p className={styles.message}>
          SignIn now and get full access to our app.{" "}
        </p>
        <label>
          <input
            required=""
            placeholder="Email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span></span>
        </label>

        <label>
          <input
            required=""
            placeholder="Password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span></span>
        </label>
        
        <button className={styles.submit}>Submit</button>
        <p className={styles.signin}>
          Don't have an acount ? <a href="/register">Signup</a>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
