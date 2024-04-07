import styled from 'styled-components';
import Stats from './Stats';
import Spinner from '../../ui/Spinner';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';

import { useRecentBookings, useRecentStays } from './hooks';
import { useCabins } from '../cabins/hooks';

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
	text-wrap: wrap;
	margin-top: 20px;

	@media (max-width: 478px) {
		grid-template-columns: 1fr;
		grid-template-rows: auto;
	}
`;

const DashboardLayout = () => {
	const { recentBookings, loadingRecentBookings } = useRecentBookings();

	const { confirmedStays, loadingRecentStays, days } = useRecentStays();

	const { isLoading, cabins } = useCabins();

	if (loadingRecentBookings || loadingRecentStays || isLoading) return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={recentBookings}
				cabinsCount={cabins.length}
				numOfDays={days}
				confirmedStays={confirmedStays}
			/>

			{/*<div>Today's Activity</div>*/}
			<DurationChart confirmedStays={confirmedStays} />
			<SalesChart bookings={recentBookings} numOfDays={days} />
		</StyledDashboardLayout>
	);
};

export default DashboardLayout;
