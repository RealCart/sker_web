import { useMutation } from "@tanstack/react-query";
import { postCost } from "../requests/cost";

export function useAddCost() {
	return useMutation({
		mutationFn: (data: ICost) => postCost({ data }),
	})
}