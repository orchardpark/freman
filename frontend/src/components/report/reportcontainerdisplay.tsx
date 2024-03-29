import Logged from "../logged/logged"
import Task from "../tasks/task"
import Booked from "./booked"
import Plot from 'react-plotly.js'
import {Col, Container, Row} from 'react-bootstrap'
import {UNPRODUCTIVE} from '../app/constants'
import React from "react";

type Props = {
	logged: Logged[]
	tasks: Task[],
	booked: Booked[]
}

/**
 * Displays the report of the logged hours
 * @param param0 
 * @returns 
 */
function ReportContainerDisplay({ logged, tasks, booked }: Props) {
	const openTasks = tasks.filter(task => !task.is_finished)
	const yesterday = new Date()
	yesterday.setDate(yesterday.getDate() - 1)
	const numOnTimeTasks = tasks.filter(
		task =>
			(!task.is_finished && new Date(task.deadline) >= yesterday) ||
			(task.is_finished && new Date(task.deadline) >= new Date(task.updated_at))
	).length

	/**
	 * 
	 * @param d Date to be converted
	 * @returns String of the date
	 */
	const getDateDayStr = (d: Date) => {
		let monthNames = ["January", "February", "March", "April", "May",
			"June", "July", "August", "September", "October", "November", "December"];
		return monthNames[d.getMonth()] + " " + d.getDay()
	}

	const getDateMonthStr = (d: Date) => {
		//let monthNames = ["January", "February", "March", "April", "May",
		//	"June", "July", "August", "September", "October", "November", "December"];
		return d.getFullYear() + "-" + d.getMonth()
	}

	/**
	 * 
	 * @returns Logged time by date
	 */
	const loggedByDate = () => {
		const startMap: { [dayString: string]: number } = {};
		return logged.reduce((loggedSoFar, {created_at, logged_time_seconds}) => {
			const dayString = getDateDayStr(created_at)
			if (!loggedSoFar[dayString]) loggedSoFar[dayString] = 0;
			loggedSoFar[dayString] += logged_time_seconds / 60
			return loggedSoFar;
		}, startMap)
	}

	/**
	 * 
	 * @returns Total time by application (booked + logged), for the top 7 apps
	 */
	const timeByApplication = () => {
		const startMap: { [application_name: string]: number } = {};
		const timeByApplication = [...logged, ...booked]
			.reduce((timeSoFar, { application_name, logged_time_seconds }) => {
				if (!timeSoFar[application_name]) timeSoFar[application_name] = 0
				timeSoFar[application_name] += logged_time_seconds / 60
				return timeSoFar;
			}, startMap)
		const filterVal = Object.values(timeByApplication).sort((a, b) => b - a).slice(0, 7).at(-1)
		if (filterVal !== undefined) {
			return Object.fromEntries(Object.entries(timeByApplication)
				.filter(([, v]) => v >= filterVal))
		}
		else {
			return timeByApplication
		}
	}

	/**
	 * 
	 * @returns The expected time to complete the tasks ordered by month
	 */
	const expectedTimeByMonth = () => {
		const startMap: { [monthString: string]: number } = {};
		return tasks.reduce((timeSoFar, {deadline, estimated_time_minutes}) => {
			const monthString = getDateMonthStr(new Date(deadline))
			if (!timeSoFar[monthString]) timeSoFar[monthString] = 0
			timeSoFar[monthString] += estimated_time_minutes
			return timeSoFar;
		}, startMap);

	}

	/**
	 * 
	 * @returns The actual time booked ordered by month.
	 */
	const actualTimeByMonth = () => {
		const startMap: { [monthString: string]: number } = {};
		return booked
			.filter(item => item.task_id !== UNPRODUCTIVE)
			.reduce((loggedSoFar, {created_at, logged_time_seconds}) => {
				const monthStr = getDateMonthStr(new Date(created_at))
				if (!loggedSoFar[monthStr]) loggedSoFar[monthStr] = 0
				loggedSoFar[monthStr] += logged_time_seconds / 60
				return loggedSoFar;
			}, startMap)
	}

	/**
	 * Total time logged on tasks
	 */
	const productiveTime = booked
		.filter(item => item.task_id !== UNPRODUCTIVE)
		.reduce((bookedTime, { logged_time_seconds }) => {
			return bookedTime + logged_time_seconds;
		}, 0)

	/**
	 * Total time logged on unproductive
	 */
	const unProductiveTime = booked
		.filter(item => item.task_id === UNPRODUCTIVE)
		.reduce((bookedTime, { logged_time_seconds }) => {
			return bookedTime + logged_time_seconds;
		}, 0)

	return (
		<Container>
			<Row>
				<Col>
					<Plot
						data={[
							{
								domain: { x: [0, 1], y: [0, 1] },
								value: openTasks.length,
								title: { text: "Open Tasks" },
								type: "indicator",
								mode: "number"
							}
						]}
						layout={
							{
								width: 400,
								height: 400
							}
						} />
				</Col>
				<Col>
					<Plot
						data={[
							{
								domain: { x: [0, 1], y: [0, 1] },
								value: numOnTimeTasks * 100.0 / tasks.length,
								title: { text: "Tasks on Time %" },
								type: "indicator",
								mode: "gauge+number",
								gauge: {
									axis: { range: [0, 100] },
									bar: { color: "darkblue" },
								},

							}
						]}
						layout={
							{
								width: 400,
								height: 400
							}
						} />
				</Col>
				<Col>
					<Plot
						data={[
							{
								type: 'bar',
								x: Object.keys(loggedByDate()),
								y: Object.values(loggedByDate()).map((item: number) => Math.round(item)),
							}
						]}
						layout={{
							title: "Unbooked time (minutes) by date",
							width: 400,
							height: 400
						}}
					/>
				</Col>

				<Col>
					<Plot
						data={[
							{
								type: 'pie',
								labels: Object.keys(timeByApplication()),
								values: Object.values(timeByApplication()).map((item: number) => Math.round(item))
							}
						]}
						layout={{
							title: "Time by application",
							width: 400,
							height: 400
						}}
					/>
				</Col>
				<Col>
					<Plot
						data={[
							{
								type: 'bar',
								name: 'expected',
								x: Object.keys(expectedTimeByMonth()),
								y: Object.values(expectedTimeByMonth())

							},
							{
								type: 'bar',
								name: 'actual',
								x: Object.keys(actualTimeByMonth()),
								y: Object.values(actualTimeByMonth()),
							},
						]}
						layout={{
							title: "Expected vs actual",
							width: 400,
							height: 400
						}}
					/>
				</Col>
				<Col>
					<Plot
						data={[
							{
								domain: { x: [0, 1], y: [0, 1] },
								value: productiveTime * 100.0 / (productiveTime + unProductiveTime),
								title: { text: "Productive time %" },
								type: "indicator",
								mode: "gauge+number",
								gauge: {
									axis: { range: [0, 100] },
									bar: { color: "darkblue" },
								},
							}
						]}
						layout={
							{
								width: 400,
								height: 400
							}
						}
					/>
				</Col>
			</Row>
		</Container>
	)
}

export default ReportContainerDisplay