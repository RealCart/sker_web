import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteVehicle, getUserVehicleImages, getUserVehicleList, getVehicle, getVehicleBrandList, getVehicleCategoryList, getVehicleList, getVehicleListByCategory, getVehicleModelList, getVehicleMyList, getVehicleTypeList, postVehicle, putVehicle } from "../requests/vehicle";


export function useFetchVehicle({ id }: { id: string }) {
	return useQuery<IVehicle>({
		queryKey: ['vehicle'],
		queryFn: () => getVehicle({ id }),
		enabled: id !== null || id !== undefined
	})
}

export function useFetchVehicelCategory() {
	return useQuery<IDefault[]>({
		queryKey: ['vehicleCategory'],
		queryFn: getVehicleCategoryList,
	})
}

export function useFetchVehicelType() {
	return useQuery<IDefault[]>({
		queryKey: ['vehicleType'],
		queryFn: getVehicleTypeList,
	})
}

export function useFetchVehicleModelList() {
	return useQuery<VehicleModel[]>({
		queryKey: ['vehicleModel'],
		queryFn: getVehicleModelList,
	})
}

export function useFetchVehicleBrandList() {
	return useQuery<IDefault[]>({
		queryKey: ['vehicleBrand'],
		queryFn: getVehicleBrandList,
	})
}

export function useFetchVehicleList({ enabled }: { enabled: boolean }) {
	return useQuery<IVehicle[]>({
		queryKey: ['vehicleList'],
		queryFn: getVehicleList,
		enabled
	})
}

export function useFetchUserVehicleList({ id, enabled }: { id: string, enabled: boolean }) {
	return useQuery<IVehicle[]>({
		queryKey: ['userVehicleList'],
		queryFn: () => getUserVehicleList({ id }),
		enabled
	})
}

export function useFetchUserVehicleImages({ id }: { id: string }) {
	return useQuery<IVehicle[]>({
		queryKey: ['userVehicleImages'],
		queryFn: () => getUserVehicleImages({ id }),
	})
}



export function useFetchMyVehicleList({ enabled }: { enabled: boolean }) {
	return useQuery<IVehicle[]>({
		queryKey: ['myVehicleList'],
		queryFn: getVehicleMyList,
		enabled
	})
}

export function usePostVehicle() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: IVehicle) => postVehicle({ vehicle: data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['myVehicleList'] });
		},
	})
}

export function usePutVehicle() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: IVehicle) => putVehicle({ vehicle: data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['myVehicleList'] });
		},
	})
}



export function useDeleteVehicles() {

	const queryClient = useQueryClient();


	return useMutation({
		mutationFn: (data: number[]) => deleteVehicle({ vehicles: data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['myVehicleList'] });
		},
	})
}

export function useFetchTypesVehiclesByCategory() {

	const queryClient = useQueryClient();


	return useMutation({
		mutationFn: (id: number) => getVehicleListByCategory({ id: String(id) }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['vehicleList'] });
		},
	})
}


