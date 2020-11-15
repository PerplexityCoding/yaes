import { uuidv4 } from "@/services/utils";

export function getNextProjectId() {
  return uuidv4();
}

export function getNextEnvId() {
  return uuidv4();
}
