const fs = require("fs");
const path = require("path");

const parse = require("json-schema-to-markdown");
const schema = require("@/schemas/1.1.1/config.schema.json");
const markdown = parse(schema);

fs.writeFileSync(
  path.resolve(__dirname, "../docs/schemas/README.md"),
  markdown
);
