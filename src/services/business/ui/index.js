import sortable from "html5sortable/dist/html5sortable.cjs";

export function getComputedFactory(objectKey) {
  return (key, subKey, defaultValue) => {
    return {
      get() {
        const firstOption = this[objectKey][key];
        const option =
          subKey && firstOption != null ? firstOption[subKey] : firstOption;
        return option != null ? option : defaultValue;
      },
      set(value) {
        value = value === "" ? undefined : value;
        this.updateComputed(
          subKey ? { [key]: { [subKey]: value } } : { [key]: value }
        );
      }
    };
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
