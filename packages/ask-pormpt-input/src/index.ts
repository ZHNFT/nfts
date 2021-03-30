import { createPrompt, useState, useKeypress, usePrefix } from "@initializer/ask-core"
import chalk from "chalk"

export default createPrompt((config, done) => {
  const { message } = config
  const [status, setStatus] = useState("pending")
  const [text, setText] = useState("")

  const prefix = usePrefix(status)

  useKeypress((key, rl) => {
    if (rl.line) {
      setText(rl.line)
    }

    if (key.name === "return") {
      setStatus("done")
      done(text)
    }
  })

  let formatedValue = ""
  if (status === "done") {
    formatedValue = chalk.green(text)
  } else {
    formatedValue = chalk.blue(text)
  }

  return `${prefix} ${message} ${formatedValue}`
})
