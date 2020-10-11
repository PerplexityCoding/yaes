import {
  setBadgeBackgroundColor,
  setBadgeText
} from "@/services/chrome/browserAction";
import { updateBadgeTextFromEnv } from "@/services/business/badge";
import { storageGetValue } from "@/services/chrome/storage";
import { waitFor } from "../../../../../src/services/utils";

jest.mock("@/services/chrome/storage");
jest.mock("@/services/chrome/browserAction");

describe("Badge", () => {
  const config = {
    envs: [
      {
        shortName: "FR",
        url: "https://www.google.fr/",
        ribbon: {
          color: "#2519c7",
          type: "square-ribbon"
        },
        badge: true,
        displayDomain: true
      },
      {
        name: "Germany",
        url: "https://www.google.de/",
        ribbon: false
      },
      {
        name: "Spain",
        shortName: "SP",
        url: "https://www.google.es/",
        ribbon: false,
        badge: {
          backgroundColor: "red"
        }
      },
      {
        name: "Other",
        shortName: "OH",
        url: "https://www.google.oh/",
        badge: false
      }
    ],
    options: {
      ribbon: {
        color: "red",
        position: "left"
      },
      badge: true,
      displayDomain: true
    }
  };

  afterEach(() => {
    setBadgeText.mockClear();
    setBadgeBackgroundColor.mockClear();
  });

  function mockStorageEnvGet() {
    storageGetValue.mockReturnValue(JSON.stringify(config));
  }

  it("updateBadgeTextFromEnv with shortName", async () => {
    mockStorageEnvGet();

    updateBadgeTextFromEnv(0, "https://www.google.fr");
    await waitFor();
    expect(setBadgeText).toHaveBeenCalledWith(0, "FR");
  });

  it("updateBadgeTextFromEnv with name", async () => {
    mockStorageEnvGet();

    updateBadgeTextFromEnv(1, "https://www.google.de");
    await waitFor();
    expect(setBadgeText).toHaveBeenCalledWith(1, "Germ");
    expect(setBadgeBackgroundColor).toHaveBeenCalledWith(1, "#2677c9");
  });

  it("updateBadgeTextFromEnv with shortName and name and color", async () => {
    mockStorageEnvGet();

    updateBadgeTextFromEnv(2, "https://www.google.es");
    await waitFor();
    expect(setBadgeText).toHaveBeenCalledWith(2, "SP");
    expect(setBadgeBackgroundColor).toHaveBeenCalledWith(2, "red");
  });

  it("updateBadgeTextFromEnv with badge false", async () => {
    mockStorageEnvGet();

    updateBadgeTextFromEnv(3, "https://www.google.oh");
    await waitFor();
    expect(setBadgeText).toHaveBeenCalledWith(3, "");
  });
});
