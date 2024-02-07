import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PageHeader from "../components/Common/PageHeader";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useState } from "react";
import EmployeeModal from "../components/Employee/EmployeeModal";
import { useDispatch } from "react-redux";
import { getEmployeesAction } from "../ducks/slices/employeeSlice";
import ConfirmModal from "../components/Common/ConfirmModal";
import { deleteEmployee } from "../api/employeeApi";

export default function Employees() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [employeeToDelete, setEmployeeToDelete] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const employees = useSelector((state) => {
    return state.employeeReducer.employees;
  });

  function addNewEmployees() {
    setOpenModal(true);
  }

  function handleEditClick(employee) {
    setOpenModal(true);
    setSelectedEmployee(employee);
  }

  function handleDelete() {
    deleteEmployee(employeeToDelete).then(() => {
      dispatch(getEmployeesAction());
      setOpenDeleteModal(false);
    });
  }

  function handleDeleteClick(id) {
    setEmployeeToDelete(id);
    setOpenDeleteModal(true);
  }

  function handleClose(event) {
    if (event) {
      dispatch(getEmployeesAction());
    }

    setOpenModal(false);
  }

  function handleDeleteClose() {
    setOpenDeleteModal(false);
  }

  return (
    <>
      <PageHeader title="Employees" onAdd={addNewEmployees} />

      <EmployeeModal
        openModal={openModal}
        onClose={handleClose}
        selectedEmployee={selectedEmployee}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="employees table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Employee Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow
                key={employee.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {employee.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employee.firstName} {employee.lastName}
                </TableCell>

                <TableCell component="th" scope="row">
                  <Button
                    variant="outline"
                    color="secondary"
                    onClick={() => handleEditClick(employee)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDeleteClick(employee.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmModal
        openModal={openDeleteModal}
        onClose={handleDeleteClose}
        onConfirm={handleDelete}
      />
    </>
  );
}
