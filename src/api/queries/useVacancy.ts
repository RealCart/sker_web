import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyResumeList, getMyVacancyList, getResume, getResumeList, getVacancy, getVacancyList, postResume, postVacancy, putVacancy } from "../requests/vacancy";

export function usePostVacancy() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: IVacancy) => postVacancy({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['vacancyList'] })
		},
	})
}

export function usePutVacancy() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: IVacancy) => putVacancy({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['vacancyList'] })
		},
	})
}


export function useFetchVacancies({ filterData }: { filterData?: IVacancyFilter | undefined }) {
	return useQuery({
		queryKey: ['vacancyList'],
		queryFn: () => getVacancyList({ filterData })
	})
}

export function useFetchMyVacancies({ filterData }: { filterData?: IVacancyFilter }) {
	return useQuery({
		queryKey: ['myVacancyList'],
		queryFn: () => getMyVacancyList({ filterData })
	})
}

export function useFetchVacancy(id: number, enabled?: boolean) {
	return useQuery({
		queryKey: ['vacancy'],
		queryFn: () => getVacancy({ id }),
		enabled: enabled
	})
}

export function useFetchVacancyByFilter() {
	return useMutation({
		mutationFn: ({ filterData }: { filterData?: IVacancyFilter }) => getVacancyList({ filterData })
	})
}

export function useFetchListByFilter() {
	return useMutation({
		mutationFn: ({ filterData }: { filterData?: IVacancyFilter }) => getMyVacancyList({ filterData })
	})
}

// Резюме

export function usePostResume() {

	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: IResume) => postResume({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['resumeList'] });
		}
	})
}

export function usePutResume() {

	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: IResume) => postResume({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['resumeList'] });
		}
	})
}

export function useFetchResumes({ filterData }: { filterData?: IVacancyFilter }) {
	return useQuery({
		queryKey: ['resumeList'],
		queryFn: () => getResumeList({ filterData })
	})
}

export function useFetchMyResumes() {
	return useQuery({
		queryKey: ['myResumeList'],
		queryFn: getMyResumeList
	})
}


export function useFetchResume(id: number, enabled?: boolean) {
	return useQuery({
		queryKey: ['resume'],
		queryFn: () => getResume({ id }),
		enabled
	})
}

export function useFetchResumeByFilter() {
	return useMutation({
		mutationFn: ({ filterData }: { filterData?: IVacancyFilter }) => getResumeList({ filterData })
	})
}
