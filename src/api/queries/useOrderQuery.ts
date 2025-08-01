
import { getDeclineExecutor, getExecutorToOrder, getFullOrderList, getMyOrderList, getOrderByID, getOrderComplete, getOrderFeedbackById, getOrderFeedbacks, getOrderList, getOrderListByUser, getOrderStatystic, postFeedbackToOrder, postFetchOrdersByType, postNewOrder, putOrder } from "../requests/order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useOrder() {
	return useMutation({
		mutationFn: (data: IOrder) => postNewOrder({ data }),
	})
}

export function useOrderEdit() {

	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: IOrder) => putOrder({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['order'] });
		},
	})
}



export function useFetchOrderList({ orderStatus, userStatus, hasFeedBack, enabled }: { orderStatus: 'FINISHED' | 'PROCESS' | 'PENDING' | 'DRAFT', userStatus: 'CUSTOMER' | 'EXECUTOR', hasFeedBack: boolean | null, enabled: boolean }) {
	return useQuery<IOrder[]>({
		queryKey: ['orderList'],
		queryFn: () => getOrderList({ orderStatus, userStatus, hasFeedBack }),
		enabled
	})
}

export function useFetchOrderListByUser({ id, enabled, orderStatus }: { id: number, enabled: boolean, orderStatus: 'FINISHED' | 'PROCESS' | 'PENDING' | 'DRAFT' }) {
	return useQuery<IOrder[]>({
		queryKey: ['orderListByUser'],
		queryFn: () => getOrderListByUser({ id, orderStatus }),
		enabled
	})
}



export function useFetchOrderListByPending({ userStatus, hasFeedBack, enabled }: { userStatus: 'CUSTOMER' | 'EXECUTOR', hasFeedBack: boolean, enabled: boolean }) {
	return useQuery<IOrder[]>({
		queryKey: ['pendingOrderList'],
		queryFn: () => getOrderList({ orderStatus: 'PENDING', userStatus, hasFeedBack }),
		enabled
	})
}

export function useFetchOrderListbyProcess({ userStatus, hasFeedBack, enabled }: { userStatus: 'CUSTOMER' | 'EXECUTOR', hasFeedBack: boolean, enabled: boolean }) {
	return useQuery<IOrder[]>({
		queryKey: ['processOrderList'],
		queryFn: () => getOrderList({ orderStatus: 'PROCESS', userStatus, hasFeedBack }),
		enabled
	})
}

export function useFetchFullOrderList({ orderStatus }: { orderStatus: 'FINISHED' | 'PROCESS' | 'PENDING' | 'DRAFT', index: number }) {

	return useQuery<IOrder[]>({
		queryKey: ['orderList'],
		queryFn: () => getFullOrderList({ orderStatus }),
	})
}


export function useFetchOrder(id: number) {
	return useQuery<IOrder>({
		queryKey: ['order', id],
		queryFn: () => getOrderByID({ id }),
		enabled: id !== null && id !== undefined && id !== 0
	})
}

export function useOrderFeedback() {


	return useMutation({
		mutationFn: (orderFeedback: IOrderFeedback) => postFeedbackToOrder({ orderFeedback }),
	})
}

export function useFetchOrdersByType() {
	return useMutation({
		mutationFn: (ids: number[]) => postFetchOrdersByType({ ids }),
	})
}



export function useFetchOrderStatystic(userStatus: 'CUSTOMER' | 'EXECUTOR') {
	return useQuery<{ statistic: StatisticItem[] }>({
		queryKey: ['orderStatystic', userStatus],
		queryFn: () => getOrderStatystic({ userStatus }),
	})
}

export function useFetchOrderFeedback(id: number) {
	return useQuery<IOrderFeedbackByOrder[]>({
		queryKey: ['orderFeedbackList', id],
		queryFn: () => getOrderFeedbacks({ id }),
	})
}

export function useFetchMyOrderFeedbackList(isExecutor: boolean) {
	return useQuery<IOrderFeedbackByOrder[]>({
		queryKey: ['myOrderFeedbackList'],
		queryFn: getMyOrderList,
		enabled: isExecutor
	})
}

export function useFetchOrderFeedbackById(id: string | null) {
	return useQuery<IOrderFeedbackByOrder>({
		queryKey: ['fetchOrderFeedbackByID', id],
		queryFn: () => getOrderFeedbackById({ id: id ?? '' }),
		enabled: !!id
	});
}

export function useSetExecutorToOrder() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ feedbackId, id, userId }: { feedbackId: string, id: string, userId: string }) => getExecutorToOrder({
			feedbackId: Number(feedbackId),
			id: Number(id),
			userId: Number(userId)
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['fetchOrderFeedbackByID'] })
		}
	})
}

export function useDeclineExecutor() {




	return useMutation({
		mutationFn: ({ feedbackId }: { feedbackId: string }) => getDeclineExecutor({
			feedbackId: Number(feedbackId),
		}),

	})
}

export function useCompleteOrder() {


	return useMutation({
		mutationFn: ({ id }: { id: string }) => getOrderComplete({
			id: Number(id),
		})
	})
}

