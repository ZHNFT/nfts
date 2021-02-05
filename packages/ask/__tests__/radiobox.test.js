const inquiry = require("../dist/index.js");

const questions = [
  {
    type: "name",
    message: "Your Name?",
    chioces: ["lei", "wen", "peng"],
  },
  {
    type: "age",
    message: "Your age?",
    chioces: [24, 25, 26],
  },
  {
    type: "gender",
    message: "Your gender?",
    chioces: ["man", "women", "unknown"],
  },
];

inquiry.default(questions).then((answer) => {
  console.log("final", answer);
});
