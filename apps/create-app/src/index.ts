import Creator from "./Creator";

const cli = new Creator();

cli.execute().then(
	() => {
		//
	},
	(e) => {
		console.log(e);
		process.exit(1);
	}
);
