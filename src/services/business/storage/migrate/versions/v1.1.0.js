export default function migrate(config) {
  const options = config.options;
  migrateRibbon(options);
  migrateBadge(options);

  config.projects = config.projects || [];
  config.projects.forEach(project => (project.envs = project.envs || []));

  if (config.envs) {
    config.envs.forEach((env, idx) => {
      migrateId(env, idx);
      migrateRibbon(env);
      migrateBadge(env);
      migrateEnvProject(config, env);
    });
  }

  migrateProjectId(config.projects);
  config.version = "1.1.0";
}

function migrateRibbon(obj) {
  if (obj?.ribbon !== undefined) {
    obj.displayRibbon = !!obj.ribbon;
    if (typeof obj.ribbon === "object") {
      obj.ribbonOptions = obj.ribbon;
    }
    delete obj.ribbon;
    return true;
  }
  return false;
}

function migrateBadge(obj) {
  if (obj?.badge !== undefined) {
    obj.displayBadge = !!obj.badge;
    if (typeof obj.badge === "object") {
      obj.badgeOptions = obj.badge;
    }
    delete obj.badge;
  }
}

function migrateId(env, idx) {
  if (env.id == null) {
    env.id = idx;
  }
}

function migrateEnvProject(config, env) {
  const projects = config.projects;
  const defaultProject = projects.find(
    project => project.name === "Default Project"
  ) || {
    name: "Default Project",
    envs: []
  };

  if (env.project != null) {
    const project = projects.find(
      project => project.id === env.project || project.name === env.project
    );
    if (project) {
      project.envs.push(env.id);
    } else {
      const newProject = { name: env.project, envs: [] };
      newProject.envs.push(env.id);
      projects.push(newProject);
    }
    delete env.project;
  } else {
    defaultProject.envs.push(env.id);
  }

  if (defaultProject.envs.length === 1) {
    projects.push(defaultProject);
  }

  config.projects = projects;
}

function migrateProjectId(projects) {
  projects.forEach((project, idx) => {
    project.name = project.name || project.id;
    project.id = idx;
  });
}
