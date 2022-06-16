import "./App.css";
import { useState } from "react";
import Form from "./components/Form";
import Input from "./components/Input";
import client from "./utils/client";

export default function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [registerResponse, setRegisterResponse] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      };

      const response = await client.post("/register", opts);
      console.log(response);
      setRegisterResponse(`${user.username}: you are now registered !!`);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      };

      const response = await client.post("/login", opts);
      console.log(response.data);
      setLoginResponse(`${user.username}: you are now logged in !!`);
    } catch (err) {
      console.log(err);
    }
  };

  // You can safely ignore everything below this line, it's just boilerplate
  // so you can focus on the exercise requirements

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
