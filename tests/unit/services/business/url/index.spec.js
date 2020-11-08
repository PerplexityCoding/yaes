import { getCurrentEnv } from "../../../../../src/services/business/url";

describe("Url", () => {
  const config = {
    envs: [
      {
        shortName: "FR",
        url: "https://www.google.fr/",
        displayRibbon: true,
        ribbonOptions: {
          color: "#2519c7",
          type: "square-ribbon",
        },
        displayBadge: true,
        displayDomain: true,
      },
      {
        shortName: "DE",
        name: "Germany",
        url: "https://www.google.de/",
        ribbon: false,
      },
    ],
    options: {
      ribbonOptions: {
        color: "red",
        position: "left",
      },
      displayBadge: false,
      displayDomain: true,
    },
  };

  it("get Current Env", async () => {
    const env = getCurrentEnv("https://www.google.de/toto", config);

    expect(env).toEqual({
      shortName: "DE",
      name: "Germany",
      url: "https://www.google.de/",
      ribbon: false,
    });
  });

  /*it("Merge Options", async () => {
    const mergedConfig = mergeOptions(config);

    expect(mergedConfig.envs).toEqual([
      {
        ribbon: {
          color: "#2519c7",
          position: "left",
          type: "square-ribbon"
        },
        badge: true,
        displayDomain: true,
        shortName: "FR",
        url: "https://www.google.fr/"
      },
      {
        shortName: "DE",
        name: "Germany",
        url: "https://www.google.de/",
        badge: false,
        ribbon: false,
        displayDomain: true
      }
    ]);
  });*/
});
