import { createInterface, Interface, clearLine, moveCursor } from "readline";

export function createRL(): Interface {
	return createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: true,
	});
}

export function clearline() {
	moveCursor(process.stdout, -1, 0);
}

export {
	Key,
	Interface,
	moveCursor,
	cursorTo,
	clearScreenDown,
	CursorPos,
} from "readline";
