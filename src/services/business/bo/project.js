export function mapProjectEnvs(project, envs) {
  return project.envs.map((envId) => envs.find((env) => env.id === envId));
}

export function findProjectByEnvId(projects, envId) {
  return projects.find((project) => project.envs.indexOf(envId) >= 0);
}

export function isValidProject(project) {
  return (project && project.name != null) || project.id != null;
}
