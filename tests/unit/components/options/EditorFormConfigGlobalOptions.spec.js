import deepmerge from "deepmerge";
import { mount } from "@vue/test-utils";
import EditorFormConfigGlobalOptions from "@/components/options/EditorFormConfigGlobalOptions";
import { waitFor } from "@/services/utils";
import UniqueId from "@/utils/plugins/unique-id";
import { VuelidatePlugin } from "@vuelidate/core";

describe("EditorFormConfigGlobalOptions.vue", () => {
  const options = {
    displayBadge: false,
    displayRibbon: false
  };

  function createDefaultWrapper() {
    const wrapper = mount(EditorFormConfigGlobalOptions, {
      props: {
        options: deepmerge({}, options)
      },
      global: {
        plugins: [UniqueId, VuelidatePlugin]
      }
    });

    return wrapper;
  }

  function updateOptionsWith(wrapper, expected) {
    const updatedOptions = wrapper.emitted()["update:options"][0][0];
    expect(updatedOptions).toMatchObject(expected);
  }

  it("renders All options", async () => {
    const wrapper = createDefaultWrapper();

    const labels = wrapper.findAll(".label-set");
    await waitFor();
    expect(labels).toHaveLength(12);

    const hasAttribute = (label, attribute) =>
      expect(label.attributes()[attribute]).toBe("");
    const isCheckbox = label =>
      expect(label.find("input[type=checkbox]").exists()).toBe(true);
    const isColorSelector = label =>
      expect(label.html()).toContain("pcr-button");
    const isSelect = label => expect(label.find("select").exists()).toBe(true);

    let i = 0;
    let label = labels[i++];
    hasAttribute(label, "display-badge");
    isCheckbox(label);

    label = labels[i++];
    hasAttribute(label, "badge-bg-color");
    isColorSelector(label);

    label = labels[i++];
    hasAttribute(label, "display-ribbon");
    isCheckbox(label);

    label = labels[i++];
    hasAttribute(label, "ribbon-bg-color");
    isColorSelector(label);

    label = labels[i++];
    hasAttribute(label, "ribbon-text-color");
    isColorSelector(label);

    label = labels[i++];
    hasAttribute(label, "ribbon-position");
    isSelect(label);

    label = labels[i++];
    hasAttribute(label, "ribbon-type");
    isSelect(label);

    label = labels[i++];
    hasAttribute(label, "display-domain");
    isCheckbox(label);

    label = labels[i++];
    hasAttribute(label, "display-header");
    isCheckbox(label);

    label = labels[i++];
    hasAttribute(label, "display-footer");
    isCheckbox(label);

    label = labels[i++];
    hasAttribute(label, "display-projects-links");
    isCheckbox(label);

    label = labels[i++];
    hasAttribute(label, "color-scheme");
    isSelect(label);
  });

  it.each`
    name                        | optionName
    ${"display-badge"}          | ${"displayBadge"}
    ${"display-ribbon"}         | ${"displayRibbon"}
    ${"display-domain"}         | ${"displayDomain"}
    ${"display-header"}         | ${"displayHeader"}
    ${"display-footer"}         | ${"displayFooter"}
    ${"display-projects-links"} | ${"displaySeeProjectsLink"}
  `(
    "Changing select options $name $optionName",
    async ({ name, optionName }) => {
      const wrapper = createDefaultWrapper();

      const input = wrapper.find(`.label-set[${name}] input`);
      expect(input.element.value).toBe("on");
      const newValue = !input.element.checked;
      await input.setValue(newValue);

      updateOptionsWith(wrapper, { [optionName]: newValue });
    }
  );
});
