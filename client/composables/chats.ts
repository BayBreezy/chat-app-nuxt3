export const useSearchUser = async (term: string) => {
	try {
		const { find } = useStrapi();
		const users = await find("users", {
			populate: {
				profile: {
					populate: {
						image: true,
					},
				},
			},
			filters: {
				$or: [
					{
						username: {
							$containsi: term,
						},
					},
					{
						email: {
							$containsi: term,
						},
					},
				],
			},
		});
		return users;
	} catch (error) {
		console.log(error);
	}
};
