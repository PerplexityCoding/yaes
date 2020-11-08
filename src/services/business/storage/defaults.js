export const INIT_DEFAULT_CONFIG = {
  version: "1.1.0",
  projects: [
    {
      id: 0,
      name: "Default Project",
      envs: []
    }
  ],
  envs: [],
  options: {}
};

export const DEFAULT_OPTIONS = {
  displayDomain: false,
  displayHeader: true,
  displayFooter: true,
  displaySeeProjectsLink: true,
  displayRibbon: true,
  displayBadge: true,
  badgeOptions: {
    backgroundColor: "#2677c9"
  },
  ribbonOptions: {
    type: "corner-ribbon",
    color: "white",
    backgroundColor: "#2677c9",
    position: "right"
  },
  colorScheme: "system"
};
