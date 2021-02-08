/* eslint-disable no-unused-vars */
const readline = require("readline");

const questions = [
	{ message: "name?" },
	{ message: "age?" },
	{ message: "gender?" },
	{ message: "name?" },
	{ message: "age?" },
	{ message: "gender?" },
	{ message: "name?" },
	{ message: "age?" },
	{ message: "gender?" },
	{ message: "name?" },
	{ message: "age?" },
	{ message: "gender?" },
	{ message: "name?" },
	{ message: "age?" },
	{ message: "gender?" },
	{ message: "name?" },
	{ message: "age?" },
	{ message: "gender?" },
	{ message: "name?" },
	{ message: "age?" },
	{ message: "gender?" },
];

let rl;

function run(question) {
	return new Promise((resolve, reject) => {
		rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			terminal: true,
		});

		function done(value) {
			rl.pause();
			rl.close();
			// eslint-disable-next-line no-undefined
			rl = undefined;
			resolve(value);
		}

		const option = questions.shift();
	});
}

run();
