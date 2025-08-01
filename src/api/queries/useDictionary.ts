import { useQuery } from "@tanstack/react-query";
import { getCitiesList } from "../requests/dictionary";

export function useFetchCities() {
	return useQuery<ICity[]>({
		queryKey: ['citiesList'],
		queryFn: getCitiesList,
	})
}