const getConfig = jest.fn();
const setConfig = jest.fn();

const DEFAULT_OPTIONS = {
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
  }
};

export { getConfig, setConfig, DEFAULT_OPTIONS };
