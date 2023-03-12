import { setBadgeBackgroundColor, setBadgeText } from "@/services/chrome/action";
import { updateBadgeTextFromEnv } from "@/services/business/badge";
import { getConfig } from "@/services/business/storage/get";
import { waitFor } from "../../../../../src/services/utils";
import {getCurrentEnv} from '@/services/business/url/index.mjs';

jest.mock("@/services/business/storage/get");
jest.mock("@/services/chrome/storage");
jest.mock("@/services/chrome/action");

describe("Badge", () => {
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
        badgeOptions: {
          backgroundColor: "#2677c9",
        },
      },
      {
        name: "Germany",
        url: "https://www.google.de/",
        displayRibbon: false,
        badgeOptions: {
          backgroundColor: "#2677c9",
        },
      },
      {
        name: "Spain",
        shortName: "SP",
        url: "https://www.google.es/",
        displayRibbon: false,
        displayBadge: true,
        badgeOptions: {
          backgroundColor: "#2677c9",
        },
      },
      {
        name: "Other",
        shortName: "OH",
        url: "https://www.google.oh/",
        displayBadge: false,
        badgeOptions: {
          backgroundColor: "#2677c9",
        },
      },
    ],
    options: {
      displayRibbon: true,
      ribbonOptions: {
        color: "#2677c9",
        position: "left",
      },
      displayBadge: true,
      displayDomain: true,
      badgeOptions: {
        backgroundColor: "#2677c9",
      },
    },
  };

  afterEach(() => {
    setBadgeText.mockClear();
    setBadgeBackgroundColor.mockClear();
  });

  function mockStorageEnvGet() {
    getConfig.mockReturnValue({ config });
  }

  it("updateBadgeTextFromEnv with shortName", async () => {
    mockStorageEnvGet();

    const { config } = await getConfig();
    const env = getCurrentEnv("https://www.google.fr", config);
    await updateBadgeTextFromEnv(0, env);
    await waitFor();
    expect(setBadgeText).toHaveBeenCalledWith(0, "FR");
  });

  it("updateBadgeTextFromEnv with name", async () => {
    mockStorageEnvGet();

    const { config } = await getConfig();
    const env = getCurrentEnv("https://www.google.de", config);
    await updateBadgeTextFromEnv(1, env);
    await waitFor();
    expect(setBadgeText).toHaveBeenCalledWith(1, "Germ");
    expect(setBadgeBackgroundColor).toHaveBeenCalledWith(1, "#2677c9");
  });

  it("updateBadgeTextFromEnv with shortName and name and color", async () => {
    mockStorageEnvGet();

    const { config } = await getConfig();
    const env = getCurrentEnv("https://www.google.es", config);
    await updateBadgeTextFromEnv(2, env);
    await waitFor();
    expect(setBadgeText).toHaveBeenCalledWith(2, "SP");
    expect(setBadgeBackgroundColor).toHaveBeenCalledWith(2, "#2677c9");
  });

  it("updateBadgeTextFromEnv with badge false", async () => {
    mockStorageEnvGet();

    const { config } = await getConfig();
    const env = getCurrentEnv("https://www.google.oh", config);
    await updateBadgeTextFromEnv(3, env);
    await waitFor();
    expect(setBadgeText).toHaveBeenCalledWith(3, "");
  });
});
