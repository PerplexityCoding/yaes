import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import { getComponentName } from "@/services/sentry/utils";

function logVueError({ err, vm, info }) {
  Sentry.captureException(err, {
    extra: {
      componentName: getComponentName(vm),
      lifecycleHook: info,
      propsData: vm.$options.propsData,
    },
  });
}

function initSentry() {
  Sentry.init({
    dsn:
      "https://33de24a53cff42ae88eb254afcb71175@o475103.ingest.sentry.io/5512649",
    integrations: [new Integrations.BrowserTracing()],
    release: process.env.SENTRY_RELEASE,
    environment: process.env.NODE_ENV,

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
    ignoreErrors: [
      "TypeError: Failed to fetch",
      "TypeError: NetworkError when attempting to fetch resource.",
    ],
  });
}

export { logVueError, initSentry, Sentry };
