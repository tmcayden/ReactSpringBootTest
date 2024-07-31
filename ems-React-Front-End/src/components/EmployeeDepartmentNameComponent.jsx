import React, { useEffect, useState } from 'react';
import { getDepartmentById } from '../services/EmployeeService';

const EmployeeDepartmentNameComponent = ({ departmentId }) => {
  const [departmentName, setDepartmentName] = useState('');

  const getDepartment = async () => {
    const department = await getDepartmentById(departmentId);
    setDepartmentName(department.data.departmentName);
  };

  useEffect(() => {
    getDepartment();
  }, []);

  return <div>{departmentName}</div>;
};

export default EmployeeDepartmentNameComponent;
