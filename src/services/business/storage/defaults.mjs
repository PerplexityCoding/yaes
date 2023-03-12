export const INIT_DEFAULT_CONFIG = {
  version: "1.1.1",
  projects: [],
  envs: [],
  options: {},
};

export const DEFAULT_OPTIONS = {
  displayDomain: false,
  displayHeader: true,
  displayFooter: true,
  displaySeeProjectsLink: true,
  displayRibbon: false,
  displayBadge: true,
  badgeOptions: {
    backgroundColor: "#2677c9",
  },
  ribbonOptions: {
    type: "corner-ribbon",
    color: "white",
    backgroundColor: "#2677c9",
    position: "right",
  },
  colorScheme: "system",
  allowBugTrackerReporting: true,
  import: {
    sync: false,
    mergeOptionsMode: "default",
  },
  pingUrl: false,
  displayStyle: "list",
  switchEnvBetweenProjects: true,
};
