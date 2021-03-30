const input = require("../dist")

input
  .default({
    type: "input",
    message: "Your Name?",
  })
  .then((ans1) => {
    input
      .default({
        type: "input",
        message: "Your Age?",
      })
      .then((ans2) => {
        input
          .default({
            type: "input",
            message: "Your Gender?",
          })
          .then((ans3) => {
            console.log(ans1, " <-> ", ans2, "<->", ans3)
          })
      })
  })
