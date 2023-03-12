import { mount } from "@vue/test-utils";
import Popup from "@/Popup.vue";
import EnvList from "@/components/popup/EnvList";
import { waitFor } from "@/services/utils";
import { getCurrentTab, openChromeUrl } from "@/services/chrome/tabs";
import { getConfig } from "@/services/business/storage/get";
import { INIT_DEFAULT_CONFIG } from "@/services/business/storage/defaults";
import GlobalIcons from "@/utils/plugins/global-icons";

jest.mock("@/services/business/storage/get");
jest.mock("@/services/chrome/tabs");

function mockStorageEnvGet() {
  getConfig.mockReturnValue({
    config: {
      projects: [
        {
          id: 0,
          name: "Default",
          envs: [1, 2, 3],
        },
      ],
      envs: [
        {
          id: 1,
          name: "FR",
          url: "https://www.google.fr/sdfsdf",
        },
        {
          id: 2,
          name: "DE",
          url: "https://www.google.de/sdfsdf",
        },
        {
          id: 3,
          name: "ES",
          url: "https://www.google.es/",
        },
      ],
    },
  });
}

function mockStorageEnvGetBadData() {
  getConfig.mockReturnValue({ config: { ...INIT_DEFAULT_CONFIG } });
}

function createDefaultWrapper() {
  const wrapper = mount(Popup, {
    global: {
      plugins: [GlobalIcons],
    },
  });

  return wrapper;
}

describe("Popup.vue", () => {
  beforeAll(() => {
    mockStorageEnvGet();
  });

  it("open new tab when clicking on env button", async () => {
    const currentTab = { id: 0, url: "http://www.google.fr/coucou" };
    getCurrentTab.mockReturnValue(Promise.resolve(currentTab));

    const wrapper = createDefaultWrapper();
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

    const wrapper = await createDefaultWrapper();
    await waitFor();

    const envList = wrapper.findComponent(EnvList);

    const firstButton = envList.findAll("button")[1];
    await firstButton.trigger("click.middle");

    expect(openChromeUrl).toHaveBeenCalledWith(currentTab, "https://www.google.de/coucou", true);
  });

  /*it("display empty message when not on env domain", async () => {
    const currentTab = { id: 0, url: "http://www.toto.fr/coucou" };
    getCurrentTab.mockReturnValue(Promise.resolve(currentTab));

    const wrapper = mount(Popup);
    await waitFor();

    expect(wrapper.html()).toContain("No environment has been found");
    const optionsButton = wrapper.find('a[href^="#/options"]');
    expect(optionsButton.exists()).toBe(true);

    await optionsButton.trigger("click");
    expect(openOptionsPage).toHaveBeenCalled();
  });*/

  it("display empty message when can not parse config", async () => {
    const consoleError = jest.spyOn(console, "error");
    consoleError.mockImplementation(() => {});
    mockStorageEnvGetBadData();

    const wrapper = createDefaultWrapper();
    await waitFor();

    expect(wrapper.html()).toContain(
      "No environments has been configured yet. Click on edit configuration link."
    );
    consoleError.mockRestore();
  });
});
