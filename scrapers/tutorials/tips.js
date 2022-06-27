const fs = require("fs");
const { v4 } = require("uuid");

let cheerio = require("cheerio");
const { range, flatMap, isEmpty } = require("lodash");
const { filter } = require("lodash");

const getRawHtml = async () => {
  let chapters = [
    {
      category: "How to Buy Eggs",
      name: "chapter 2",
      start: 229,
      end: 236,
      chapterName: "How to Cook Eggs",
    },
    {
      // /html/body/div[236]
      category: "Storing Tips",
      name: "chapter 2",
      start: 236,
      end: 238,
      chapterName: "How to Cook Eggs",
    },
    {
      category: "Cold vs. Room Temperature",
      name: "chapter 2",
      start: 237,
      end: 238,
      chapterName: "How to Cook Eggs",
    },
    {
      category: "Safety Tips",
      name: "chapter 2",
      start: 238,
      end: 240,
      chapterName: "How to Cook Eggs",
    },
    {
      category: "Safety Tips",
      name: "chapter 2",
      start: 238,
      end: 240,
      chapterName: "How to Cook Eggs",
    },
    {
      category: "Vegetables A to Z",
      name: "chapter 3",
      start: 264,
      end: 299,
      chapterName: "How to Cook Vegetables",
    },
    {
      category: "Essential Ingredients",
      name: "chapter 4",
      start: 330,
      end: 334,
      chapterName: "How to Cook Pasta",
    },
    {
      ///html/body/div[334]
      ///html/body/div[342]
      category: "Essential Equipment",
      name: "chapter 4",
      start: 334,
      end: 343,
      chapterName: "How to Cook Pasta",
    },
    {
      category: "Rice 101",
      name: "chapter 5",
      start: 398,
      end: 404,
      chapterName: "How to Cook Rice, Grains, and Beans",
    },
    {
      category: "Beans 101",
      name: "chapter 5",
      start: 404,
      end: 407,
      chapterName: "How to Cook Rice, Grains, and Beans",
    },
    {
      category: "Grains 101",
      name: "chapter 5",
      start: 407,
      end: 415,
      chapterName: "How to Cook Rice, Grains, and Beans",
    },

    {
      ///html/body/div[436]
      // /html/body/div[440]
      category: "How to Buy Meat",
      name: "chapter 6", //
      start: 436,
      end: 441,
      chapterName: "How to Cook Meat",
    },
    {
      category: "How to Buy Beef",
      name: "chapter 6", //
      start: 441,
      end: 445,
      chapterName: "How to Cook Meat",
    },
    {
      category: "Primal Cuts of Beef",
      name: "chapter 6", //
      start: 445,
      end: 451,
      chapterName: "How to Cook Meat",
    },
    {
      category: "Our Favorite Beef Steaks",
      name: "chapter 6", //
      start: 451,
      end: 461,
      chapterName: "How to Cook Meat",
    },
    {
      category: "Our Favorite Beef Roasts",
      name: "chapter 6", //
      start: 461,
      end: 469,
      chapterName: "How to Cook Meat",
    },
    {
      category: "Primal Cuts of Pork",
      name: "chapter 6", //
      start: 473,
      end: 479,
      chapterName: "How to Cook Meat",
    },
    {
      category: "Our Favorite Pork Cuts",
      name: "chapter 6", //
      start: 479,
      end: 492,
      chapterName: "How to Cook Meat",
    },
    {
      category: "Our Favorite Lamb Cuts",
      name: "chapter 6", //
      start: 492,
      end: 498,
      chapterName: "How to Cook Meat",
    },
    {
      category: "Preparing Meat Before Cooking",
      name: "chapter 6", //
      start: 498,
      end: 501,
      chapterName: "How to Cook Meat",
    },
    {
      category: "Three Principles of Meat Cookery",
      name: "chapter 6", //
      start: 501,
      end: 504,
      chapterName: "How to Cook Meat",
    },

    {
      category: "How to Buy Chicken", //
      name: "chapter 7",
      start: 546,
      end: 551,
      chapterName: "How to Cook Poultry",
    },
    {
      category: "How to Buy Turkey", //
      name: "chapter 7",
      start: 551,
      end: 554,
      chapterName: "How to Cook Poultry",
    },
    {
      category: "Four Principles of Poultry Cookery", //
      name: "chapter 7",
      start: 554,
      end: 558,
      chapterName: "How to Cook Poultry",
    },
    {
      category: "Storing and Safety", //
      name: "chapter 7",
      start: 558,
      end: 563,
      chapterName: "How to Cook Poultry",
    },
    //8
    {
      category: "How to Buy Salmon", //
      name: "chapter 8",
      start: 598,
      end: 606,
      chapterName: "How to Cook Seafood",
    },
    //9
    {
      category: "Outdoor Cooking", //
      name: "chapter 9",
      start: 628,
      end: 629,
      chapterName: "How to Grill",
    },
    {
      category: "Six Principles of Soup Making", //
      name: "chapter 10",
      start: 668,
      end: 674,
      chapterName: "How to Make Stocks and Soups",
    },
    {
      category: "Storing and Reheating Soup", //
      name: "chapter 10",
      start: 674,
      end: 676,
      chapterName: "How to Make Stocks and Soups",
    },

    {
      category: "Salad Greens A to Z", //
      name: "chapter 11",
      start: 713,
      end: 728,
      chapterName: "How to Make Salad",
    },
    {
      category: "Types of Quick Breads",
      name: "chapter 12",
      start: 763,
      end: 764,
      chapterName: "How to Make Quick Breads",
    },
    {
      category: "Essential Equipment",
      name: "chapter 12",
      start: 763,
      end: 764,
      chapterName: "How to Make Quick Breads",
    },
    {
      category: "Essential Ingredients",
      name: "chapter 12",
      start: 763,
      end: 764,
      chapterName: "How to Make Quick Breads",
    },
    {
      category: "Tips for Better Quick Breads",
      name: "chapter 12",
      start: 763,
      end: 764,
      chapterName: "How to Make Quick Breads",
    },
    {
      //no tips found
      category: "",
      name: "chapter 13",
      start: 0,
      end: 0,
      chapterName: "How to Make Yeast Breads and Pizzas",
    },

    {
      category: "",
      name: "chapter 14",
      start: 808,
      end: 830,
      chapterName: "How to Make Cookies",
    },

    {
      category: "",
      name: "chapter 15",
      start: 858,
      end: 876,
      chapterName: "How to Make Cakes",
    },

    {
      category: "", //
      name: "chapter 16",
      start: 906,
      end: 923,
      chapterName: "How to Make Fruit Desserts",
    },

    {
      category: "", //
      name: "chapter 17",
      start: 943,
      end: 956,
      chapterName: "How to Make Pies and Tarts",
    },

    {
      category: "", //
      name: "chapter 18",
      start: 977,
      end: 992,
      chapterName: "How to Make Custards, Puddings, and Frozen Desserts",
    },
  ];

  let file = fs.readFileSync("../../files/ebook3/index.html");
  let $ = cheerio.load(file);
  let chapterTips = [];
  chapters.map((chapter) => {
    let ranges = range(chapter.start, chapter.end);
    let category = chapter.category;
    let chapterName = chapter.chapterName;
    let chapterNo = chapter.name;
    ranges.map((r) => {
      let selector = `body > div:nth-child(${r})`;

      if (chapter.name == "chapter 2") {
        let tip = getChapter2Tips(selector, $, chapterName, category, chapterNo);
        chapterTips.push(tip);
      }

      if (chapter.name == "chapter 3") {
        let tip = getChapter3Tips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }

      if (chapter.name == "chapter 4") {
        let tip = getChapter4Tips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }

      if (chapter.name == "chapter 5") {
        let tip = getChapter5Tips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }

      if (chapter.name == "chapter 6") {
        let tip = getChapter6Tips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }

      if (chapter.name == "chapter 7") {
        let tip = getCommonChapterTips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }

      if (chapter.name == "chapter 8") {
        let tip = getCommonChapterTips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }

      if (chapter.name == "chapter 9") {
        let tip = getChapter9Tips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }

      if (chapter.name == "chapter 10") {
        let tip = getCommonChapterTips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }

      if (chapter.name == "chapter 11") {
        let tip = getChapter11Tips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }

      if (chapter.name == "chapter 12") {
        let tip = getChapter12Tips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }

      //13 tips not found

      if (chapter.name == "chapter 14") {
        let tip = getCommonChapterTips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }

      if (chapter.name == "chapter 15") {
        let tip = getCommonChapterTips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }

      if (chapter.name == "chapter 16") {
        let tip = getChapter16Tips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }

      if (chapter.name == "chapter 17") {
        let tip = getCommonChapterTips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }

      if (chapter.name == "chapter 18") {
        let tip = getCommonChapterTips(selector, $, chapterName, category, chapterNo);

        chapterTips.push(tip);
      }
    });
  });
  chapterTips = flatMap(chapterTips);
  fs.writeFileSync("./tips2.json", JSON.stringify(chapterTips, null, 4));
};

const getChapter2Tips = (selector, $ = cheerio.load(), chapterName, category, chapterNo) => {
  let titleSelector = `${selector} > div > p.topicsubhead`;
  let descriptionSelector1 = `${selector} > div > p.topicbodynoindent`;
  let descriptionSelector2 = `${selector} > div > p:nth-child(3)`;
  let descriptionSelector3 = `${selector} > div > p:nth-child(4)`;

  let title = $(titleSelector).text().trim();
  let desctiption1 = $(descriptionSelector1).text().trim();
  let desctiption2 = $(descriptionSelector2).text().trim();
  let desctiption3 = $(descriptionSelector3).text().trim();

  let finalDesc = [desctiption1, desctiption2, desctiption3];
  finalDesc = filter(finalDesc, Boolean);
  tip = {
    book: "the-Americas-Test-Kitchen",
    id: v4(),
    chapterNo,
    date: new Date().toDateString(),
    chapter: "chapter 2",
    title,
    desctiption: finalDesc,
    id: v4(),
    chapterNo,
    date: new Date().toDateString(),
    chapterName,
    category,
  };
  return tip;
};
const getChapter3Tips = (selector, $ = cheerio.load(), chapterName, category, chapterNo) => {
  let titleSelector = `${selector} > div > p.topicsubhead`;

  let ulsSelector1 = `${selector} > div > ul:nth-child(3)`;
  let ulsSelector2 = `${selector} > div > ul:nth-child(4)`;
  let ulsSelector3 = `${selector} > div > ul:nth-child(5)`;
  let ulsSelector4 = `${selector} > div > ul:nth-child(6)`;
  let ulsSelector5 = `${selector} > div > ul:nth-child(7)`;
  let title = $(titleSelector).text().trim();

  let uls1 = $(ulsSelector1).text().trim();
  let uls2 = $(ulsSelector2).text().trim();
  let uls3 = $(ulsSelector3).text().trim();
  let uls4 = $(ulsSelector4).text().trim();
  let uls5 = $(ulsSelector5).text().trim();
  let filanUls = [uls1, uls2, uls3, uls4, uls5];
  filanUls = filter(filanUls, Boolean);
  let finalDesc = [...filanUls];
  finalDesc = filter(finalDesc, Boolean);
  let tip = {
    book: "the-Americas-Test-Kitchen",
    id: v4(),
    chapterNo,
    date: new Date().toDateString(),
    chapter: "chapter 3",
    title,
    desctiption: finalDesc,
    chapterName,
    category,
  };
  return tip;
};

const getChapter4Tips = (selector, $ = cheerio.load(), chapterName, category, chapterNo) => {
  try {
    let titleSelector1 = `${selector} > div > p.topiccaptionhead`;
    let titleSelector2 = `${selector} > div > p.topicsubhead`;
    let tips = [];
    $(titleSelector1).each((i, e) => {
      tips.push({
        title: $(e).text().trim(),
        desctiption: [$(e).next("p.fmquote").text().trim()],
        chapter: "chapter 4",
        book: "the-Americas-Test-Kitchen",
        id: v4(),
        chapterNo,
        date: new Date().toDateString(),
        chapterName,
        category,
      });
    });

    $(titleSelector2).each((i, e) => {
      tips.push({
        title: $(e).text().trim(),
        desctiption: [$(e).next().next("p.fmquote").text().trim()],
        chapter: "chapter 4",
        book: "the-Americas-Test-Kitchen",
        id: v4(),
        chapterNo,
        date: new Date().toDateString(),
        chapterName,
        category,
      });
    });
    console.log(tips);
    return tips;
  } catch (error) {
    throw error;
  }
};

const getChapter5Tips = (selector, $ = cheerio.load(), chapterName, category, chapterNo) => {
  try {
    let titleSelector1 = `${selector} > div > p.topicsubhead`;

    let tips = [];
    $(titleSelector1).each((i, e) => {
      tips.push({
        title: $(e).text().trim(),
        desctiption: [$(e).next("p.topicbodynoindent").text().trim()],
        chapter: "chapter 4",
        book: "the-Americas-Test-Kitchen",
        id: v4(),
        chapterNo,
        date: new Date().toDateString(),
        chapterName,
        category,
      });
    });

    return tips;
  } catch (error) {
    throw error;
  }
};

const getChapter6Tips = (selector, $ = cheerio.load(), chapterName, category, chapterNo) => {
  try {
    let titleSelector1 = `${selector} > div > p.topicsubhead`;

    let tips = [];
    let finalDesc = [];
    let desc = $(titleSelector1).next("p.topicbodynoindent").text().trim();
    let desc1 = $(titleSelector1).next().next("p.topicbodynoindent").text().trim();
    let desc2 = [];
    $(titleSelector1)
      .nextAll("p.topicbody")
      .each((i, e) => {
        desc2.push($(e).text().trim());
      })
      .text()
      .trim();
    finalDesc.push(desc);
    finalDesc.push(desc1);
    finalDesc = [...finalDesc, ...desc2];
    finalDesc = filter(finalDesc, Boolean);
    $(titleSelector1).each((i, e) => {
      tips.push({
        title: $(e).text().trim(),
        desctiption: finalDesc,
        chapter: "chapter 6",
        book: "the-Americas-Test-Kitchen",
        id: v4(),
        chapterNo,
        date: new Date().toDateString(),
        chapterName,
        category,
      });
    });

    return tips;
  } catch (error) {
    throw error;
  }
};

const getChapter7Tips = (selector, $ = cheerio.load(), chapterName, category, chapterNo) => {
  try {
    let titleSelector1 = `${selector} > div > p.topicsubhead`;

    let tips = [];
    let finalDesc = [];
    let desc = $(titleSelector1).next("p.topicbodynoindent").text().trim();
    let desc1 = $(titleSelector1).next().next("p.topicbodynoindent").text().trim();
    let desc2 = [];
    $(titleSelector1)
      .nextAll("p.topicbody")
      .each((i, e) => {
        desc2.push($(e).text().trim());
      })
      .text()
      .trim();
    finalDesc.push(desc);
    finalDesc.push(desc1);
    finalDesc = [...finalDesc, ...desc2];
    finalDesc = filter(finalDesc, Boolean);
    $(titleSelector1).each((i, e) => {
      tips.push({
        title: $(e).text().trim(),
        desctiption: finalDesc,
        chapter: "chapter 6",
        book: "the-Americas-Test-Kitchen",
        id: v4(),
        chapterNo,
        date: new Date().toDateString(),
        chapterName,
        category,
      });
    });

    return tips;
  } catch (error) {
    throw error;
  }
};

const getChapter9Tips = (selector, $ = cheerio.load(), chapterName, category, chapterNo) => {
  try {
    let tips = [];
    let titeSelector = `${selector} > div > p`;
    let desc = [];
    $(titeSelector)
      // .nextUntil(".calibre1")
      .nextAll("p")
      .each((i, e) => {
        console.log({ i });
        desc.push($(e).text().trim());
      });
    desc.pop();
    tips.push({
      title: "",
      description: desc,
      chapter: "chapter 9",
      book: "the-Americas-Test-Kitchen",
      id: v4(),
      chapterNo,
      date: new Date().toDateString(),
      chapterName,
      category,
    });
    return tips;
  } catch (error) {
    throw error;
  }
};

const getChapter11Tips = (selector, $ = cheerio.load(), chapterName, category, chapterNo) => {
  let titleSelector1 = `${selector} > p`;
  console.log({ titleSelector1 });
  let tips = [];
  $(titleSelector1).each((i, e) => {
    let desc = $(e).next().next().text().trim();
    if (!isEmpty(desc)) {
      tips.push({
        title: $(e).text().trim(),
        desctiption: [$(e).next().next().text().trim()],
        chapter: "chapter 11",
        book: "the-Americas-Test-Kitchen",
        id: v4(),
        chapterNo,
        date: new Date().toDateString(),
        chapterName,
        category,
      });
    }
  });

  return tips;
};

const getChapter12Tips = (selector, $ = cheerio.load(), chapterName, category, chapterNo) => {
  let titleSelector1 = `${selector} > div:nth-child(1) > p.fmquote`;
  let tips = [];

  $(titleSelector1).each((i, ele) => {
    let desc1 = $(ele).next(".topicbodynoindent").text().trim();
    let desc2 = $(ele).next().next(".topicbodynoindent").text().trim();
    let desc = [];
    if (!isEmpty(desc1)) {
      desc.push(desc1);
    }

    if (!isEmpty(desc2)) {
      desc.push(desc2);
    }
    tips.push({
      title: $(ele).text().trim(),
      description: desc,
      chapterName,
      category,
      book: "the-Americas-Test-Kitchen",
      id: v4(),
      chapterNo,
      date: new Date().toDateString(),
      chapterName,
      category,
    });
  });

  return tips;
};

const getChapter16Tips = (selector, $ = cheerio.load(), chapterName, category, chapterNo) => {
  let titleSelector = `${selector} > div > p.topicsubhead`;
  let desc = $(titleSelector).next().text().trim();
  let ulsSelector1 = `${selector} > div > ul:nth-child(3)`;
  let ulsSelector2 = `${selector} > div > ul:nth-child(4)`;
  let ulsSelector3 = `${selector} > div > ul:nth-child(5)`;
  let ulsSelector4 = `${selector} > div > ul:nth-child(6)`;
  let ulsSelector5 = `${selector} > div > ul:nth-child(7)`;
  let title = $(titleSelector).text().trim();

  let uls1 = $(ulsSelector1).text().trim();
  let uls2 = $(ulsSelector2).text().trim();
  let uls3 = $(ulsSelector3).text().trim();
  let uls4 = $(ulsSelector4).text().trim();
  let uls5 = $(ulsSelector5).text().trim();
  let filanUls = [uls1, uls2, uls3, uls4, uls5, desc];
  filanUls = filter(filanUls, Boolean);
  let finalDesc = [...filanUls];
  finalDesc = filter(finalDesc, Boolean);
  let tip = {
    book: "the-Americas-Test-Kitchen",
    id: v4(),
    chapterNo,
    date: new Date().toDateString(),
    chapter: chapterName,
    title,
    desctiption: finalDesc,
    chapterName,
    category,
  };
  return tip;
};

const getCommonChapterTips = (selector, $ = cheerio.load(), chapterName, category, chapterNo) => {
  try {
    let titleSelector1 = `${selector} > div > p.topicsubhead`;

    let tips = [];
    let finalDesc = [];
    let desc = $(titleSelector1).next("p.topicbodynoindent").text().trim();
    let desc1 = $(titleSelector1).next().next("p.topicbodynoindent").text().trim();
    let desc2 = [];
    $(titleSelector1)
      .nextAll("p.topicbody")
      .each((i, e) => {
        desc2.push($(e).text().trim());
      })
      .text()
      .trim();
    finalDesc.push(desc);
    finalDesc.push(desc1);
    finalDesc = [...finalDesc, ...desc2];
    finalDesc = filter(finalDesc, Boolean);
    $(titleSelector1).each((i, e) => {
      tips.push({
        title: $(e).text().trim(),
        desctiption: finalDesc,
        chapter: chapterName,
        book: "the-Americas-Test-Kitchen",
        id: v4(),
        chapterNo,
        date: new Date().toDateString(),
        chapterName,
        category,
      });
    });

    return tips;
  } catch (error) {
    throw error;
  }
};

const getAllTips = () => {
  if (chapter.name == "chapter 4111") {
    let titleSelector = `${selector} > div > p.topicsubhead`;
    let descriptionSelector1 = `${selector} > div > p.topicbodynoindent`;
    let descriptionSelector2 = `${selector} > div > p:nth-child(3)`;
    let descriptionSelector3 = `${selector} > div > p:nth-child(4)`;
    let ulsSelector1 = `${selector} > div > ul:nth-child(3)`;
    let ulsSelector2 = `${selector} > div > ul:nth-child(4)`;
    let ulsSelector3 = `${selector} > div > ul:nth-child(5)`;
    let ulsSelector4 = `${selector} > div > ul:nth-child(6)`;
    let ulsSelector5 = `${selector} > div > ul:nth-child(7)`;
    let title = $(titleSelector).text().trim();
    let desctiption1 = $(descriptionSelector1).text().trim();
    let desctiption2 = $(descriptionSelector2).text().trim();
    let desctiption3 = $(descriptionSelector3).text().trim();
    let uls1 = $(ulsSelector1).text().trim();
    let uls2 = $(ulsSelector2).text().trim();
    let uls3 = $(ulsSelector3).text().trim();
    let uls4 = $(ulsSelector4).text().trim();
    let uls5 = $(ulsSelector5).text().trim();
    let filanUls = [uls1, uls2, uls3, uls4, uls5];
    filanUls = filter(filanUls, Boolean);
    let finalDesc = [desctiption1, desctiption2, desctiption3, ...filanUls];
    finalDesc = filter(finalDesc, Boolean);
    chapterTips.push({
      book: "the-Americas-Test-Kitchen",
      id: v4(),
      chapterNo,
      date: new Date().toDateString(),
      chapter: chapter.name,
      title,
      desctiption: finalDesc,
    });
  }
};

getRawHtml().then(console.log).catch(console.log);
