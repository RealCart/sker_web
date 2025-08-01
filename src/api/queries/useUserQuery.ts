import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUsersFromCompany, getReviews, getUser, getUserById, getUserByPhone, putUser } from "../requests/user";
import { sendFCMToken } from "../requests/firebase";

export function usePutUser() {
	return useMutation({
		mutationFn: (data: IUser) => putUser({ data }),
	});
}

export function useFetchUser() {
	return useQuery<IUser>({
		queryKey: ["user"],
		queryFn: getUser,
	});
}

export function useFetchUserById(id: number | undefined) {
	return useQuery<IUserById>({
		queryKey: ["userById"],
		queryFn: () => getUserById({ id }),
		enabled: !!id,
	});
}

export function useGetUserByPhone() {
	return useMutation({
		mutationFn: (phone: string) => getUserByPhone({ phone }),
	});
}

export function useFetchReviews({
	id,
	role,
}: {
	id: number | undefined;
	role: string;
}) {
	return useQuery<IReview[]>({
		queryKey: ["reviewList"],
		queryFn: () => getReviews({ id, role }),
		enabled: !!id,
	});
}

export function useSendFcm() {
	return useMutation({
		mutationFn: (token: string) => sendFCMToken(token),
	});
}

export function useDeleteUsersFromCompany() {

	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (users: CompanyUsersType) => deleteUsersFromCompany({ companyUsers: users }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['myCompany'] });
		}
	});
}
