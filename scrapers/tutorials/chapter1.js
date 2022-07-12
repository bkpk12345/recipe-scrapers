const { range, startCase, flatMap, map, filter } = require("lodash");
const path = require("path");
const fs = require("fs");
let cheerio = require("cheerio");
let filePath = path.join(`${__dirname}/../files/ebook3/index.html`);
console.log({ filePath });
let file = fs.readFileSync(filePath);
let $ = cheerio.load(file);

let ranges = [
  {
    start: 13,
    end: 14,
    id: 1,
  },
  {
    start: 15,
    end: 16,
    id: 2,
  },
  {
    // body > div:nth-child(16)
    start: 16,
    end: 17,
    id: 3,
  },
];

const scrape1 = async (start, end) => {
  let tiprange = range(start, end);

  var scrape = async (file) => {
    const $ = cheerio.load(file);
    let tips = [];
    $("div > h2").each((index, ele) => {
      let chapterName = startCase("Cooking Basics");
      let tipTitle = $(ele).text().trim();
      let description = $(ele).next(".fmquote").text().trim();
      let description2 = $(ele).next(".topicbodynoindent").text().trim();
      let desc = [description, description2];

      desc = filter(desc, Boolean);

      let properties = [];
      $(ele)
        .nextAll("p.topicbodynoindent")

        .each((ind, ele) => {
          let title = $(ele).children().first().text().trim();
          let description = $(ele).text().replace(title, "").trim();
          if (title == "") {
            title = $(ele).next("p.topiccaptionhead").text().trim();
            description = $(ele).next("p.topiccaptionhead").next(".topicbodynoindent").text().trim();
          }
          if (title != "" || description != "") {
            properties.push({
              title,
              description: [description],
            });
          }
        });

      tips.push({
        //   chapterName,
        tipTitle,
        description: desc,
        properties,
      });
    });
    return tips;
  };

  const promisedFiles = tiprange.map(async (r) => {
    let selector = `body > div:nth-child(${r})`;
    let file = $(selector).html();
    let tips = await scrape(file);
    return tips;
  });
  return await Promise.all(promisedFiles);
};

const scrape2 = async (start, end) => {
  let selector = `body > div:nth-child(${start}) > div > h3`;
  let tips = [];
  let tipTitle = [];
  $(selector).each((index, ele) => {
    let tipTitle = $(ele).text().trim();
    let tipdesc = $(ele).next().text().trim();
    let properties = [];
    $(ele)
      // .nextUntil(".idgenobjectlayout")
      .nextAll("p.topiccaptionhead")

      .each((ind, ele) => {
        let title = $(ele).text().trim();
        let description = $(ele).next().text().trim();
        properties.push({
          title,
          description: [description],
        });
      });

    tips.push({ tipTitle: tipTitle, description: [tipdesc], properties });
  });

  return tips;
};

const scrape3 = async (start, end) => {
  let selector = `body > div:nth-child(${start}) > div > p.topicsubhead`;
  let tips = [];
  $(selector).each((index, ele) => {
    let title = $(ele).text().trim();
    let description = $(ele).next().text().trim();
    tips.push({
      tipTitle: title,
      description: [description],
    });
  });

  return tips;
};

let allPromisedTips = map(ranges, async (r) => {
  let start = r.start;
  let end = r.end;
  let id = r.id;
  let tips = [];
  if (id == 1) {
    let scrapedTips = await scrape1(start, end);
    tips = flatMap(scrapedTips);
  }

  if (id == 2) {
    let scrapedTips = await scrape2(start, end);
    tips = [...tips, scrapedTips];
    tips = flatMap(scrapedTips);
  }

  if (id == 3) {
    let scrapedTips = await scrape3(start, end);
    tips = [...tips, scrapedTips];
    tips = flatMap(scrapedTips);
  }

  return tips;
});

Promise.all(allPromisedTips).then((res) => {
  res = flatMap(res);
  res = filter(res, Boolean);
  fs.writeFileSync("../files/chapter1/tips.json", JSON.stringify(res, null, 4));
});
