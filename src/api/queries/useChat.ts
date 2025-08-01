import { useQuery } from "@tanstack/react-query";
import { getChat } from "../requests/chat";

export function useFetchChat(id: string | null) {
	return useQuery({
		queryKey: ['chat'],
		queryFn: () => getChat({ id }),
		enabled: !!id,
	})
}