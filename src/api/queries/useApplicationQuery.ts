import { useMutation } from "@tanstack/react-query";
import { postReport } from "../requestslication";

export function useAddReport() {
	return useMutation({
		mutationFn: (data: IReport) => postReport({ data }),
	})
}