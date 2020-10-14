import { getNextId } from "@/services/utils";

function arrayToIds(arr) {
  return arr.reduce((prevValue, currentValue) => {
    prevValue[currentValue.id] = true;
    return prevValue;
  }, {});
}

export function getNextProjectId(projects) {
  const projectsId = arrayToIds(projects);
  return getNextId(projectsId);
}

export function getNextEnvId(envs) {
  const projectsId = arrayToIds(envs);
  return getNextId(projectsId);
}
