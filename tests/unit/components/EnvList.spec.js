import { mount } from "@vue/test-utils";
import EnvList from "@/components/popup/EnvList.vue";
import GlobalIcons from "@/utils/plugins/global-icons";

describe("EnvList.vue", () => {
  const envs = [
    {
      id: 0,
      name: "France",
      shortName: "FR",
      url: "https://www.google.fr/",
      displayDomain: true,
    },
    {
      id: 1,
      name: "DE",
      url: "https://www.google.de/",
      displayDomain: false,
    },
    {
      id: 2,
      name: "Spain",
      shortName: "ES",
      url: "https://www.google.es/",
    },
  ];

  function createDefaultWrapper() {
    const currentEnv = {
      id: 1,
      name: "DE",
      url: "https://www.google.de/",
    };

    const wrapper = mount(EnvList, {
      props: {
        envs,
        currentEnv,
      },
      global: {
        plugins: [GlobalIcons],
      },
    });

    return wrapper;
  }

  it("renders list of envs", () => {
    const wrapper = createDefaultWrapper();
    const buttons = wrapper.findAll("button");

    expect(buttons).toHaveLength(3);
    expect(buttons[0].text()).toContain("France");
    expect(buttons[0].text()).toContain("www.google.fr");

    expect(buttons[1].text()).toContain("DE");
    expect(buttons[1].classes()).toContain("selected");
    expect(buttons[1].text()).not.toContain("www.google.de");

    expect(buttons[2].text()).toContain("Spain");
    expect(buttons[2].text()).not.toContain("www.google.es");
  });

  it("emit event when clicking", async () => {
    const wrapper = createDefaultWrapper();

    const buttons = wrapper.findAll("button");
    await buttons[0].trigger("click");
    expect(wrapper.emitted()["switch-env"]).toBeTruthy();

    const { env, newTab } = wrapper.emitted()["switch-env"][0][0];
    expect(env).toEqual(envs[0]);
    expect(newTab).toBeFalsy();
  });

  it("emit event when clicking with middle click", async () => {
    const wrapper = createDefaultWrapper();

    const buttons = wrapper.findAll("button");
    await buttons[0].trigger("click.middle");
    expect(wrapper.emitted()["switch-env"]).toBeTruthy();

    const { env, newTab } = wrapper.emitted()["switch-env"][0][0];
    expect(env).toEqual(envs[0]);
    expect(newTab).toBeTruthy();
  });

  it("emit event when clicking with ctrl click", async () => {
    const wrapper = createDefaultWrapper();

    const buttons = wrapper.findAll("button");
    await buttons[0].trigger("click.ctrl");
    expect(wrapper.emitted()["switch-env"]).toBeTruthy();

    const { env, newTab } = wrapper.emitted()["switch-env"][0][0];
    expect(env).toEqual(envs[0]);
    expect(newTab).toBeTruthy();
  });
});
