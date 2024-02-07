import { get, post, remove, update } from "../utils/request";

const EMPLOYEES_API = "http://localhost:7654/employees";

export function getEmployees() {
  return get(EMPLOYEES_API);
}

export function getEmployeeById(id) {
  return get(`${EMPLOYEES_API}/${id}`);
}

export function postEmployee(employee) {
  return post(EMPLOYEES_API, employee);
}

export function editEmployee(employee) {
  return update(`${EMPLOYEES_API}/${employee.id}`, employee);
}

export function deleteEmployee(id) {
  return remove(`${EMPLOYEES_API}/${id}`);
}
