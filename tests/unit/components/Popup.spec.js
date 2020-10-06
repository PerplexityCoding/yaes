jest.mock("@/services/chrome/tabs");
jest.mock("@/services/chrome/storage");

import { mount } from "@vue/test-utils";
import Popup from "@/Popup.vue";
import EnvList from "@/components/EnvList";
import { waitFor } from "@/services/utils";
import {
  getCurrentTab,
  openChromeUrl,
  openOptionsPage
} from "@/services/chrome/tabs";

import { storageGetValue } from "@/services/chrome/storage";

function mockStorageEnvGet() {
  storageGetValue.mockReturnValue(
    JSON.stringify([
      {
        id: 1,
        name: "FR",
        url: "https://www.google.fr/sdfsdf"
      },
      {
        id: 2,
        name: "DE",
        url: "https://www.google.de/sdfsdf"
      },
      {
        id: 3,
        name: "ES",
        url: "https://www.google.es/"
      }
    ])
  );
}

describe("Popup.vue", () => {
  beforeAll(() => {
    mockStorageEnvGet();
  });

  it("open new tab when clicking on env button", async () => {
    const currentTab = { id: 0, url: "http://www.google.fr/coucou" };
    getCurrentTab.mockReturnValue(Promise.resolve(currentTab));

    const wrapper = mount(Popup);
    await waitFor();

    const envList = wrapper.findComponent(EnvList);

    const firstButton = envList.findAll("button")[1];
    await firstButton.trigger("click");

    expect(openChromeUrl).toHaveBeenCalledWith(
      currentTab,
      "https://www.google.de/coucou",
      undefined
    );
  });

  it("open new tab when clicking (middle) on env button", async () => {
    const currentTab = { id: 0, url: "http://www.google.fr/coucou" };
    getCurrentTab.mockReturnValue(Promise.resolve(currentTab));

    const wrapper = mount(Popup);
    await waitFor();

    const envList = wrapper.findComponent(EnvList);

    const firstButton = envList.findAll("button")[1];
    await firstButton.trigger("click.middle");

    expect(openChromeUrl).toHaveBeenCalledWith(
      currentTab,
      "https://www.google.de/coucou",
      true
    );
  });

  it("display empty message when not on env domain", async () => {
    const currentTab = { id: 0, url: "http://www.toto.fr/coucou" };
    getCurrentTab.mockReturnValue(Promise.resolve(currentTab));

    const wrapper = mount(Popup);
    await waitFor();

    expect(wrapper.html()).toContain("No environment has been found");
    const optionsButton = wrapper.find('a[href^="#/options"]');
    expect(optionsButton.exists()).toBe(true);

    await optionsButton.trigger("click");
    expect(openOptionsPage).toHaveBeenCalled();
  });
});
