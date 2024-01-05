import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteDepartment, listDepartments } from '../services/EmployeeService';

const ListDepartmentComponent = () => {
  /* const dummyData = [
    {
      id: '1',
      departmentName: 'HR',
      departmentDescription: 'Human Resources Department Description',
    },
    {
      id: '2',
      departmentName: 'Testing',
      departmentDescription: 'Testing Department Description',
    },
    {
      id: '3',
      departmentName: 'IT',
      departmentDescription: 'Information Technology Department Description',
    },
  ]; */

  const [departments, setDepartments] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    getAllDepartments();
  }, []);

  function getAllDepartments() {
    listDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewDepartment() {
    navigator('/add-department');
  }

  function updateDepartment(id) {
    navigator(`/edit-department/${id}`);
  }

  function removeDepartment(id) {
    deleteDepartment(id)
      .then((response) => {
        getAllDepartments();
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="container">
      <br />
      <h2 className="text-center">List of Departments</h2>
      <table className="table table-light table-striped table-bordered">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
              <td className="d-grid gap-2 d-md-block">
                <button
                  className="btn btn-outline-info"
                  onClick={() => updateDepartment(department.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeDepartment(department.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-outline-primary mb-2"
        onClick={addNewDepartment}
      >
        Add Department
      </button>
    </div>
  );
};

export default ListDepartmentComponent;
