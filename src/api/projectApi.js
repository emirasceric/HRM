import { get, post, remove, update } from "../utils/request";

const PROJECTS_API = "http://localhost:7654/projects";

export function getProjects() {
  return get(PROJECTS_API);
}

export function getProjectById(id) {
  return get(`${PROJECTS_API}/${id}`);
}

export function postProject(project) {
  return post(PROJECTS_API, project);
}

export function editProject(project) {
  return update(`${PROJECTS_API}/${project.id}`, project);
}

export function deleteProject(id) {
  return remove(`${PROJECTS_API}/${id}`);
}
