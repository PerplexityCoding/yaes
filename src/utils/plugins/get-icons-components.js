export default function getIconsComponents() {
  return require.context("../../components/icons", false, /\w+\.vue$/);
}
