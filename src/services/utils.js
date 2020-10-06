export function waitFor(duration = 0) {
  return new Promise(success => {
    setTimeout(() => {
      success();
    }, duration);
  });
}
