import {
  setBadgeBackgroundColor,
  setBadgeText,
} from "@/services/chrome/browserAction";
import { updateBadgeTextFromEnv } from "@/services/business/badge";
import { getConfig } from "@/services/business/storage/get";
import { waitFor } from "../../../../../src/services/utils";

jest.mock("@/services/business/storage/get");
jest.mock("@/services/chrome/storage");
jest.mock("@/services/chrome/browserAction");

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

    await updateBadgeTextFromEnv(0, "https://www.google.fr");
    await waitFor();
    expect(setBadgeText).toHaveBeenCalledWith(0, "FR");
  });

  it("updateBadgeTextFromEnv with name", async () => {
    mockStorageEnvGet();

    await updateBadgeTextFromEnv(1, "https://www.google.de");
    await waitFor();
    expect(setBadgeText).toHaveBeenCalledWith(1, "Germ");
    expect(setBadgeBackgroundColor).toHaveBeenCalledWith(1, "#2677c9");
  });

  it("updateBadgeTextFromEnv with shortName and name and color", async () => {
    mockStorageEnvGet();

    await updateBadgeTextFromEnv(2, "https://www.google.es");
    await waitFor();
    expect(setBadgeText).toHaveBeenCalledWith(2, "SP");
    expect(setBadgeBackgroundColor).toHaveBeenCalledWith(2, "#2677c9");
  });

  it("updateBadgeTextFromEnv with badge false", async () => {
    mockStorageEnvGet();

    await updateBadgeTextFromEnv(3, "https://www.google.oh");
    await waitFor();
    expect(setBadgeText).toHaveBeenCalledWith(3, "");
  });
});
