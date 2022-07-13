const cheerio = require("cheerio");
let filePath = "../files/ebook2/index.html";
const fs = require("fs");
const { uniqBy, forEach } = require("lodash");
const filter = require("lodash.filter");

let html = fs.readFileSync(filePath);

let $ = cheerio.load(html);
let questions = [];
$("p.c").each((index, ele) => {
  let head = $(ele).text().trim();
  title = head.includes("Guide");
  if (title) {
    $(".q-head").each((ind, ele) => {
      let question = $(ele).text().trim();
      let subHeading = $(ele).prev(".c-head").text().trim();
      let heading = head;
      let answers = [];

      let ans = $(ele).next(".noindent").text().trim();
      answers.push(ans);
      ans = $(ele).next().next(".noindent").text().trim();
      answers.push(ans);
      ans = $(ele).next().next().next(".noindent").text().trim();
      answers.push(ans);

      ans = $(ele).next(".indent").text().trim();
      answers.push(ans);
      ans = $(ele).next().next(".indent").text().trim();
      answers.push(ans);
      ans = $(ele).next().next().next(".indent").text().trim();
      answers.push(ans);
      answers = filter(answers, Boolean);
      questions.push({
        heading: heading,
        subHeading: subHeading,
        title: question,
        ans: answers,
      });
    });

    $(".q-head1").each((ind, ele) => {
      let question = $(ele).text().trim();
      let subHeading = $(ele).prev(".c-head").text().trim();
      let heading = head;
      let answers = [];

      let ans = $(ele).next(".noindent").text().trim();
      answers.push(ans);
      ans = $(ele).next().next(".noindent").text().trim();
      answers.push(ans);
      ans = $(ele).next().next().next(".noindent").text().trim();
      answers.push(ans);

      ans = $(ele).next(".indent").text().trim();
      answers.push(ans);
      ans = $(ele).next().next(".indent").text().trim();
      answers.push(ans);
      ans = $(ele).next().next().next(".indent").text().trim();
      answers.push(ans);

      answers = filter(answers, Boolean);
      questions.push({
        heading: heading,
        subHeading: subHeading,
        title: question,
        ans: answers,
      });
    });
  }
});
console.log(questions);
questions = uniqBy(questions, "title");
let newQuestions = [];
forEach(questions, (question) => {
  let newQuestion = {
    ...question,
    answer: JSON.stringify(question.ans),
  };
  delete newQuestion["ans"];
  newQuestions.push(newQuestion);
});
fs.writeFileSync("../files/questions.json", JSON.stringify(newQuestions, null, 4));
