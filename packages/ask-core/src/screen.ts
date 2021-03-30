// screen
import {
  Interface,
  clearline,
  moveCursor,
  clearScreenDown,
  // CursorPos,
} from "./readline"

let index = 1
let workingText = ""

// const getHeight = (text: string) => text.split("\n").length;
const getWidth = (text: string) => text.length
// const getCursorPos = (rl: Interface): CursorPos => rl.getCursorPos();

export function render(text: string, rl: Interface): void {
  moveCursor(process.stdout, -text.length, 0)
  clearScreenDown(process.stdout)
  clearline()
  process.stdout.write(text)
  workingText = text
}

export function release(): void {
  const textWidth = getWidth(workingText)
  moveCursor(process.stdout, -textWidth, -index)
  clearScreenDown(process.stdout)
  process.stdout.write(workingText)
  workingText = ""
  // down
  moveCursor(process.stdout, -textWidth, 1)
  index++
}
