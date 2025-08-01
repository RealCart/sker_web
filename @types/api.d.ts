type checkPhone = {
	phone: string,
	exist: boolean
}

type IDefault = {
	id?: number
	name: string,
}

type ICustomer = {
	id: number;
	username: string;
	email: string;
	roles: string[];
	city: IDefault;
	showPhone: boolean;
	firstName: string;
	middleName: string;
	description: string;
}

type IExecutor = {
	id: number;
	username: string;
	email: string;
	roles: string[];
	city: IDefault;
	showPhone: boolean;
	firstName: string;
	middleName: string;
	description: string;
}

interface IOrder {
	id?: number
	title?: string,
	price?: number,
	orderDate?: string,
	orderTime?: null | string,
	description?: string,
	photoUrl?: string[],
	customerRating?: number,
	executorRating?: number,
	vehicleType?: IDefault[],
	vehicleBrand?: IDefault,
	types?: IDefault[],
	vehicleAddress?: string,
	deliveryAddress?: string,
	customer?: ICustomer,
	executor?: IExecutor,
	createdAt?: Date,
	updatedAt?: Date
	createdBy?: IUser
	status?: 'FINISHED' | 'PROCESS' | 'PENDING'
	feedbackCount?: number,
	watchCount?: number,
	countMessage?: number,
	orderFeedbacks?: IOrderFeedback[],
	customerRatingComment?: string,
	executorRatingComment?: string,
	coordinates?: number[]
}

interface IUser {
	id?: number;
	username?: string;
	email?: string;
	roles?: string[];
	city?: IDefault;
	showPhone?: boolean;
	firstName?: string;
	middleName?: string;
	description?: string;
	photoUrl?: string;
	ratingCustomer?: number;
	ratingExecutor?: number;
}

interface IOrderFeedback {
	id?: number;
	description?: string;
	price?: number | null;
	order: { id: number };
	customer?: IUser
	status?: 'ACCEPTED' | 'FINISHED' | 'PROCESS' | 'PENDING'
}

interface StatisticItem {
	[status: string]: number;
}

interface IOrderFeedbackByOrder {
	id?: number;
	description?: string;
	price?: number;
	order: IOrder;
	executor: IUser;
	countUnreadMessage?: number;
	chatMessage?: IMessage
}

interface IUserById {
	id: number;
	firstName: string;
	middleName: string;
	phone: string;
	email: string;
	photoUrl?: string;
	ratingCustomer?: number;
	ratingExecutor?: number;
	address?: string;
	description?: string
	vehicles?: Array<IVehicle>
}

interface ICommonVacancyFields {
	id?: number;
	createdBy?: IUser;
	createdDate?: string | null;
	salary?: number;
	typeOfEmployment?: string | null;
	paymentPeriod?: string | null;
	city?: IDefault;
	photoUrls?: string[];
	fileUrls?: string[];
	description?: string | null;
	phone?: string | null;
	email?: string | null;
	whatsappNumber?: string | null;
	onAgreement?: boolean | null;
	status?: "OPEN" | "CLOSE" | "DRAFT" | "PUBLISHED"
}

interface IVacancy extends ICommonVacancyFields {
	position?: string | null;
	companyName?: string | null;
	companyDescription?: string | null;
	watchCount?: number;
}

interface IResume extends ICommonVacancyFields {
	typeOfWork?: string | null;
	workExperience?: number;
}

interface IVacancyFilter {
	cityId?: number,
	typeOfEmployment?: Array<IDefault>,
	salary?: number,
	publishDate?: string
}

type IVacancyAndResume = IVacancy & IResume;

interface IMessage {
	id?: number; // Делаем `id` опциональным
	sender: {
		id: number;
		username: string;
	};
	receiver: {
		id: number;
		username: string;
	};
	content?: string;
	photoUrl?: array<string>,
	attachment_url?: array<string>,
	createdDate: string,
	isRead?: boolean,
	orderFeedback: {
		id?: number; // Опциональное поле
	};
}

type VehicleModel = {
	id: number;
	name: string;
	vehicleBrand: IDefault;
};

interface IVehicle {
	id?: number;
	name: string;
	type?: {
		id?: number,
		name: string,
		category: IDefault
	};
	user: IUser;
	vehicleBrand?: string;
	vehicleModel?: string;
	vehicleNumber?: string;
	address: string;
	price?: number;
	docUrl: string;
	photoUrl: string[];
	typeOfEmployment: string;
}

interface IOrderType {
	id?: number
	name: string
	category: {
		id?: number
		name: string
		orderTypes: Array<string>
	}
}

type AdditionalCostLog = {
	id?: number;
	type: IDefault;
	cost: number;
};

interface ICost {
	id?: number;
	orderId?: number;
	fuelCost?: number;
	fuelVolume?: number;
	mileage?: number;
	docsUrl?: string[];
	additionalCostLogs?: AdditionalCostLog[];
}


interface IReport {
	id?: number,
	description: string,
	photoUrl: string[]
}

interface IReview {
	id?: number,
	orderId: number,
	rating: number,
	createdAt: string,
	userName: string,
	photoUrl: string[],
	description: string,
	vehicleType: Array<IDefault>
}


type ICity = {
	id?: number,
	name: string,
	coordinates?: {
		id?: number,
		latitude?: number
		longitude?: number
	}
}

interface ICompany {
	id?: number,
	title?: string,
	owner?: IUser,
	employees?: IUser[]
}

interface CompanyUsersType {
	id: number,
	name?: string,
	ids: number[]
	names?: string[]
}