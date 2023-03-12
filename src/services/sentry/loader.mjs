import { storageGet } from "@/services/chrome/storage";

const queue = [];
let app = null;

// Store reference to the old `onerror` handler and override it with our own function
// that will just push exceptions to the queue and call through old handler if we found one

let isWindowContext = typeof window !== "undefined";
let globalThis = isWindowContext ? window : self;

const _oldOnerror = globalThis["onerror"];
globalThis["onerror"] = function () {
  // Use keys as "data type" to save some characters"
  queue.push({
    e: [].slice.call(arguments),
  });

  if (_oldOnerror) _oldOnerror.apply(globalThis, arguments);
};

// Do the same store/queue/call operations for `onunhandledrejection` event
const _oldOnunhandledrejection = globalThis["onunhandledrejection"];
globalThis["onunhandledrejection"] = function (exception) {
  queue.push({
    p: exception.reason,
  });
  if (_oldOnunhandledrejection) _oldOnunhandledrejection.apply(globalThis, arguments);
};

export async function loadSentry() {
  const isAllowed = await isTrackingAllowed();
  if (isAllowed) {
    if (isWindowContext && document.readyState === "complete") {
      asyncLoadSentry();
    } else {
      globalThis.addEventListener("load", () => {
        asyncLoadSentry();
      });
    }
  }
}

function asyncLoadSentry() {
  setTimeout(async () => {
    try {
      const { logVueError, Sentry, initSentry } = await import(
        /* webpackChunkName: "sentry" */ "./sentry"
      );
      initSentry();

      Sentry.onLoad(() => {
        drainQueue(Sentry, logVueError);
        if (app) {
          addVueGlobalErrorHandler(logVueError);
        }
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }, 100);
}

async function isTrackingAllowed() {
  const { options } = (await storageGet("options")) || {};
  if (options) {
    const { allowBugTrackerReporting } = JSON.parse(options);
    return allowBugTrackerReporting !== false;
  }
  return true;
}

function drainQueue(Sentry, logVueError) {
  try {
    // And now capture all previously caught exceptions
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].e) {
        Sentry.captureException(queue[i].e);
      } else if (queue[i].v) {
        logVueError(queue[i].v);
      } else if (queue[i].p) {
        Sentry.captureException(queue[i].p);
      }
    }

    queue.splice(0, queue.length);
  } catch (o_O) {
    // eslint-disable-next-line no-console
    console.error(o_O);
  }
}

export function queueVueGlobalErrorHandler(_app) {
  app = _app;
  app.config.errorHandler = function (err, vm, info) {
    queue.push({
      v: {
        err,
        vm,
        info,
      },
    });
    // eslint-disable-next-line no-console
    console.error(err);
  };
}

function addVueGlobalErrorHandler(logVueError) {
  app.config.errorHandler = function (err, vm, info) {
    setTimeout(() => {
      logVueError({
        err,
        vm,
        info,
      });
    });
    // eslint-disable-next-line no-console
    console.error(err);
  };
}
