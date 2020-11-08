window.chrome.storage.sync.get("options", data => {
  let options = data && data.options ? JSON.parse(data.options) : {};
  let { colorScheme } = options;

  if (colorScheme === "light" || colorScheme === "dark") {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      body {
        background-color: ${
          colorScheme === "dark" ? "#0e0e0e" : "#fdfbf8"
        } !important;
      }
    `;
    document.head.appendChild(styleElement);
  }
});
