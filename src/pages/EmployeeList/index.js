import React, { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../commons/components/Button";
import Input from "../../commons/components/Input";
import { Context } from "../../store";

const EmployeeList = () => {
  const context = useContext(Context);
  const [totalRow, setTotalRow] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sorting, setSorting] = useState("");
  const push = useNavigate();

  const totalPagination = useMemo(() => {
    const tempList = [];
    for (let i = 0; i < context.totalEmployee / totalRow; i++) {
      tempList.push(i + 1);
    }
    return tempList;
  }, [totalRow]);

  const employeeList = useMemo(() => {
    const sliceEmployeeList = context.employeeList.slice(
      currentIndex * totalRow,
      (currentIndex + 1) * totalRow
    );

    const sortEmploye =
      sorting === ""
        ? sliceEmployeeList
        : sliceEmployeeList.sort((a, b) => {
            if (sorting === "asc") {
              return a.firstName.localeCompare(b.firstName);
            }
            return b.firstName.localeCompare(a.firstName);
          });

    if (!context.search) return sortEmploye;
    return sortEmploye.filter(
      (x) =>
        x.email.includes(context.search) || x.firstName.includes(context.search)
    );
  }, [context.employeeList, currentIndex, totalRow, context.search, sorting]);

  const onSelectTotalRow = (value) => {
    setCurrentIndex(0);
    setTotalRow(value);
  };

  const onClickPagination = (value) => {
    setCurrentIndex(value - 1);
  };

  return (
    <div className="p-4">
      <div>
        <Input
          placeholder={"Search email and first name..."}
          type="text"
          className={"mb-2"}
          value={context.search}
          onChange={(e) => context.setSearch(e.target.value)}
        />
        <select
          style={{ border: "1px solid black" }}
          className="p-2 mx-2"
          value={totalRow}
          onChange={(e) => onSelectTotalRow(e.target.value)}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <Button
          label={"Add Employee"}
          onClick={() => push("/form-employee?action=add")}
        />
        <select
          style={{ border: "1px solid black" }}
          className="p-2 mx-2"
          value={sorting}
          onChange={(e) => setSorting(e.target.value)}
        >
          <option value={""}>Sorting</option>
          <option value={"asc"}>Ascending First Name</option>
          <option value={"desc"}>Descending First Name</option>
        </select>
      </div>
      <table
        style={{
          display: "block",
          position: "relative",
          maxHeight: 500,
          overflowY: "scroll",
        }}
      >
        <tr
          className="text-left sticky top-0 bg-white h-[32px]"
          style={{ border: "1px solid black" }}
        >
          <th className="w-[100px]">ID</th>
          <th className="w-[100px]">Username</th>
          <th className="w-[100px]">First Name</th>
          <th className="w-[100px]">Last Name</th>
          <th className="w-[250px]">Email</th>
          <th className="w-[150px]">Birth Date</th>
          <th className="w-[150px]">Basic Salary</th>
          <th className="w-[100px]">Status</th>
          <th className="w-[100px]">Group</th>
          <th className="w-[200px]">Description</th>
          <th className="w-[100px]">Aksi</th>
        </tr>
        {employeeList.map((list) => {
          return (
            <tr style={{ border: "1px solid black" }} key={list.id}>
              <td>{list.id}</td>
              <td>{list.username}</td>
              <td>{list.firstName}</td>
              <td>{list.lastName}</td>
              <td>{list.email}</td>
              <td>{list.birthDate}</td>
              <td>{list.basicSalary}</td>
              <td>{list.status}</td>
              <td>{list.group}</td>
              <td>{list.description}</td>
              <td>
                <div className="flex">
                  <Button
                    label={"Delete"}
                    className="!bg-red-500 mr-1"
                    onClick={() => context.removeItem(list.id)}
                  />
                  <Button
                    label={"Edit"}
                    className="!bg-yellow-500"
                    onClick={() =>
                      push(`/form-employee?action=update&id=${list.id}`)
                    }
                  />
                  <Button
                    label={"Detail"}
                    className="!bg-green-500 ml-1"
                    onClick={() => push(`/employee-detail?id=${list.id}`)}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </table>
      <div className="flex mt-2">
        {totalPagination.map((value) => {
          return (
            <Button
              label={value}
              className={`mr-1 last:mr-0 ${
                value === currentIndex + 1 ? "!bg-cyan-200" : ""
              }`}
              onClick={() => onClickPagination(value)}
              key={value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeList;
