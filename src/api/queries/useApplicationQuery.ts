import { useMutation } from "@tanstack/react-query";
import { postReport } from "../requests/application";

export function useAddReport() {
	return useMutation({
		mutationFn: (data: IReport) => postReport({ data }),
	})
}