import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../commons/components/Button";
import Input from "../../commons/components/Input";
import { credentialLogin } from "../../data";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const push = useNavigate();

  const onLogin = () => {
    const userLogin = credentialLogin.find(
      (x) => x.username === username && x.password === password
    );
    if (!userLogin) {
      window.alert("Data user tidak ditemukan.");
      return false;
    }
    window.alert("Berhasil login.");
    push("/employee-list");
    return true;
  };

  return (
    <>
      <div className="p-5 flex flex-col w-[300px]">
        <Input
          type={"text"}
          placeholder="username"
          style={{ border: "1px solid black" }}
          className="mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type={"password"}
          placeholder="password"
          style={{ border: "1px solid black" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button label="Login" className={"mt-2"} onClick={onLogin} />
      </div>
    </>
  );
};

export default Login;
