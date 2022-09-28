import { notify } from "notiwind";

// Returns the apiUrl without the `API` attached
export const useApiUrl = () => {
	return useStrapiUrl().replace("/api", "");
};

export const useNotify = () => notify;

export const useUpdateCurrentUser = async () => {
	const user = useStrapiUser();
	const client = useStrapiClient();
	user.value = await client("users/me?populate[profile][populate][0]=image");
};
