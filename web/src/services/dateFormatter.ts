export function dateFormatter(timestamp: number): string {
	const date = new Date(timestamp);
	return new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "short",
	}).format(date);
}
