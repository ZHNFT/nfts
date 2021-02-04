// Ask Me Everything

export type Question = {
	type?: string;
	message: string;
	choices: (string | number)[];
};

export type Questions = Question[];

class Ask {}
