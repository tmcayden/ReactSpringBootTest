import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import EmployeeDepartmentNameComponent from './EmployeeDepartmentNameComponent';

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewEmployee() {
    navigator('/add-employee');
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function seeEmployeeTasks(id) {
    navigator(`/tasks/${id}`);
  }

  function removeEmployee(id) {
    deleteEmployee(id)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="container">
      <br />
      <h2 className="text-center">List of Employees</h2>
      <table className="table table-light table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <EmployeeDepartmentNameComponent
                  departmentId={employee.departmentId}
                />
              </td>
              <td className="d-grid d-md-block text-center p-1">
                <button
                  className="btn btn-outline-info m-1"
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-danger m-1"
                  onClick={() => removeEmployee(employee.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-outline-secondary m-1"
                  onClick={() => seeEmployeeTasks(employee.id)}
                >
                  Tasks
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-outline-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
    </div>
  );
};

export default ListEmployeeComponent;
