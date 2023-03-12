import * as Sentry from "@sentry/browser";

function initSentry() {
  if (typeof import.meta.env.VITE_PLUGIN_SENTRY_CONFIG !== "undefined") {
    const { release } = import.meta.env.VITE_PLUGIN_SENTRY_CONFIG;

    Sentry.init({
      dsn: "https://33de24a53cff42ae88eb254afcb71175@o475103.ingest.sentry.io/5512649",
      integrations: [],
      release,
      environment: import.meta.env.MODE,

      // We recommend adjusting this value in production, or using tracesSampler
      // for finer control
      tracesSampleRate: 1.0,
      ignoreErrors: [
        "TypeError: Failed to fetch",
        "TypeError: NetworkError when attempting to fetch resource.",
      ],
    });
  }
}

export { initSentry };
