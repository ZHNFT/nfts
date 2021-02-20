const Prefix = {
	pending: "👉",
	done: "✊",
};

type PrefixKey = "pending" | "done";

export default function usePrefix(status: string): string {
	if (status in Prefix) {
		return Prefix[status] as string;
	}
	return "";
}
