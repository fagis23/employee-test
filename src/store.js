import React, { createContext, useState } from "react";
import { getEmployeList } from "./data";

const Context = createContext();

const ContextProvider = (props) => {
  const [employeeList, setEmployeeList] = useState(getEmployeList());
  const [currentPagination, setCurrentPagination] = useState(0);
  const [search, setSearch] = useState("");

  const onNextPagination = () => {};
  const onPrevPagination = () => {};

  const removeItem = (id) => {
    const confirm = window.confirm(
      "Apakah anda yakin ingin menghapus employee ini?"
    );
    if (confirm) {
      const tempEmployeeList = employeeList.filter((x) => x.id !== id);
      setEmployeeList(tempEmployeeList);
      window.alert(`Employee dengan ID:${id} berhasil dihapus.`);
    }
  };

  const addEmployee = (data) => {
    setEmployeeList((prevState) => [data, ...prevState]);
  };

  const updateEmployee = (data) => {
    const tempEmployeeList = [...employeeList];
    const index = tempEmployeeList.findIndex((x) => x.id === data.id);
    tempEmployeeList[index] = data;
    setEmployeeList(tempEmployeeList);
  };

  return (
    <Context.Provider
      value={{
        employeeList,
        totalEmployee: employeeList.length,
        currentPagination,
        search,
        setSearch,
        onNextPagination,
        removeItem,
        addEmployee,
        updateEmployee,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

const ContextConsumer = Context.Consumer;

export { Context, ContextProvider, ContextConsumer };
