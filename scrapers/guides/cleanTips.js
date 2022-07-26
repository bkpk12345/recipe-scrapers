const forEach = require("lodash.foreach");
const tips = require("../files/tips.json");
const fs = require("fs");
let newTips = [];
forEach(tips, (tip) => {
  let tip_ingredient = tip.ingredient;
  let tip_desc = tip.desc;
  let tip_chapter = tip.chapter;
  let tip_howTobuy = tip.howTobuy;
  let tip_howTobuyDesc = JSON.stringify(tip.howTobuyDesc);
  let tip_howToStore = tip.howToStore;
  let tip_howToStoreDesc = JSON.stringify(tip.howToStoreDesc);
  let tip_howToUse = tip.howToUse;
  let tip_howToUseDesc = JSON.stringify(tip.howToUseDesc);

  newTips.push({
    ingredient: tip_ingredient,
    desc: tip_desc,
    chapter: tip_chapter,
    howTobuy: tip_howTobuy,
    howTobuyDesc: tip_howTobuyDesc,
    howToStore: tip_howToStore,
    howToStoreDesc: tip_howToStoreDesc,
    howToUse: tip_howToUse,
    howToUseDesc: tip_howToUseDesc,
  });
});

fs.writeFileSync("../files/cleanedTips.json", JSON.stringify(newTips, null, 4));
