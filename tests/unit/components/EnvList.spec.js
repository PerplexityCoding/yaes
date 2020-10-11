import { shallowMount } from "@vue/test-utils";
import EnvList from "@/components/EnvList.vue";

describe("EnvList.vue", () => {
  const envs = [
    {
      name: "France",
      shortName: "FR",
      url: "https://www.google.fr/",
      displayDomain: true
    },
    {
      name: "DE",
      url: "https://www.google.de/",
      displayDomain: false
    },
    {
      shortName: "ES",
      url: "https://www.google.es/"
    }
  ];

  function createDefaultWrapper() {
    const currentEnv = {
      name: "DE",
      url: "https://www.google.de/"
    };

    const wrapper = shallowMount(EnvList, {
      props: {
        envs,
        currentEnv
      }
    });

    return wrapper;
  }

  it("renders list of envs", () => {
    const wrapper = createDefaultWrapper();
    const buttons = wrapper.findAll("button");

    expect(buttons).toHaveLength(3);
    expect(buttons[0].text()).toContain("FR - France");
    expect(buttons[0].text()).toContain("www.google.fr");

    expect(buttons[1].text()).toContain("DE");
    expect(buttons[1].classes()).toContain("selected");
    expect(buttons[1].text()).not.toContain("www.google.de");

    expect(buttons[2].text()).toContain("ES");
    expect(buttons[2].text()).not.toContain("www.google.es");
  });

  it("emit event when clicking", async () => {
    const wrapper = createDefaultWrapper();

    const buttons = wrapper.findAll("button");
    await buttons[0].trigger("click");
    expect(wrapper.emitted()["switch-env"]).toBeTruthy();

    const { env, middle } = wrapper.emitted()["switch-env"][0][0];
    expect(env).toEqual(envs[0]);
    expect(middle).toBeFalsy();
  });

  it("emit event when clicking with middle click", async () => {
    const wrapper = createDefaultWrapper();

    const buttons = wrapper.findAll("button");
    await buttons[0].trigger("click.middle");
    expect(wrapper.emitted()["switch-env"]).toBeTruthy();

    const { env, middle } = wrapper.emitted()["switch-env"][0][0];
    expect(env).toEqual(envs[0]);
    expect(middle).toBeTruthy();
  });
});
