import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRoleState } from '@/provider/roleContext';
import { baseURL } from '@/api/instance';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import StarIcon from '@/assets/icons/star.svg';
import MessageIcon from '@/assets/icons/message.svg';
import ChatIcon from '@/assets/icons/chat.svg';
import './HeaderScroll.scss';

interface IUser {
	photoUrl?: string;
	firstName: string;
	middleName: string;
	ratingExecutor?: number;
	ratingCustomer?: number;
}

interface HeaderProfileScrollProps {
	info?: IUser;
	reviewsCount?: number;
}

const HeaderProfileScroll: React.FC<HeaderProfileScrollProps> = ({
																	 info,
																	 reviewsCount
																 }) => {
	const navigate = useNavigate();
	const { roleState } = useRoleState();

	const MAX_HEADER_HEIGHT = 200;
	const MIN_HEADER_HEIGHT = 120;

	// Get scroll progress (0 to 1)
	const { scrollYProgress } = useScroll();

	// Height animation
	const height = useTransform(
		scrollYProgress,
		[0, 1],
		[MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT]
	);

	// Top header animations
	const topHeaderOpacity = useTransform(
		scrollYProgress,
		[0, 0.5],
		[1, 0]
	);
	const topHeaderY = useTransform(
		scrollYProgress,
		[0, 0.5],
		[0, -MAX_HEADER_HEIGHT / 2]
	);

	// Bottom header animations
	const bottomHeaderOpacity = useTransform(
		scrollYProgress,
		[0.5, 1],
		[0, 1]
	);
	const bottomHeaderY = useTransform(
		scrollYProgress,
		[0.5, 1],
		[50, 0]
	);

	return (
		<motion.header
			className="header-container"
			style={{ height }}
		>
			{/* Top Header */}
			<motion.div
				className="top-header"
				style={{
					opacity: topHeaderOpacity,
					y: topHeaderY
				}}
			>
				<button onClick={() => navigate(-1)} className="back-button">
				</button>

				<div className="profile-info">
					<img
						className="profile-image"
						src={
							info?.photoUrl
								? `${baseURL}/files/download/${info.photoUrl}`
								: 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'
						}
						alt="Profile"
					/>
					<h3 className="profile-name">
						{info?.firstName} {info?.middleName}
					</h3>
				</div>

				<div className="dropdown">
					<button className="dropdown-toggle">
						<div className="dropdown-dots">
							<span className="dot"></span>
							<span className="dot"></span>
							<span className="dot"></span>
						</div>
					</button>
					<div className="dropdown-menu">
						<a href="/profile" className="dropdown-item">
							Посмотреть профиль
						</a>
						<a href="/profile" className="dropdown-item">
							Пожаловаться
						</a>
					</div>
				</div>
			</motion.div>

			{/* Bottom Header */}
			<motion.div
				className="bottom-header"
				style={{
					opacity: bottomHeaderOpacity,
					y: bottomHeaderY
				}}
			>
				<div className="compact-profile">
					<div className="profile-row">
						<img
							className="compact-image"
							src={
								info?.photoUrl
									? `${baseURL}/files/download/${info.photoUrl}`
									: 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'
							}
							alt="Profile"
						/>

						<div className="profile-details">
              <span className="compact-name">
                {info?.firstName} {info?.middleName}
              </span>

							<div className="rating-container">
								<div className="rating-badge">
									<span className="rating-value">
                    {roleState?.isPerformer
						? info?.ratingExecutor
						: info?.ratingCustomer}
                  </span>
								</div>

								<div className="rating-badge">
									<span className="rating-value">{reviewsCount}</span>
								</div>
							</div>
						</div>
					</div>

					<button
						onClick={() => navigate('/chat')}
						className="chat-button"
					>
					</button>
				</div>
			</motion.div>
		</motion.header>
	);
};

export default HeaderProfileScroll;