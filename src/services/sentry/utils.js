const ANONYMOUS_COMPONENT_NAME = "anonymous component";
const COMPONENT_NAME_REGEXP = /(?:^|[-_/])(\w)/g;
const ROOT_COMPONENT_NAME = "root";

const splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^/]+?|)(\.[^./]*|))(?:[/]*)$/;
/** JSDoc */
function splitPath(filename) {
  const parts = splitPathRe.exec(filename);
  return parts ? parts.slice(1) : [];
}

function basename(path, ext) {
  let f = splitPath(path)[2];
  if (ext && f.substr(ext.length * -1) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
}

export function getComponentName(vm) {
  // Such level of granularity is most likely not necessary, but better safe than sorry. — Kamil
  if (!vm) {
    return ANONYMOUS_COMPONENT_NAME;
  }

  if (vm.$root === vm) {
    return ROOT_COMPONENT_NAME;
  }

  if (!vm.$options) {
    return ANONYMOUS_COMPONENT_NAME;
  }

  if (vm.$options.name) {
    return vm.$options.name;
  }

  if (vm.$options._componentTag) {
    return vm.$options._componentTag;
  }

  // injected by vue-loader
  if (vm.$options.__file) {
    const unifiedFile = vm.$options.__file
      .replace(/^[a-zA-Z]:/, "")
      .replace(/\\/g, "/");
    const filename = basename(unifiedFile, ".vue");
    return (
      this._componentsCache[filename] ||
      (this._componentsCache[filename] = filename.replace(
        COMPONENT_NAME_REGEXP,
        (_, c) => (c ? c.toUpperCase() : "")
      ))
    );
  }

  return ANONYMOUS_COMPONENT_NAME;
}
