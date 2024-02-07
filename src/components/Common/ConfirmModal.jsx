import { Button, Modal, Typography, Box, Grid } from "@mui/material";

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

export default function ConfirmModal(props) {
  const { onClose, onConfirm, openModal } = props;

  return (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <Box sx={style}>
        <Grid container direction="column">
          <Grid item>
            <Typography id="confirm-modal-title" variant="h6" component="h2">
              Are you sure?
            </Typography>
          </Grid>

          <Grid item container justifyContent="end">
            <Button onClick={onClose}>No</Button>
            <Button variant="contained" onClick={onConfirm}>
              Yes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
