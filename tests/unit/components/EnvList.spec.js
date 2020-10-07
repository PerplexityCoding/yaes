import { shallowMount } from "@vue/test-utils";
import EnvList from "@/components/EnvList.vue";

describe("EnvList.vue", () => {
  function createDefaultWrapper() {
    const envs = [
      {
        id: 1,
        name: "FR",
        url: "https://www.google.fr/"
      },
      {
        id: 2,
        name: "DE",
        url: "https://www.google.de/"
      },
      {
        id: 3,
        name: "ES",
        url: "https://www.google.es/"
      }
    ];
    const currentEnv = {
      id: 2,
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
    expect(buttons[0].text()).toContain("FR");
    expect(buttons[1].text()).toContain("DE");
    expect(buttons[1].classes()).toContain("selected");
    expect(buttons[2].text()).toContain("ES");
  });

  it("emit event when clicking", async () => {
    const wrapper = createDefaultWrapper();

    const buttons = wrapper.findAll("button");
    await buttons[0].trigger("click");
    expect(wrapper.emitted()["switch-env"]).toBeTruthy();

    const { env, middle } = wrapper.emitted()["switch-env"][0][0];
    expect(env).toEqual({
      id: 1,
      name: "FR",
      url: "https://www.google.fr/"
    });
    expect(middle).toBeFalsy();
  });

  it("emit event when clicking with middle click", async () => {
    const wrapper = createDefaultWrapper();

    const buttons = wrapper.findAll("button");
    await buttons[0].trigger("click.middle");
    expect(wrapper.emitted()["switch-env"]).toBeTruthy();

    const { env, middle } = wrapper.emitted()["switch-env"][0][0];
    expect(env).toEqual({
      id: 1,
      name: "FR",
      url: "https://www.google.fr/"
    });
    expect(middle).toBeTruthy();
  });
});
