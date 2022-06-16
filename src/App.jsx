import "./App.css";
import { useState } from "react";
import Form from "./components/Form";
import Input from "./components/Input";
import client from "./utils/client";
const apiUrl = `http://localhost:4000`;

export default function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [registerResponse, setRegisterResponse] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

  const register = async (e) => {
    e.preventDefault();

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    const res = await fetch(`${apiUrl}/register`, opts);
    const data = await res.json();

    console.log("response line 24");

    if (res.ok) {
      setRegisterResponse(`${data.data.username}: you are now registered !!`);
    } else {
      setRegisterResponse(`${data.error}`);
    }
  };

  const login = async (e) => {
    e.preventDefault();

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    const res = await fetch(`${apiUrl}/login`, opts);
    const data = await res.json();

    if (res.ok) {
      setLoginResponse(`${data.name}: you are now logged in !!`);
    } else {
      setLoginResponse(`${data.error}`);
    }
    console.log("login returned token", data.data);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    console.log({ [name]: value });
  };

  return (
    <div className="App">
      <h1>Register</h1>

      <Form
        handleSubmit={register}
        inputs={[
          <Input
            key={1}
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            handleChange={handleChange}
          />,
          <Input
            key={2}
            type="text"
            name="password"
            placeholder="Password"
            value={user.password}
            handleChange={handleChange}
          />,
        ]}
      />

      {registerResponse && <p>{registerResponse}</p>}

      <h1>Login</h1>

      <Form
        handleSubmit={login}
        inputs={[
          <Input
            key={1}
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            handleChange={handleChange}
          />,
          <Input
            key={2}
            type="text"
            name="password"
            placeholder="Password"
            value={user.password}
            handleChange={handleChange}
          />,
        ]}
      />

      {loginResponse && <p>{loginResponse}</p>}
    </div>
  );
}
