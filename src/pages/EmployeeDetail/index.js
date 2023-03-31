import React, { useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Button from "../../commons/components/Button";
import { Context } from "../../store";
import formatMoneyRupiah from "../../commons/utils/formatMoneyRupiah";

const EmployeeDetail = () => {
  const context = useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get("action");
  const id = searchParams.get("id");
  const employee = context.employeeList.find((x) => x.id === Number(id));
  const push = useNavigate();

  if (!employee) {
    return <div>Data user tidak ada</div>;
  }
  return (
    <div>
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
        </tr>

        <tr style={{ border: "1px solid black" }}>
          <td>{employee.id}</td>
          <td>{employee.username}</td>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>{employee.email}</td>
          <td>{employee.birthDate}</td>
          <td>{formatMoneyRupiah(employee.basicSalary)}</td>
          <td>{employee.status}</td>
          <td>{employee.group}</td>
          <td>{employee.description}</td>
        </tr>
      </table>

      <Button label={"Ok"} onClick={() => push(`/employee-list`)} />
    </div>
  );
};

export default EmployeeDetail;
