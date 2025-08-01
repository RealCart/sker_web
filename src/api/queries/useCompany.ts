import { useMutation, useQuery } from "@tanstack/react-query"
import { getAddCompanyOperator, getMyCompany, postCompany } from "../requests/company"

export function usePostCompany() {

	return useMutation({
		mutationFn: (data: ICompany) => postCompany({ company: data }),
	})
}

export function useFetchMyCompany() {
	return useQuery({
		queryKey: ['myCompany'],
		queryFn: getMyCompany
	})
}

export function useSetCompanyOperator() {

	return useMutation({
		mutationFn: ({ companyId, id }: { companyId: number, id: number }) => getAddCompanyOperator({ companyId, id }),
	})
}