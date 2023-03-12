const ribbonCss = `
  .corner-ribbon {
    width: 225px;
    color: #fff;
    position: fixed;
    text-align: center;
    top: 45px;
    line-height: 40px;
    z-index: 99999;
    font-size: 18px;
    box-shadow: 0px 1px 4px #a9a9a9;
    cursor: alias;
  }

  .corner-ribbon.left {
    left: -53px;
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .corner-ribbon.right {
    right: -53px;
    left: auto;
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .square-ribbon {
    color: #fff;
    position: fixed;
    text-align: center;
    top: 2px;
    z-index: 99999;
    font-size: 18px;
    box-shadow: 0px 2px 5px #2f2f2f;
    padding: 6px 12px;
    cursor: alias;
  }

  .square-ribbon.left {
    left: 2px;
  }

  .square-ribbon.right {
    right: 2px;
    left: auto;
  }
`;

const ribbonH = ({ name, color, backgroundColor, position, type }) => `
  <div
    class="${type} ${position}"
    style="background-color: ${backgroundColor}; color: ${color};"
  >
    ${name}
  </div>
`;

function renderRibbon(config, env) {
  if (!document.getElementById("yaes-ribbon")) {
    injectRibbonStyle(ribbonCss);
    renderRibbonHtml(config, env);
  }
}

function renderRibbonHtml(config, env) {
  const elem = document.createElement("div");
  elem.setAttribute("id", "yaes-ribbon");

  const ribbonOptions = env.ribbonOptions;
  const backgroundColor = ribbonOptions.backgroundColor;
  const position = ribbonOptions.position;
  const type = ribbonOptions.type;
  const color = ribbonOptions.color;

  elem.innerHTML = ribbonH({
    name: env.name || env.shortName,
    position,
    backgroundColor,
    type,
    color,
  });
  elem.addEventListener("click", () => {
    elem.remove();
  });

  document.body.prepend(elem);
}

function injectRibbonStyle(css) {
  const style = document.createElement("style");
  document.head.appendChild(style);
  style.appendChild(document.createTextNode(css));
}

export default renderRibbon;
