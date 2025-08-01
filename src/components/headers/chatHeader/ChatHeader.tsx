// import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import Arrow from '@/assets/icons/arrow-right.svg'
// import OrderResponseCardRate from '@/components/orderInfo/OrderResponseCardRate'
// import Comment from '@/assets/icons/comment.svg'
// import Star from '@/assets/icons/star.svg'
// import { Link, useRouter } from 'expo-router'
// import Popover from 'react-native-popover-view';
// import { baseURL } from '@/api/instance'
// import { useRoleState } from '@/provider/roleContext'
// import { useFetchReviews, useFetchUserById } from '@/api/queries/useUserQuery'
//
// const ChatHeader = ({ partner, orderId }: { partner: IUser | null, orderId: string | null }) => {
//
// 	const router = useRouter()
// 	const { roleState } = useRoleState()
// 	const { data, refetch } = useFetchUserById(Number(partner?.id))
// 	const { data: reviews, refetch: refetchReviews } = useFetchReviews({ id: Number(partner?.id), role: roleState?.isPerformer ? 'EXECUTOR' : 'CUSTOMER' })
//
//
// 	return (
// 		<View className='bg-white h-[80px] py-[8px] px-[14px] flex flex-row  rounded-b-border_16 '>
// 			<Pressable className='rotate-180 self-start' onPress={() => router.back()}>
// 				<Arrow width={15} height={15} />
// 			</Pressable>
//
// 			<View className=' ml-[14px] flex w h-[53px] flex-row flex-1 w-full'>
//
//
// 				<View className='flex flex-row justify-between w-full'>
// 					<Image
// 						className='w-[47px] h-full rounded-border_7'
// 						source={{ uri: partner && partner.photoUrl ? `${baseURL}/files/download/${partner.photoUrl}` : 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg' }}
// 					/>
//
// 					<View className='ml-[14px] flex flex-1 flex-col justify-between p-0 '>
// 						<Text className='font-bold text-regular_16'>{partner && partner.firstName} {partner && partner.middleName}</Text>
//
// 						<View className=' flex flex-row h-[22px]'>
// 							<OrderResponseCardRate
// 								icon={<Star color={'#98ADBD'} className='w-[14px] h-[14px]' />}
// 								value={roleState?.isPerformer ? Number(data?.ratingExecutor) : Number(data?.ratingCustomer)}
// 							/>
// 							<OrderResponseCardRate
// 								icon={<Comment color={'#98ADBD'} className='w-[14px] h-[14px]' />}
// 								value={reviews ? reviews.length : 0}
// 							/>
// 						</View>
// 					</View>
//
//
// 					<Popover
// 						arrowSize={{ width: 0, height: 0 }}
// 						backgroundStyle={{ backgroundColor: 'transparent' }}
// 						from={(
// 							<TouchableOpacity className='w-[40px] h-[40px] rounded-[8px] bg-gray_004 flex justify-center items-center relative'>
// 								<View className='flex flex-col justify-center items-center h-[24px] w-[24px] '>
// 									<View className='bg-dark w-[4px] h-[4px] rounded-full' />
// 									<View className='bg-dark w-[4px] h-[4px] rounded-full mt-[3px]' />
// 									<View className='bg-dark w-[4px] h-[4px] rounded-full mt-[3px]' />
// 								</View>
// 							</TouchableOpacity>
// 						)}>
//
//
//
// 						<View className="bg-dark rounded-border_16 flex flex-col w-[215px]">
// 							<Link href={`/(tabs)/profile/contractor/${partner && partner.id}`} className="text-white px-[16px] py-[10px] flex items-center justify-between">
// 								Посмотреть профиль
// 							</Link>
// 							<Link href="/report" className="text-white px-[16px] py-[10px] flex items-center justify-between">
// 								Пожаловаться
// 							</Link>
// 							{orderId && roleState?.isPerformer &&
// 								<Link href={`/(tabs)/order/${orderId}`} className="text-white px-[16px] py-[10px] flex items-center justify-between">
// 									Информация по заказу
// 								</Link>}
// 						</View>
// 					</Popover>
//
//
// 				</View>
// 			</View>
//
//
//
// 		</View>
// 	)
// }
//
// export default ChatHeader
//
// const styles = StyleSheet.create({})