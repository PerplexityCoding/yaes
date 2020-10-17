import { migrate } from "@/services/business/storage/migrate";

describe("Migrate", () => {
  const migrateTest = (config, expectConfig, expectMigration = true) => {
    const hasMigrate = migrate(config);
    expect(hasMigrate).toBe(expectMigration);
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
              type: "corner-ribbon"
            },
            badge: {
              backgroundColor: "#159752"
            }
          },
          {
            badge: false,
            ribbon: false
          },
          {
            badge: true,
            ribbon: true
          },
          {
            name: "Germany"
          }
        ]
      },
      {
        envs: [
          {
            badgeOptions: {
              backgroundColor: "#159752"
            },
            displayBadge: true,
            displayRibbon: true,
            ribbonOptions: {
              backgroundColor: "#2519c7",
              color: "pink",
              type: "corner-ribbon"
            }
          },
          {
            displayBadge: false,
            displayRibbon: false
          },
          {
            displayBadge: true,
            displayRibbon: true
          },
          {
            name: "Germany"
          }
        ]
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
            type: "corner-ribbon"
          },
          badge: {
            backgroundColor: "#2519c7"
          }
        }
      },
      {
        options: {
          displayRibbon: true,
          ribbonOptions: {
            backgroundColor: "#2519c7",
            color: "pink",
            type: "corner-ribbon"
          },
          displayBadge: true,
          badgeOptions: {
            backgroundColor: "#2519c7"
          }
        }
      }
    );
  });

  it("should migrate ribbon & badge options true", () => {
    migrateTest(
      {
        options: {
          ribbon: true,
          badge: true
        }
      },
      {
        options: {
          displayRibbon: true,
          displayBadge: true
        }
      }
    );
  });

  it("should migrate ribbon & badge options false", () => {
    migrateTest(
      {
        options: {
          ribbon: false,
          badge: false
        }
      },
      {
        options: {
          displayRibbon: false,
          displayBadge: false
        }
      }
    );
  });

  it("should not migrate ribbon & badge options", () => {
    migrateTest(
      {
        options: {
          displayRibbon: false,
          displayBadge: true
        }
      },
      {
        options: {
          displayRibbon: false,
          displayBadge: true
        }
      },
      false
    );
  });
});
