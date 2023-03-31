import React, { useState, useMemo, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../commons/components/Button";
import Input from "../../commons/components/Input";
import { Context } from "../../store";
import ValidateEmail from "../../commons/utils/formatEmail";

const FormEmployee = () => {
  const context = useContext(Context);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [basicSalary, setBasicSalary] = useState(0);
  const [status, setStatus] = useState("");
  const [group, setGroup] = useState("Group 1");
  const [description, setDescription] = useState("");
  const push = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get("action");
  const id = searchParams.get("id");

  const isDisabled = useMemo(() => {
    if (!username || !firstName || !lastName) return true;
    if (!ValidateEmail(email)) return true;
    if (!birthDate || !basicSalary) return true;
    if (!status || !group || !description) return true;
    return false;
  }, [
    username,
    firstName,
    lastName,
    email,
    birthDate,
    basicSalary,
    status,
    group,
    description,
  ]);

  const onAddEmployee = () => {
    context.addEmployee({
      username,
      firstName,
      lastName,
      email,
      birthDate,
      basicSalary,
      status,
      group,
      description,
      id: Math.floor(Math.random() * 10000000),
    });
    push("/employee-list");
  };

  const onUpdateEmployee = () => {
    context.updateEmployee({
      username,
      firstName,
      lastName,
      email,
      birthDate,
      basicSalary,
      status,
      group,
      description,
      id: Number(id),
    });
    push("/employee-list");
  };

  useEffect(() => {
    if (action === "update") {
      const employee = context.employeeList.find((x) => x.id === Number(id));
      setUsername(employee.username);
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
      setBirthDate(employee.birthDate);
      setBasicSalary(employee.basicSalary);
      setStatus(employee.status);
      setGroup(employee.group);
      setDescription(employee.description);
    }
  }, []);

  useEffect(() => {
    var today = new Date().toISOString().split("T")[0];
    document.getElementsByName("setTodaysDate")[0].setAttribute("max", today);
  }, []);

  return (
    <div className="flex flex-col w-[350px] mt-0 mb-0 ml-auto mr-auto pt-[120px]">
      <span className="mb-4 text-lg">
        {action === "update" ? "Update" : "Add"} Form Employee
      </span>
      <Input
        type={"text"}
        placeholder={"Username"}
        className="mb-3"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type={"text"}
        placeholder={"First Name"}
        className="mb-3"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <Input
        type={"text"}
        placeholder={"Last Name"}
        className="mb-3"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <Input
        type={"email"}
        placeholder={"Email"}
        className="mb-3 "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type={"date"}
        placeholder={"Date"}
        className="mb-3"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        name="setTodaysDate"
      />
      <Input
        type={"number"}
        placeholder={"Basic Salary"}
        className="mb-3"
        value={basicSalary}
        onChange={(e) => setBasicSalary(e.target.value)}
      />
      <Input
        type={"text"}
        placeholder={"Status"}
        className="mb-3"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <select
        style={{ border: "1px solid black" }}
        className="p-2 mb-4"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      >
        <option value={"Group 1"}>Group 1</option>
        <option value={"Group 2"}>Group 2</option>
        <option value={"Group 3"}>Group 3</option>
        <option value={"Group 4"}>Group 4</option>
        <option value={"Group 5"}>Group 5</option>
        <option value={"Group 6"}>Group 6</option>
        <option value={"Group 7"}>Group 7</option>
        <option value={"Group 8"}>Group 8</option>
        <option value={"Group 9"}>Group 9</option>
        <option value={"Group 10"}>Group 10</option>
      </select>
      <Input
        type={"text"}
        placeholder={"Description"}
        className="mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex justify-center">
        <Button
          label={action === "update" ? "Update" : "Add"}
          className={`mr-4 w-[100px] ${
            isDisabled ? "!bg-slate-200 cursor-not-allowed" : "!bg-green-500"
          }`}
          disabled={isDisabled}
          onClick={action === "update" ? onUpdateEmployee : onAddEmployee}
        />
        <Button
          label={"Cancel"}
          className="w-[100px]"
          onClick={() => push("/employee-list")}
        />
      </div>
    </div>
  );
};

export default FormEmployee;
