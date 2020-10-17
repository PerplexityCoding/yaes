import migrateV143 from "./migrate/v1.4.3";

export function migrate(config) {
  return [migrateV143].reduce(
    (previousValue, currentValue) => currentValue(config) || previousValue,
    false
  );
}
