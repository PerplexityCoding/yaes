import sortable from "html5sortable/dist/html5sortable.cjs";
import { computed } from "vue";

export function getComputedFactory(objectKey) {
  return (key, subKey) => {
    return {
      get() {
        const firstOption = this[objectKey][key];
        const option = subKey && firstOption != null ? firstOption[subKey] : firstOption;
        return option != null ? option : "";
      },
      set(value) {
        value = value === "" ? undefined : value;
        this.updateComputed(subKey ? { [key]: { [subKey]: value } } : { [key]: value });
      },
    };
  };
}

export function createComputedFactory(update) {
  return (getFn, setFn) => {
    return computed({
      get: () => getFn(),
      set: (val) => {
        val = val === "" ? undefined : val;
        update(setFn(val));
      },
    });
  };
}

export function updateSortableEnvs(options) {
  setTimeout(() => {
    sortable(".env-sortable", options);
  }, 0);
}

export function updateSortableProjects(options) {
  setTimeout(() => {
    sortable(".project-sortable", options);
  }, 0);
}
