// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Platform } from 'react-native';
// import { PERMISSIONS, request, RESULTS, Permission } from 'react-native-permissions';
//
// const requestLocationPermissions = async () => {
// 	try {
// 		// Указываем тип переменной permissions как массив Permission
// 		let permissions: Permission[] = [];
//
// 		if (Platform.OS === 'ios') {
// 			permissions = [
// 				PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
// 				PERMISSIONS.IOS.LOCATION_ALWAYS,
// 			];
// 		} else if (Platform.OS === 'android') {
// 			permissions = [
// 				PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
// 				PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
// 			];
// 		}
//
// 		// Используем Partial для создания объекта с частичным набором разрешений
// 		const results: Partial<Record<Permission, string>> = {};
//
// 		for (const permission of permissions) {
// 			const result = await request(permission);
// 			results[permission] = result;
//
// 			if (result === RESULTS.GRANTED) {
// 				console.log(`${permission} granted`);
// 			} else {
// 				console.log(`${permission} denied`);
// 			}
// 		}
//
// 		// Сохраняем результаты в AsyncStorage
// 		await AsyncStorage.setItem('locationPermissions', JSON.stringify(results));
//
// 		console.log('Permissions saved to AsyncStorage:', results);
// 	} catch (error) {
// 		console.error('Error requesting location permissions:', error);
// 	}
// };
//
// export default requestLocationPermissions