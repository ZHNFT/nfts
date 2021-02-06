const readline = require("readline");
const { default: keypress } = require("../dist/Keypress");

const off = keypress(process.stdin, (key) => {
	console.log(key.name);
	if (key.name === "down") {
		off()
	}
});
