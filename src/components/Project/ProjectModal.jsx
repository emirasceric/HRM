import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  OutlinedInput,
  Chip,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { editProject, postProject } from "../../api/projectApi";
import { useSelector } from "react-redux";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ProjectModal(props) {
  const { onClose, openModal, selectedProject } = props;
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [manager, setManager] = useState("");
  const [projectEmployees, setProjectEmployees] = useState([]);
  const accounts = useSelector((state) => state.accountReducer.accounts);
  const employees = useSelector((state) => state.employeeReducer.employees);

  useEffect(() => {
    setProjectName(selectedProject?.name || "");
    setManager(selectedProject?.manager || "");
    setSelectedAccount(selectedProject?.selectedAccount || "");
    setProjectEmployees(selectedProject?.projectEmployees || []);
  }, [selectedProject]);

  const isValid = Boolean(manager && projectName && selectedAccount);

  function handleProjectNameChange(event) {
    setProjectName(event.target.value);
  }

  function handleReset() {
    setSelectedAccount(null);
    setProjectName("");
    setProjectEmployees([]);
    setManager("");
  }

  function handleAddProject() {
    if (!isValid) return;

    postProject({ name: projectName, selectedAccount, projectEmployees }).then(
      () => {
        handleReset();
        onClose(true);
      }
    );
  }

  function handleEditProject() {
    if (!isValid) return;

    const updatedProject = {
      ...selectedProject,
      projectName,
      manager,
      selectedAccount,
      projectEmployees,
    };

    editProject(updatedProject).then(() => {
      onClose(true);
      handleReset();
    });
  }

  function handleAccountChange(event) {
    setSelectedAccount(event.target.value);
  }

  function handleEmployeesChange(event) {
    setProjectEmployees(event.target.value);
  }

  function handleProjectManagerChange(event) {
    setManager(event.target.value);
  }

  function handleSubmit() {
    const methodToCall = selectedProject ? handleEditProject : handleAddProject;

    methodToCall();
  }

  return (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="project-modal-title"
      aria-describedby="project-modal-description"
    >
      <Box sx={style}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography id="project-modal-title" variant="h6" component="h2">
              {!selectedProject ? "Add New Project" : "Edit Project"}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              id="project-name"
              label="Project Name"
              variant="outlined"
              value={projectName}
              onChange={handleProjectNameChange}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              id="project-manager"
              label="Manager"
              variant="outlined"
              value={manager}
              onChange={handleProjectManagerChange}
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="select-account">Select Account</InputLabel>
              <Select
                labelId="select-account"
                value={selectedAccount}
                label="Select Account"
                onChange={handleAccountChange}
              >
                {accounts.map((account) => {
                  return (
                    <MenuItem key={account.id} value={account.id}>
                      {account.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="multiple-employees">Employees</InputLabel>
              <Select
                labelId="multiple-employees"
                multiple
                value={projectEmployees}
                onChange={handleEmployeesChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Employee" />
                }
                renderValue={(selected) => {
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => {
                        const selectedEmployee = employees.find(
                          (e) => e.id === value
                        );

                        return (
                          <Chip
                            key={value}
                            label={
                              selectedEmployee.firstName +
                              " " +
                              selectedEmployee.lastName
                            }
                          />
                        );
                      })}
                    </Box>
                  );
                }}
                MenuProps={MenuProps}
              >
                {employees.map((employee) => (
                  <MenuItem
                    key={employee.id}
                    value={employee.id}
                    // style={getStyles(name, personName, theme)}
                  >
                    <Checkbox
                      checked={projectEmployees.indexOf(employee.id) > -1}
                    />
                    <ListItemText
                      primary={employee.firstName + " " + employee.lastName}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item container justifyContent="end">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              disabled={!isValid}
              variant="contained"
              onClick={handleSubmit}
            >
              {!selectedProject ? "Add New" : "Edit"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
