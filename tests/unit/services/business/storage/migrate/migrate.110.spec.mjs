import migrate from "@/services/business/storage/migrate/versions/v1.1.0";

describe("Migrate", () => {
  const migrateTest = (config, expectConfig) => {
    migrate(config);
    expect(config).toEqual(expectConfig);
  };

  it("should migrate ribbon & badge envs", () => {
    migrateTest(
      {
        envs: [
          {
            ribbon: {
              backgroundColor: "#2519c7",
              color: "pink",
              type: "corner-ribbon",
            },
            badge: {
              backgroundColor: "#159752",
            },
          },
          {
            badge: false,
            ribbon: false,
          },
          {
            badge: true,
            ribbon: true,
          },
          {
            name: "Germany",
          },
        ],
      },
      {
        version: "1.1.0",
        projects: [
          {
            id: 0,
            name: "Default Project",
            envs: [0, 1, 2, 3],
          },
        ],
        envs: [
          {
            id: 0,
            badgeOptions: {
              backgroundColor: "#159752",
            },
            displayBadge: true,
            displayRibbon: true,
            ribbonOptions: {
              backgroundColor: "#2519c7",
              color: "pink",
              type: "corner-ribbon",
            },
          },
          {
            id: 1,
            displayBadge: false,
            displayRibbon: false,
          },
          {
            id: 2,
            displayBadge: true,
            displayRibbon: true,
          },
          {
            id: 3,
            name: "Germany",
          },
        ],
      }
    );
  });

  it("should migrate envs & projects", () => {
    migrateTest(
      {
        projects: [
          {
            id: "G",
          },
          {
            name: "K",
          },
          {
            name: "F",
          },
        ],
        envs: [
          {
            name: "123",
            project: "G",
          },
          {
            name: "456",
            project: "H",
          },
          {
            name: "753",
            project: "F",
          },
          {
            name: "789",
          },
        ],
      },
      {
        version: "1.1.0",
        projects: [
          {
            id: 0,
            name: "G",
            envs: [0],
          },
          {
            id: 1,
            name: "K",
            envs: [],
          },
          {
            id: 2,
            name: "F",
            envs: [2],
          },
          {
            id: 3,
            name: "H",
            envs: [1],
          },
          {
            id: 4,
            name: "Default Project",
            envs: [3],
          },
        ],
        envs: [
          {
            id: 0,
            name: "123",
          },
          {
            id: 1,
            name: "456",
          },
          {
            id: 2,
            name: "753",
          },
          {
            id: 3,
            name: "789",
          },
        ],
      }
    );
  });

  it("should migrate ribbon & badge options object", () => {
    migrateTest(
      {
        options: {
          ribbon: {
            backgroundColor: "#2519c7",
            color: "pink",
            type: "corner-ribbon",
          },
          badge: {
            backgroundColor: "#2519c7",
          },
        },
      },
      {
        version: "1.1.0",
        projects: [],
        options: {
          displayRibbon: true,
          ribbonOptions: {
            backgroundColor: "#2519c7",
            color: "pink",
            type: "corner-ribbon",
          },
          displayBadge: true,
          badgeOptions: {
            backgroundColor: "#2519c7",
          },
        },
      }
    );
  });

  it("should migrate ribbon & badge options true", () => {
    migrateTest(
      {
        options: {
          ribbon: true,
          badge: true,
        },
      },
      {
        version: "1.1.0",
        projects: [],
        options: {
          displayRibbon: true,
          displayBadge: true,
        },
      }
    );
  });

  it("should migrate ribbon & badge options false", () => {
    migrateTest(
      {
        options: {
          ribbon: false,
          badge: false,
        },
      },
      {
        version: "1.1.0",
        projects: [],
        options: {
          displayRibbon: false,
          displayBadge: false,
        },
      }
    );
  });

  it("should not migrate ribbon & badge options", () => {
    migrateTest(
      {
        options: {
          displayRibbon: false,
          displayBadge: true,
        },
      },
      {
        projects: [],
        version: "1.1.0",
        options: {
          displayRibbon: false,
          displayBadge: true,
        },
      },
      false
    );
  });
});
