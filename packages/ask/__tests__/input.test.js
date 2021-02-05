const inquiry = require("../dist/index.js");

const questions = [
  {
    type: "name",
    message: "Your Name?",
  },
  {
    type: "age",
    message: "Your age?",
  },
  {
    type: "gender",
    message: "Your gender?",
  },
];

inquiry.default(questions).then((answer) => {
  console.log("final", answer);
});
