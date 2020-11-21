import deepmerge from "deepmerge";
import { getNextEnvId, getNextProjectId } from "@/services/business/ids";
import { removeUndefined, updateArray } from "@/services/utils";

function findIndex(objId) {
  return (array) => array.findIndex((o) => o.id === objId);
}

export function newProject(config, data) {
  return {
    id: getNextProjectId(config.projects),
    envs: [],
    ...data,
  };
}

export function addProject(config, project) {
  return {
    ...config,
    projects: [...config.projects, project],
  };
}

export function deleteProject(config, projectId) {
  const project = getProjectById(config, projectId);
  const envs = config.envs.filter((env) => project.envs.indexOf(env.id) < 0);
  const projects = updateArray(
    config.projects,
    findIndex(projectId),
    () => null
  );
  return {
    ...config,
    envs,
    projects,
  };
}

export function updateProject(config, project) {
  return {
    ...config,
    projects: updateArray(
      config.projects,
      findIndex(project.id),
      () => project
    ),
  };
}

export function newEnv(config, data) {
  return {
    ...data,
    id: getNextEnvId(config.envs),
  };
}

export function addEnv(config, projectId, env) {
  const configEnvs = config.envs;

  const project = getProjectById(config, projectId);
  const projects = updateArray(config.projects, findIndex(projectId), () => ({
    ...project,
    envs: [...project.envs, env.id],
  }));
  const envs = [...configEnvs, env];

  return {
    ...config,
    projects,
    envs,
  };
}

export function deleteEnv(config, envId) {
  const envs = config.envs;
  const projects = config.projects;

  return {
    ...config,
    projects: projects.map((project) => ({
      ...project,
      envs: project.envs.filter((currentEnvId) => currentEnvId !== envId),
    })),
    envs: updateArray(envs, findIndex(envId), () => null),
  };
}

export function updateEnv(config, env) {
  return {
    ...config,
    envs: updateArray(config.envs, findIndex(env.id), () => env),
  };
}

export function getProjectEnvs(config, projectId) {
  const project = getProjectById(config, projectId);
  if (project.envs && project.envs.length > 0) {
    return project.envs.map((envId) =>
      config.envs.find((env) => env.id === envId)
    );
  }
  return [];
}

export function getProjectById(config, projectId) {
  return config.projects.find((project) => project.id === projectId);
}

export function getEnvById(config, envId) {
  return config.envs.find((env) => env.id === envId);
}

export function mergeOptions(destConfig, currentConfig, mode) {
  destConfig.options = mergeGlobalOptions(
    destConfig.options,
    currentConfig.options,
    mode
  );
  mergeEnvOptions(destConfig, currentConfig, mode);
}

function mergeGlobalOptions(destConfigOptions, currentConfigOptions, mode) {
  if (mode === "merge") {
    return deepmerge(destConfigOptions, currentConfigOptions);
  } else if (mode === "keep") {
    return {
      ...currentConfigOptions,
    };
  }
}

function mergeEnvOptions(destConfig, currentConfig, mode) {
  const envOptionsById = currentConfig.envs.reduce((acc, env) => {
    acc[env.id] = getOverridableOptions(env);
    return acc;
  }, {});

  destConfig.envs = destConfig.envs.map((env) => {
    const existingEnv = envOptionsById[env.id];
    if (existingEnv) {
      return {
        ...getEnvBaseOptions(env),
        ...mergeGlobalOptions(
          getOverridableOptions(env),
          envOptionsById[env.id],
          mode
        ),
      };
    }
    return env;
  });
}

function getEnvBaseOptions(env) {
  return removeUndefined({
    id: env.id,
    shortName: env.shortName,
    name: env.name,
    url: env.url,
    appendUrlParams: env.appendUrlParams,
    removeUrlParams: env.removeUrlParams,
  });
}

function getOverridableOptions(env) {
  return removeUndefined({
    displayRibbon: env.displayRibbon,
    ribbonOptions: env.ribbonOptions,
    displayBadge: env.displayBadge,
    badgeOptions: env.badgeOptions,
    displayDomain: env.displayDomain,
    pingUrl: env.pingUrl,
  });
}
