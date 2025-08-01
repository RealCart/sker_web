// import { useState } from 'react';
// import * as FileSystem from 'expo-file-system';
// import { getFileDownload } from '@/api/requests/files';
// import { encode } from 'base64-arraybuffer'
//
// export const useSaveFile = () => {
// 	const [isSaving, setIsSaving] = useState(false);
// 	const [error, setError] = useState<string | null>(null);
// 	const [fileUri, setFileUri] = useState<string | null>(null);
//
// 	const saveFile = async (filename: string) => {
// 		setIsSaving(true);
// 		setError(null);
// 		setFileUri(null);
//
// 		try {
// 			const response = await getFileDownload({ filename })
// 			const base64Data = encode(response);
// 			const fileUri = `${FileSystem.documentDirectory}${filename}`;
// 			await FileSystem.writeAsStringAsync(fileUri, base64Data, {
// 				encoding: FileSystem.EncodingType.Base64,
// 			});
// 			console.log('Файл сохранён в:', fileUri);
// 			setFileUri(fileUri)
// 		} catch (error) {
// 			console.error('Ошибка при сохранении файла:', error);
// 		}
// 	};
//
// 	return { saveFile, isSaving, error, fileUri };
// };
