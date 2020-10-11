import { getContrast } from "../services/utils";

const ribbonCss = `
  .corner-ribbon {
    width: 250px;
    color: #fff;
    position: fixed;
    text-align: center;
    top: 50px;
    line-height: 40px;
    z-index: 99999;
    font-size: 18px;
    box-shadow: 8px 2px 5px #2f2f2f;
  }

  .corner-ribbon.left {
    left: -75px;
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .corner-ribbon.right {
    right: -75px;
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
  injectRibbonStyle(ribbonCss);
  renderRibbonHtml(config, env);
}

function renderRibbonHtml(config, env) {
  const elem = document.createElement("div");
  elem.setAttribute("id", "ribbon");

  const backgroundColor = env?.ribbon?.color || "#2f2f2f";
  const position = env?.ribbon?.position || "right";
  const type = env?.ribbon?.type || "corner-ribbon";

  elem.innerHTML = ribbonH({
    name: env.name || env.shortName,
    position,
    backgroundColor,
    type,
    color: getContrast(backgroundColor)
  });
  document.body.prepend(elem);
}

function injectRibbonStyle(css) {
  const style = document.createElement("style");
  document.head.appendChild(style);
  style.appendChild(document.createTextNode(css));
}

export default renderRibbon;
