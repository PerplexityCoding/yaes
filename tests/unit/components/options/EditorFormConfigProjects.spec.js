import deepmerge from "deepmerge";
import { mount } from "@vue/test-utils";
import EditorFormConfigProjects from "@/components/options/EditorFormConfigProjects";
import EditorFormConfigProject from "@/components/options/EditorFormConfigProject";
import UniqueId from "@/utils/plugins/unique-id";

describe.skip("EditorFormConfigProjects.vue", () => {
  const config = {
    version: "1.1.0",
    projects: [
      {
        id: 0,
        name: "Project1",
        envs: [2, 1],
      },
      {
        id: 1,
        name: "Project2",
        envs: [3],
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
    options: {},
  };

  function createDefaultWrapper() {
    const wrapper = mount(EditorFormConfigProjects, {
      props: {
        config: deepmerge({}, config),
        selectedEnvId: 1,
      },
      global: {
        plugins: [UniqueId],
      },
    });

    return wrapper;
  }

  it("renders projects name", () => {
    const wrapper = createDefaultWrapper();

    const projects = wrapper.findAllComponents(EditorFormConfigProject);
    const expectName = (project, name) =>
      expect(project.html()).toContain(name);

    expectName(projects[0], "Project1");
    expectName(projects[1], "Project2");
  });

  it("renders projects items name", () => {
    const wrapper = createDefaultWrapper();

    const projects = wrapper.findAllComponents(EditorFormConfigProject);
    const expectItem = (project, arr) => {
      const items = project.element.querySelectorAll(".project-env");
      arr.forEach(({ name }, i) => expect(items[i].innerHTML).toContain(name));
    };

    expectItem(projects[0], [
      {
        name: "DE",
      },
      {
        name: "FR",
      },
    ]);

    expectItem(projects[1], [
      {
        name: "ES",
      },
    ]);
  });

  it("send select-env event when clicking on an env", () => {
    const wrapper = createDefaultWrapper();

    const firstEnv = wrapper.find(".project-env");
    firstEnv.trigger("click");

    const env = wrapper.emitted()["select-env"][0][0];
    expect(env).toEqual({
      envId: config.envs[1].id,
      projectId: 0,
    });
  });
});
