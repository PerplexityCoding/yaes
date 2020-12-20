import * as Sentry from "@sentry/browser";
import { getComponentName } from "@/services/sentry/utils";
import { initSentry } from "./init/browser";

function logVueError({ err, vm, info }) {
  Sentry.captureException(err, {
    extra: {
      componentName: getComponentName(vm),
      lifecycleHook: info,
      propsData: vm.$options.propsData,
    },
  });
}

export { logVueError, initSentry, Sentry };
