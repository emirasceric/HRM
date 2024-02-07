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
} from "@mui/material";
import { useSelector } from "react-redux";
import { editEmployee, postEmployee } from "../../api/employeeApi";

const SKILLS = ["Java", "JavaScript", "Angular", "React"];

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

const DEFAULT_VALUE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  skills: [],
  selectedProject: "",
};

export default function EmployeeModal(props) {
  const { onClose, openModal, selectedEmployee } = props;
  const [selectedProject, setSelectedProject] = useState(null);

  const [form, setForm] = useState(DEFAULT_VALUE);

  const projects = useSelector((state) => state.projectReducer.projects);

  useEffect(() => {
    setForm({
      firstName: selectedEmployee?.firstName,
      lastName: selectedEmployee?.lastName,
      email: selectedEmployee?.email,
      phone: selectedEmployee?.phone,
      country: selectedEmployee?.country,
      city: selectedEmployee?.city,
      skills: selectedEmployee?.skills || [],
      selectedProject: selectedEmployee?.selectedProject,
    });
  }, [selectedEmployee]);

  const isValid = Boolean(
    form.firstName && form.firstName && form.email && form.phone && form.country
  );

  function handleChange(event) {
    const { value, name } = event.target;

    setForm({ ...form, [name]: value });
  }

  function handleReset() {
    setForm(DEFAULT_VALUE);
  }

  function handleAddEmployee() {
    if (!isValid) return;

    postEmployee(form).then(() => {
      onClose(true);
      handleReset();
    });
  }

  function handleEditEmployee() {
    if (!isValid) return;

    const updatedEmployee = {
      ...selectedEmployee,
      ...form,
    };

    editEmployee(updatedEmployee).then(() => {
      onClose(true);
      handleReset();
    });
  }

  function handleSubmit() {
    const methodToCall = selectedEmployee
      ? handleEditEmployee
      : handleAddEmployee;

    methodToCall();
  }

  return (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="employee-modal-title"
      aria-describedby="employee-modal-description"
    >
      <Box sx={style}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography id="project-modal-title" variant="h6" component="h2">
              {!selectedEmployee ? "Add New Employee" : "Edit Employee"}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              id="first-name"
              label="First Name"
              variant="outlined"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              id="last-name"
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              id="phone"
              label="Phone"
              variant="outlined"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              id="country"
              label="Country"
              variant="outlined"
              name="country"
              type="country"
              value={form.country}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              id="city"
              label="City"
              variant="outlined"
              name="city"
              type="city"
              value={form.city}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="select-project">Select Skills</InputLabel>
              <Select
                labelId="select-skills"
                value={form.skills}
                label="Select Skills"
                name="skills"
                onChange={handleChange}
                multiple
              >
                {SKILLS.map((skill) => {
                  return (
                    <MenuItem key={skill} value={skill}>
                      {skill}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="select-project">Select Project</InputLabel>
              <Select
                labelId="select-project"
                value={form.selectedProject}
                label="Select Project"
                name="selectedProject"
                onChange={handleChange}
              >
                {projects.map((project) => {
                  return (
                    <MenuItem key={project.id} value={project.id}>
                      {project.name}
                    </MenuItem>
                  );
                })}
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
              {!selectedEmployee ? "Add New" : "Edit"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
