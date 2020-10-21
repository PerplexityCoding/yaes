import { mount } from "@vue/test-utils";
import ProjectList from "@/components/ProjectList.vue";
import { waitFor } from "../../../src/services/utils";

describe("ProjectList.vue", () => {
  const envs = [
    {
      id: 0,
      name: "France",
      shortName: "FR",
      url: "https://www.google.fr/",
      displayDomain: true
    },
    {
      id: 1,
      name: "DE",
      url: "https://www.google.de/",
      displayDomain: false
    },
    {
      id: 2,
      shortName: "ES",
      url: "https://www.google.es/"
    },
    {
      id: 3,
      shortName: "ES",
      url: "https://www.yah.es/"
    }
  ];

  const projects = [
    {
      id: 0,
      name: "Google",
      envs: [0, 1, 2]
    },
    {
      id: 1,
      name: "Yah",
      envs: [3]
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
