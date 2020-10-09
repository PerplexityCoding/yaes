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
`;

const ribbonH = ({ name, color, backgroundColor, position }) => `
  <div
    class="corner-ribbon ${position}"
    style="background-color: ${backgroundColor}; color: ${color};"
  >
    ${name}
  </div>
`;

function renderRibbon(env) {
  injectRibbonStyle(ribbonCss);
  renderRibbonHtml(env);
}

function renderRibbonHtml(env) {
  const elem = document.createElement("div");
  elem.setAttribute("id", "ribbon");

  const backgroundColor = env?.ribbon?.color || "#2f2f2f";

  elem.innerHTML = ribbonH({
    name: env.name,
    position: env?.ribbon?.position || "right",
    backgroundColor,
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
