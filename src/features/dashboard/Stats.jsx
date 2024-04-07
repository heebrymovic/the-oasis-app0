import Stat from "./Stat";
import {
	HiOutlineBriefcase,
	HiOutlineBanknotes,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, cabinsCount, numOfDays }) => {
	const numOfBookings = bookings.length;

	const sales = bookings.reduce(
		(acc, booking) => acc + booking.totalPrice,
		0,
	);

	const currentStays = confirmedStays.length;

	const numOfNights = confirmedStays.reduce(
		(acc, booking) => acc + booking.numNights,
		0,
	);

	const occupancy = numOfNights / (numOfDays * cabinsCount);

	return (
		<>
			<Stat
				title="Bookings"
				color="blue"
				icon={<HiOutlineBriefcase />}
				value={numOfBookings}
			/>

			<Stat
				title="Sales"
				color="green"
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>

			<Stat
				title="Check Ins"
				color="indigo"
				icon={<HiOutlineCalendarDays />}
				value={currentStays}
			/>

			<Stat
				title="Occupancy Rate"
				color="yellow"
				icon={<HiOutlineChartBar />}
				value={`${Math.round(occupancy * 100)}%`}
			/>
		</>
	);
};

export default Stats;
