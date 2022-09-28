import { io } from "socket.io-client";

export default defineNuxtPlugin((app) => {
	const url = useStrapiUrl().replace("/api", "");

	const socketIO = io(url);
	return {
		provide: {
			io: socketIO,
		},
	};
});
