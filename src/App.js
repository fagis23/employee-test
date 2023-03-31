import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EmployeeList from "./pages/EmployeeList";
import FormEmployee from "./pages/FormEmployee";
import EmployeeDetail from "./pages/EmployeeDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/form-employee" element={<FormEmployee />} />
        <Route path="/employee-detail" element={<EmployeeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
