import { mount } from "@vue/test-utils";
import ProjectList from "@/components/ProjectList.vue";
import { waitFor } from "../../../src/services/utils";

describe("EnvList.vue", () => {
  const envs = [
    {
      name: "France",
      shortName: "FR",
      url: "https://www.google.fr/",
      displayDomain: true,
      project: "Goog"
    },
    {
      name: "DE",
      url: "https://www.google.de/",
      displayDomain: false,
      project: "Goog"
    },
    {
      shortName: "ES",
      url: "https://www.google.es/",
      project: "Goog"
    },
    {
      shortName: "ES",
      url: "https://www.yah.es/",
      project: "Yah"
    }
  ];

  const projects = [
    {
      id: "Goog"
    },
    {
      id: "Yah",
      name: "Yah"
    }
  ];

  function createDefaultWrapper() {
    const wrapper = mount(ProjectList, {
      props: {
        envs,
        projects
      }
    });

    return wrapper;
  }

  it("renders list of projects", () => {
    const wrapper = createDefaultWrapper();
    const buttons = wrapper.findAll(".project-btn-wrapper > button");

    expect(buttons).toHaveLength(2);
    expect(buttons[0].text()).toContain("Goog");
    expect(buttons[1].text()).toContain("Yah");
  });

  it("render envs click on project", async () => {
    const wrapper = createDefaultWrapper();
    const buttonsWrapper = wrapper.findAll(".project-btn-wrapper");

    const buttonsWrapper1 = buttonsWrapper[0];
    await buttonsWrapper1.find("button").trigger("click");
    await waitFor();

    expect(buttonsWrapper1.html()).toContain("www.google.fr");
    expect(buttonsWrapper1.html()).not.toContain("www.yah.es");
  });
});
