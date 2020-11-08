import { getConfig } from "@/services/business/storage";
import { mount } from "@vue/test-utils";
import Options from "@/Options.vue";
import { waitFor } from "@/services/utils";
import EditorFormConfigProjects from "@/components/options/EditorFormConfigProjects";
import UniqueId from "@/utils/plugins/unique-id";
import { VuelidatePlugin } from "@vuelidate/core";

jest.mock("@/services/business/storage");

describe("Options.vue", () => {
  const config = {
    version: "1.1.0",
    projects: [
      {
        id: 0,
        name: "Project name test",
        envs: [1, 2, 3]
      }
    ],
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
    ],
    options: {}
  };

  function mockStorageEnvGet() {
    getConfig.mockReturnValue({ config });
  }

  it("should display the projects and envs", async () => {
    mockStorageEnvGet();

    const wrapper = mount(Options, {
      global: {
        plugins: [UniqueId, VuelidatePlugin]
      }
    });
    await waitFor();

    const projects = wrapper.findComponent(EditorFormConfigProjects);

    const projectsContent = projects.html();
    expect(projects.exists()).toBe(true);
    expect(projectsContent).toContain("Project name test");
  });
});

/*function mockStorageEnvGetEmpty() {
    getConfig.mockReturnValue({ config: DEFAULT_CONFIG });
  }*/
/* it("should switch modes without errors", async () => {
    mockStorageEnvGet();
    const wrapper = mount(Options);
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
    const wrapper = mount(Options);
    await waitFor();

    const jsonConfig = wrapper.findComponent(EditorJsonConfig);
    const editor = jsonConfig.vm.editor;

    expect(editor.get()).toEqual(config);
  }); */
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
  });

  it("should save config in storage with default value when loaded with no config", async () => {
    mockStorageEnvGetEmpty();

    shallowMount(Options);
    await waitFor();

    expect(setConfig).toHaveBeenCalledWith(DEFAULT_CONFIG);
  });
});*/
