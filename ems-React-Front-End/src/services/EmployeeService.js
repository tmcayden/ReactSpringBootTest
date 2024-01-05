import axios from "axios";

const REST_API_EMPLOYEES_URL = 'http://localhost:8080/api/employees'
const REST_API_DEPARTMENTS_URL = 'http://localhost:8080/api/departments'

export const listEmployees = () => axios.get(REST_API_EMPLOYEES_URL);

export const createEmployee = (employee) => axios.post(REST_API_EMPLOYEES_URL + "/create", employee);

export const getEmployeeById = (employeeId) => axios.get(REST_API_EMPLOYEES_URL + "/" + employeeId);

export const updateEmployee = (employeeId, employee) => axios.put(REST_API_EMPLOYEES_URL + '/' + employeeId, employee);

export const deleteEmployee = (employeeId) => axios.delete(REST_API_EMPLOYEES_URL + "/" + employeeId);

export const listDepartments = () => axios.get(REST_API_DEPARTMENTS_URL);

export const createDepartment = (department) => axios.post(REST_API_DEPARTMENTS_URL, department);

export const updateDepartment = (departmentId, department ) => axios.put(REST_API_DEPARTMENTS_URL + "/" + departmentId, department);

export const getDepartmentById = (departmentId) => axios.get(REST_API_DEPARTMENTS_URL + "/" + departmentId);

export const deleteDepartment = (departmentId) => axios.delete(REST_API_DEPARTMENTS_URL + "/" + departmentId);