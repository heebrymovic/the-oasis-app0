import styled from 'styled-components';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

import Heading from '../../ui/Heading';
import { useDarkmode } from '../../context/darkModeContext';

const ChartBox = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	padding: 2.4rem 3.2rem;
	grid-column: 3 / span 2;

	& > *:first-child {
		margin-bottom: 1.6rem;
	}

	& .recharts-pie-label-text {
		font-weight: 600;
	}

	@media (max-width: 478px) {
		grid-column: unset;
	}
`;

const startDataLight = [
	{
		duration: '1 night',
		value: 0,
		color: ['#ef4444', '#b91c1c']
	},
	{
		duration: '2 nights',
		value: 0,
		color: ['#f97316', '#c2410c']
	},
	{
		duration: '3 nights',
		value: 0,
		color: ['#eab308', '#a16207']
	},
	{
		duration: '4-5 nights',
		value: 0,
		color: ['#84cc16', '#4d7c0f']
	},
	{
		duration: '6-7 nights',
		value: 0,
		color: ['#22c55e', '#15803d']
	},
	{
		duration: '8-14 nights',
		value: 0,
		color: ['#14b8a6', '#0f766e']
	},
	{
		duration: '15-21 nights',
		value: 0,
		color: ['#3b82f6', '#1d4ed8']
	},
	{
		duration: '21+ nights',
		value: 0,
		color: ['#a855f7', '#7e22ce']
	}
];

function prepareData(stays) {
	// A bit ugly code, but sometimes this is what it takes when working with real data 😅

	function incArrayValue(arr, field) {
		return arr.map((obj) => (obj.duration === field ? { ...obj, value: obj.value + 1 } : obj));
	}

	const data = stays
		.reduce((arr, cur) => {
			const num = cur.numNights;
			if (num === 1) return incArrayValue(arr, '1 night');
			if (num === 2) return incArrayValue(arr, '2 nights');
			if (num === 3) return incArrayValue(arr, '3 nights');
			if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights');
			if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights');
			if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights');
			if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights');
			if (num >= 21) return incArrayValue(arr, '21+ nights');
			return arr;
		}, startDataLight)
		.filter((obj) => obj.value > 0);

	return data;
}

const DurationChart = ({ confirmedStays }) => {
	const { darkmode } = useDarkmode();

	const data = prepareData(confirmedStays);

	console.log(confirmedStays);

	return (
		<ChartBox>
			<Heading as="h3">Duration Chart</Heading>

			<ResponsiveContainer width="100%" height={240}>
				<PieChart>
					<Pie
						data={data}
						nameKey="duration"
						dataKey="value"
						innerRadius={85}
						cx="40%"
						cy="50%"
						outerRadius={110}
						paddingAngle={4}
					>
						{data.map((data) => (
							<Cell
								fill={darkmode ? data.color.at(-1) : data.color.at(0)}
								stroke={darkmode ? data.color.at(-1) : data.color.at(0)}
								key={data.duration}
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend
						align="right"
						verticalAlign="middle"
						width="30%"
						layout="vertical"
						iconSize={10}
						iconType="circle"
					/>
				</PieChart>
			</ResponsiveContainer>
		</ChartBox>
	);
};

export default DurationChart;
