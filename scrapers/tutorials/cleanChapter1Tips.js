const tips = require("../files/chapter1/tips2.json");
const fs = require("fs");
let newTips = [];
tips.forEach((tip) => {
  newTips.push({
    ...tip,
    description: JSON.stringify(tip.description),
    properties: JSON.stringify(tip.properties),
  });
});

fs.writeFileSync("../files/chapter1/cleanTips2.json", JSON.stringify(newTips, null, 4));
