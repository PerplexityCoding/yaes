import migrateV110 from "./v1.1.0";

export default function migrate(config, version) {
  switch (version) {
    case "1.1.0":
      return migrateV110(config);
  }
}
