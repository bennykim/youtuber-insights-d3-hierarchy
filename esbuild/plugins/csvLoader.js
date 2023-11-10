const fs = require("fs");
const papa = require("papaparse");

const csvLoader = {
  name: "csv-loader",
  setup(build) {
    build.onLoad({ filter: /\.csv$/ }, async (args) => {
      const csv = await fs.promises.readFile(args.path, "utf8");
      const parsed = papa.parse(csv, { header: true });
      return {
        contents: `${JSON.stringify(parsed.data)}`,
        loader: "json",
      };
    });
  },
};

module.exports = csvLoader;
