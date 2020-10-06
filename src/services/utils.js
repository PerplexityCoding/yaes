export function waitFor(duration) {
  new Promise(success => {
    setTimeout(() => {
      success();
    }, duration);
  });
}
