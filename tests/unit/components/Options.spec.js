import { waitFor } from "../../../src/services/utils";
import { shallowMount } from "@vue/test-utils";
import { storageGetValue, storageSet } from "@/services/chrome/storage";
import Options from "@/Options.vue";
import { DEFAULT_CONFIG } from "@/Options.vue";

jest.mock("@/services/chrome/storage");

describe("Options.vue", () => {
  const config = {
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
  };

  function mockStorageEnvGet() {
    storageGetValue.mockReturnValue(JSON.stringify(config));
  }

  function mockStorageEnvGetEmpty() {
    storageGetValue.mockReturnValue(null);
  }

  it("should switch modes without errors", async () => {
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

  it("load without errors", async () => {
    mockStorageEnvGet();
    const wrapper = shallowMount(Options);
    await waitFor();

    const editor = wrapper.vm.$data.editor;
    expect(editor.get()).toEqual(config);
  });

  /*it("save to storage when editing", async () => {
    jest.useFakeTimers();
    mockStorageEnvGet();

    const wrapper = shallowMount(Options);
    await waitFor();

    const editor = wrapper.vm.$data.editor;
    editor.set({
      envs: false
    });
    editor.options.onChange();
    jest.runAllTimers();

    expect(storageSet).toHaveBeenCalledWith({
      config: JSON.stringify({ env: false })
    });
  });*/

  it("should save config in storage with default value when loaded with no config", async () => {
    mockStorageEnvGetEmpty();

    shallowMount(Options);
    await waitFor();

    expect(storageSet).toHaveBeenCalledWith({
      config: JSON.stringify(DEFAULT_CONFIG)
    });
  });
});
