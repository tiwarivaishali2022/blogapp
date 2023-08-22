import React, { useState } from "react";
import styles from "./RegisterPage.module.css"
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  
const [redirect, setRedirect] = useState(false);
  

  async function register(e) {
    e.preventDefault();
    
    if (password && password === checkPassword) {
      console.log(firstName + " " + lastName)
    } else {
      console.log("error");
    }
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("Registration Success");
      setRedirect(true);
    } else {
      alert("Registration Failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={register}>
        <p className={styles.title}>Register </p>
        <p className={styles.message}>
          Signup now and get full access to our app.{" "}
        </p>
        <div className={styles.flex}>
          <label>
            <input
              required=""
              placeholder="Firstname"
              type="text"
              className={styles.input}
              value={firstName}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                setFirstName(value);
              }}
            />
          </label>

          <label>
            <input
              required=""
              placeholder="Lastname"
              type="text"
              className={styles.input}
              value={lastName}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                setLastName(value);
              }}
            />
            <span></span>
          </label>
        </div>

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
        <label>
          <input
            required=""
            placeholder="Confirm password"
            type="password"
            className={styles.input}
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
          <span></span>
        </label>
        <button className={styles.submit}>Submit</button>
        <p className={styles.signin}>
          Already have an acount ? <a href="/login">Signin</a>{" "}
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;


/* <form classNameName="register" >
  <h1>Register</h1>
  <input
    type="text"
    placeholder="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button>Register</button>
</form>; */