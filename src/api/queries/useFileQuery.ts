import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, getUserById, putUser } from "../requests/user";
import { getFileDownload, getFileUrl, postUploadFile } from "../requests/files";

export function useUploadFile() {
	return useMutation({
		mutationFn: (data: FormData) => postUploadFile({ formdata: data }),
	})
}

export function useFileURL() {
	return useMutation({
		mutationFn: (data: string) => getFileUrl({ filename: data }),
	})
}

export function useDownloadFile(data: string) {
	return useQuery({
		queryKey: ['downloadFile'],
		queryFn: () => getFileDownload({ filename: data }),
		enabled: data !== null && data !== undefined
	})
}

