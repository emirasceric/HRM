import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { deleteAccount } from "../api/accountApi";
import { Button } from "@mui/material";
import AccountModal from "../components/Account/AccountModal";
import ConfirmModal from "../components/Common/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { getAccountsAction } from "../ducks/slices/accountSlice";
import PageHeader from "../components/Common/PageHeader";

export default function Accounts() {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const accounts = useSelector((state) => {
    return state.accountReducer.accounts;
  });

  const dispatch = useDispatch();

  function loadAccounts() {
    dispatch(getAccountsAction());
  }

  function addNewAccount() {
    setOpenModal(true);
  }

  function handleClose(event) {
    if (event) {
      loadAccounts();
    }

    setOpenModal(false);
    setSelectedAccount(null);
  }

  function handleEditClick(account) {
    setSelectedAccount(account);
    setOpenModal(true);
  }

  function handleDelete() {
    deleteAccount(accountToDelete).then(() => {
      setAccountToDelete(null);
      setOpenDeleteModal(false);
      loadAccounts();
    });
  }

  function handleDeleteClick(id) {
    setOpenDeleteModal(true);
    setAccountToDelete(id);
  }

  return (
    <>
      <PageHeader title="Accounts" onAdd={addNewAccount} />

      <AccountModal
        openModal={openModal}
        onClose={(event) => handleClose(event)}
        selectedAccount={selectedAccount}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="accounts table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Account Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account, index) => (
              <TableRow
                key={account.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {account.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    variant="outline"
                    color="secondary"
                    onClick={() => handleEditClick(account)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDeleteClick(account.id)}
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
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
