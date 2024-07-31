import React, { useEffect, useState } from 'react';
import {
  createEmployee,
  getEmployeeById,
  listDepartments,
  updateEmployee,
} from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    listDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setDepartmentId(response.data.departmentId);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email, departmentId };
      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            navigator('/employees');
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then(() => {
            navigator('/employees');
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First name is required';
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'An email is required';
      valid = false;
    }
    if (departmentId) {
      errorsCopy.department = '';
    } else {
      errorsCopy.department = 'A department is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div className="container">
      <br />
      <br />

      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter the Employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? 'is-invalid' : ''
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback"> {errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter the Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? 'is-invalid' : ''
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback"> {errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter the Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback"> {errors.email}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Department</label>
                <select
                  className={`form-control ${
                    errors.department ? 'is-invalid' : ''
                  }`}
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                >
                  <option value="Select Department">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.departmentName}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <div className="invalid-feedback"> {errors.department}</div>
                )}
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button
                  className="btn btn-outline-success mb-2"
                  onClick={saveOrUpdateEmployee}
                >
                  Submit
                </button>
                <button
                  className="btn btn-outline-danger mb-2"
                  onClick={() => {
                    navigator('/employees');
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
