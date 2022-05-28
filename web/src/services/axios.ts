import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:3333/api/v1",
});

/**
 * Fake response delay
 */
function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
api.interceptors.request.use(async (config) => {
	await sleep(500);
	return config;
});
