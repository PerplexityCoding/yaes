import { getNextEnvId, getNextProjectId } from "@/services/business/ids";
import { updateArray } from "@/services/utils";

function findIndex(obj) {
  return array => array.findIndex(o => o.id === obj.id);
}

export function newProject(config, data) {
  return {
    id: getNextProjectId(config.projects),
    envs: [],
    ...data
  };
}

export function addProject(config, project) {
  return {
    ...config,
    projects: [...config.projects, project]
  };
}

export function deleteProject(config, project) {
  const envs = config.envs.filter(env => project.envs.indexOf(env.id) < 0);
  const projects = updateArray(config.projects, findIndex(project), () => null);
  return {
    ...config,
    envs,
    projects
  };
}

export function updateProject(config, project) {
  return {
    ...config,
    projects: updateArray(config.projects, findIndex(project), () => project)
  };
}

export function newEnv(config, data) {
  return {
    ...data,
    id: getNextEnvId(config.envs)
  };
}

export function addEnv(config, project, env) {
  const configEnvs = config.envs;

  const projects = updateArray(config.projects, findIndex(project), () => ({
    ...project,
    envs: [...project.envs, env.id]
  }));
  const envs = [...configEnvs, env];

  return {
    ...config,
    projects,
    envs
  };
}

export function deleteEnv(config, env) {
  const envs = config.envs;
  const projects = config.projects;

  return {
    ...config,
    projects: projects.map(project => ({
      ...project,
      envs: project.envs.filter(envId => envId !== env.id)
    })),
    envs: updateArray(envs, findIndex(env), () => null)
  };
}

export function updateEnv(config, env) {
  return {
    ...config,
    envs: updateArray(config.envs, findIndex(env), () => env)
  };
}

export function getProjectEnvs(config, project) {
  return project.envs.map(envId => config.envs.find(env => env.id === envId));
}
