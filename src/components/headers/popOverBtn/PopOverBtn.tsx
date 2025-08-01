// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { ReactNode, useState } from 'react'
// import Popover from 'react-native-popover-view'
//
// const PopOverBtn = ({ children, style, onPress, popoverRef }: { children: ReactNode, style: string, onPress?: () => void, popoverRef?: React.RefObject<any> }) => {
//
// 	return (
// 		<Popover
// 			arrowSize={{ width: 0, height: 0 }}
// 			backgroundStyle={{ backgroundColor: 'transparent' }}
// 			onOpenStart={onPress}
// 			ref={popoverRef}
// 			from={(
// 				<TouchableOpacity
// 					className={`w-[40px] h-[40px] rounded-[8px] bg-gray_004 flex justify-center items-center relative ${style}`}>
// 					<View className='flex flex-col justify-center items-center h-[24px] w-[24px] '>
// 						<View className='bg-dark w-[4px] h-[4px] rounded-full' />
// 						<View className='bg-dark w-[4px] h-[4px] rounded-full mt-[3px]' />
// 						<View className='bg-dark w-[4px] h-[4px] rounded-full mt-[3px]' />
// 					</View>
// 				</TouchableOpacity>
// 			)}>
// 			{children}
// 		</Popover>
// 	)
// }
//
// export default PopOverBtn
//
// const styles = StyleSheet.create({})