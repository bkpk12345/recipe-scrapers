const cheerio = require("cheerio");
let filePath = "../files/ebook2/index.html";
const fs = require("fs");
const { uniqBy, forEach } = require("lodash");
const filter = require("lodash.filter");
