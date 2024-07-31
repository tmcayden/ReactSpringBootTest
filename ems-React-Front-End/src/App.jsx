import DepartmentComponent from './components/DepartmentComponent';
import EmployeeComponent from './components/EmployeeComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import HomePage from './components/HomePage';
import ListDepartmentComponent from './components/ListDepartmentComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import TaskComponent from './components/TaskComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          // http://localhost:3000
          <Route path="/" element={<HomePage />}></Route>
          // http://localhost:3000/employees
          <Route path="/employees" element={<ListEmployeeComponent />}></Route>
          // http://localhost:3000/add-employee
          <Route path="/add-employee" element={<EmployeeComponent />}></Route>
          // http://localhost:3000/edit-employee/1
          <Route
            path="edit-employee/:id"
            element={<EmployeeComponent />}
          ></Route>
          <Route
            path="/departments"
            element={<ListDepartmentComponent />}
          ></Route>
          <Route
            path="/add-department"
            element={<DepartmentComponent />}
          ></Route>
          <Route
            path="edit-department/:id"
            element={<DepartmentComponent />}
          ></Route>
          <Route path="/tasks/:id" element={<TaskComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
