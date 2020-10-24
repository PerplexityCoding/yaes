import deepmerge from "deepmerge";
import { mount } from "@vue/test-utils";
import EditorFormConfigProjects from "@/components/options/EditorFormConfigProjects";
import EditorFormConfigProject from "@/components/options/EditorFormConfigProject";

describe("EditorFormConfigProjects.vue", () => {
  const config = {
    version: "1.1.0",
    projects: [
      {
        id: 0,
        name: "Project1",
        envs: [2, 1]
      },
      {
        id: 1,
        name: "Project2",
        envs: [3]
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

  function createDefaultWrapper() {
    const wrapper = mount(EditorFormConfigProjects, {
      props: {
        config: deepmerge({}, config)
      }
    });

    return wrapper;
  }

  function checkUpdateConfig(wrapper, newConfig) {
    const updatedConfig = wrapper.emitted()["update:config"][0][0];

    expect(updatedConfig).toEqual({
      ...config,
      ...newConfig
    });
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
        name: "DE"
      },
      {
        name: "FR"
      }
    ]);

    expectItem(projects[1], [
      {
        name: "ES"
      }
    ]);
  });

  it("send select-env event when clicking on an env", () => {
    const wrapper = createDefaultWrapper();

    const firstEnv = wrapper.find(".project-env");
    firstEnv.trigger("click");

    const env = wrapper.emitted()["select-env"][0][0];
    expect(env).toEqual(config.envs[1]);
  });

  it("update config event when clicking on add new env button", () => {
    const wrapper = createDefaultWrapper();

    const firstButton = wrapper.find("button.add-new-env");
    firstButton.trigger("click");

    checkUpdateConfig(wrapper, {
      projects: [
        {
          id: 0,
          name: "Project1",
          envs: [2, 1, 4]
        },
        {
          id: 1,
          name: "Project2",
          envs: [3]
        }
      ],
      envs: [
        ...config.envs,
        {
          id: 4,
          name: "New Env",
          url: "https://www.exemple.com"
        }
      ]
    });
  });

  it("update config event when clicking on add new env button", () => {
    const wrapper = createDefaultWrapper();

    const secondButton = wrapper.findAll("button.add-new-env")[1];
    secondButton.trigger("click");

    checkUpdateConfig(wrapper, {
      projects: [
        {
          id: 0,
          name: "Project1",
          envs: [2, 1]
        },
        {
          id: 1,
          name: "Project2",
          envs: [3, 4]
        }
      ],
      envs: [
        ...config.envs,
        {
          id: 4,
          name: "New Env",
          url: "https://www.exemple.com"
        }
      ]
    });
  });

  it("update config event when clicking on delete project button", () => {
    const wrapper = createDefaultWrapper();

    const firstButton = wrapper.find("button.delete-project");
    firstButton.trigger("click");

    checkUpdateConfig(wrapper, {
      projects: [
        {
          id: 1,
          name: "Project2",
          envs: [3]
        }
      ],
      envs: [
        {
          id: 3,
          name: "ES",
          url: "https://www.google.es/"
        }
      ]
    });
  });

  it("update config event when clicking on second delete project button", () => {
    const wrapper = createDefaultWrapper();

    const secondButton = wrapper.findAll("button.delete-project")[1];
    secondButton.trigger("click");

    checkUpdateConfig(wrapper, {
      projects: [
        {
          id: 0,
          name: "Project1",
          envs: [2, 1]
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
        }
      ]
    });
  });

  it("update config event when clicking add new project button", () => {
    const wrapper = createDefaultWrapper();

    const button = wrapper.find("button.new-project");
    button.trigger("click");

    checkUpdateConfig(wrapper, {
      projects: [
        ...config.projects,
        {
          id: 2,
          name: "New Project",
          envs: []
        }
      ]
    });
  });

  it("drag and drop env", () => {
    const wrapper = createDefaultWrapper();

    const button = wrapper.find(".env-sortable");
    button.trigger("sortupdate", {
      detail: {
        origin: {
          index: 0
        },
        destination: {
          index: 1
        }
      }
    });

    checkUpdateConfig(wrapper, {
      projects: [
        {
          id: 0,
          name: "Project1",
          envs: [1, 2]
        },
        {
          id: 1,
          name: "Project2",
          envs: [3]
        }
      ]
    });
  });

  it("drag and drop project", () => {
    const wrapper = createDefaultWrapper();

    const elem = wrapper.find(".project-sortable");
    elem.trigger("sortupdate", {
      detail: {
        origin: {
          index: 0
        },
        destination: {
          index: 1
        }
      }
    });

    checkUpdateConfig(wrapper, {
      projects: [
        {
          id: 1,
          name: "Project2",
          envs: [3]
        },
        {
          id: 0,
          name: "Project1",
          envs: [2, 1]
        }
      ]
    });
  });

  it("edit project name", async () => {
    const wrapper = createDefaultWrapper();

    const elem = wrapper.find(".edit-project-name");
    await elem.trigger("click");

    const input = wrapper.find(".project-name input");
    await input.setValue("ProjectX");
    await input.trigger("focusout");

    checkUpdateConfig(wrapper, {
      projects: [
        {
          id: 0,
          name: "ProjectX",
          envs: [2, 1]
        },
        {
          id: 1,
          name: "Project2",
          envs: [3]
        }
      ]
    });
  });
});
