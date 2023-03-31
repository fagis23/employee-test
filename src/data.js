const employeList = {
  username: "fachri",
  password: "1234",
  firstName: "Fachri",
  lastName: "PH",
  email: "fachri@yahoo.com",
  birthDate: "1999-05-23",
  basicSalary: 8500000,
  status: "staff",
  group: "Group 1",
  description: "test",
  id: 0,
};

export const credentialLogin = [employeList];

export const getEmployeList = () => {
  const tempArray = [];
  for (let i = 0; i < 100; i++) {
    const tempEmployeList = { ...employeList };
    tempEmployeList.id = i + 1;
    tempArray.push(tempEmployeList);
  }
  return tempArray;
};
