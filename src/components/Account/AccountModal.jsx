import { useState, useEffect } from "react";
import { Button, Modal, Typography, Box, TextField, Grid } from "@mui/material";
import { postAccount, editAccount } from "../../api/accountApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AccountModal(props) {
  const { onClose, openModal, selectedAccount } = props;
  const [accountName, setAccountName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    setAccountName(selectedAccount?.name || "");
    setContactPerson(selectedAccount?.contactPerson || "");
    setLocation(selectedAccount?.location || "");
  }, [selectedAccount]);

  function handleAccountNameChange(event) {
    setAccountName(event.target.value);
  }

  function handleContactPersonChange(event) {
    setContactPerson(event.target.value);
  }

  function handleLocationChange(event) {
    setLocation(event.target.value);
  }

  const isValid = Boolean(accountName && contactPerson && location);

  function resetFields() {
    setAccountName("");
    setLocation("");
    setContactPerson("");
  }

  function handleEditAccount() {
    if (!isValid) return;

    const updatedAccount = {
      ...selectedAccount,
      name: accountName,
      contactPerson,
      location,
    };

    editAccount(updatedAccount).then(() => {
      onClose(true);
      resetFields();
    });
  }

  function handleAddAccount() {
    if (!isValid) return;

    postAccount({ name: accountName, contactPerson, location }).then(() => {
      onClose(true);
      resetFields();
    });
  }

  function handleSubmit() {
    const methodToCall = selectedAccount ? handleEditAccount : handleAddAccount;

    methodToCall();
  }

  function handleClose() {
    const hasAnyValue = Boolean(accountName || contactPerson || location);

    if (hasAnyValue) {
      resetFields();
    }

    onClose();
  }

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="account-modal-title"
      aria-describedby="account-modal-description"
    >
      <Box sx={style}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography id="account-modal-title" variant="h6" component="h2">
              {!selectedAccount ? "Add New Account" : "Edit Account"}
            </Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <TextField
                fullWidth
                id="account-name"
                label="Account Name"
                variant="outlined"
                value={accountName}
                onChange={handleAccountNameChange}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="contact-person"
                label="Contact Person"
                variant="outlined"
                value={contactPerson}
                onChange={handleContactPersonChange}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="location"
                label="Location"
                variant="outlined"
                value={location}
                onChange={handleLocationChange}
              />
            </Grid>
          </Grid>

          <Grid item container justifyContent="end" spacing={2}>
            <Grid item>
              <Button onClick={handleClose}>Cancel</Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disabled={!isValid}
                onClick={handleSubmit}
              >
                {selectedAccount ? "Edit" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
