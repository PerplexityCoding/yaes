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
        this.updateComputed(
          subKey ? { [key]: { [subKey]: value } } : { [key]: value }
        );
      }
    };
  };
}
