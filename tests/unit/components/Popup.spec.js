jest.mock("@/services/chrome/tabs");

import { mount } from "@vue/test-utils";
import Popup from "@/Popup.vue";
import EnvList from "@/components/EnvList";
import { getCurrentTab, openChromeUrl } from "@/services/chrome/tabs";

describe("Popup.vue", () => {
  it("open new tab when clicking (middle) on env button", async () => {
    const currentTab = { id: 0, url: "http://www.google.fr/coucou" };
    getCurrentTab.mockReturnValueOnce(Promise.resolve(currentTab));

    const wrapper = mount(Popup);

    const envList = wrapper.findComponent(EnvList);

    const firstButton = envList.findAll("button")[1];
    await firstButton.trigger("click");

    expect(openChromeUrl).toHaveBeenCalledWith(
      currentTab,
      "https://www.google.de/coucou",
      undefined
    );
  });
});
