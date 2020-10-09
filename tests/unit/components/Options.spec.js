import { waitFor } from "../../../src/services/utils";

jest.mock("@/services/chrome/storage");

import { shallowMount } from "@vue/test-utils";
import { storageGetValue } from "@/services/chrome/storage";
import Options from "@/Options.vue";

describe("Options.vue", () => {
  function mockStorageEnvGet() {
    storageGetValue.mockReturnValue(
      JSON.stringify({
        envs: [
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
        ]
      })
    );
  }

  it("should witch modes without errors", async () => {
    mockStorageEnvGet();
    const wrapper = shallowMount(Options);
    await waitFor();

    const clickOnModes = async idx => {
      let jsonEditorModes = wrapper.find(".jsoneditor-modes button");
      await jsonEditorModes.trigger("click");
      await waitFor();

      const typeModes = wrapper.findAll(".jsoneditor-type-modes");
      expect(typeModes).toHaveLength(2);

      await typeModes[idx].trigger("click");
      await waitFor();
    };

    await clickOnModes(1);
    expect(wrapper.find(".jsoneditor-modes button").text()).toContain("Code");

    await clickOnModes(0);
    expect(wrapper.find(".jsoneditor-modes button").text()).toContain("Tree");
  });
});
