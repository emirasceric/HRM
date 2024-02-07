import { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import ProjectModal from "../components/Project/ProjectModal";
import PageHeader from "../components/Common/PageHeader";
import { connect } from "react-redux";
import { deleteProject } from "../api/projectApi";
import ConfirmModal from "../components/Common/ConfirmModal";
import { getProjectsAction } from "../ducks/slices/projectSlice";

class Projects extends Component {
  constructor() {
    super();

    this.state = {
      openModal: false,
      selectedProject: null,
      projectToDelete: null,
      openDeleteModal: false,
    };
  }

  componentDidMount() {}

  addNewProject = () => {
    this.setState({ openModal: true });
  };

  handleCloseModal = (event) => {
    if (event) {
      this.props.getProjectsAction();
    }

    this.setState({ openModal: false });
  };

  handleEditClick = (project) => {
    this.setState({ openModal: true, selectedProject: project });
  };

  handleDelete = () => {
    deleteProject(this.state.projectToDelete).then(() => {
      this.setState({
        projectToDelete: null,
        openDeleteModal: false,
      });
      this.props.getProjectsAction();
    });
  };

  handleDeleteClick = (id) => {
    this.setState({
      openDeleteModal: true,
      projectToDelete: id,
    });
  };

  handleDeleteModalClose = () => {
    this.setState({ openDeleteModal: false });
  };

  render() {
    const { projects } = this.props;

    return (
      <>
        <PageHeader title="Projects" onAdd={this.addNewProject} />

        <ProjectModal
          openModal={this.state.openModal}
          onClose={this.handleCloseModal}
          selectedProject={this.state.selectedProject}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="projects table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Account</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow
                  key={project.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {project.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {project.selectedAccount}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      variant="outline"
                      color="secondary"
                      onClick={() => this.handleEditClick(project)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      onClick={() => this.handleDeleteClick(project.id)}
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
          openModal={this.state.openDeleteModal}
          onClose={this.handleDeleteModalClose}
          onConfirm={this.handleDelete}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projectReducer.projects,
});

const mapDispatchToProps = {
  getProjectsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
