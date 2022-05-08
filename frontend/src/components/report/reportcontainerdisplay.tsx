import Logged from "../logged/logged"
import Task from "../tasks/task"
import Booked from "./booked"
import React from "react";
import Plot from 'react-plotly.js'
import { Container, Row, Col } from 'react-bootstrap'
import "../container.css"


type Props = {
	logged: Logged[]
	tasks: Task[],
	booked: Booked[]
}

function ReportContainerDisplay({ logged, tasks, booked }: Props) {
	const openTasks = tasks.filter(task => !task.is_finished)
	const numOnTimeTasks = tasks.filter(
		task =>
			(!task.is_finished && new Date(task.deadline) >= new Date()) ||
			(task.is_finished && new Date(task.deadline) >= new Date(task.updated_at))
	).length

	const getDateDayStr = (d: Date) => {
		let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return monthNames[d.getMonth() + 1] + " " + d.getDay()
	}

	const loggedByDate = () => {
		var startMap: { [dayString: string]: number } = {}
		const loggedByDateSeconds = logged.reduce((loggedSoFar, { created_at, logged_time_seconds }) => {
			const dayString = getDateDayStr(created_at)
			if (!loggedSoFar[dayString]) loggedSoFar[dayString] = 0;
			loggedSoFar[dayString] += logged_time_seconds / 60;
			return loggedSoFar;
		}, startMap)
		return loggedByDateSeconds
	}

	return (
		<div className="container">
			<div>
				<h1>Reports</h1>
				<div>
					<Container fluid>
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
											y: Object.values(loggedByDate()).map((item: number)=>Math.round(item))
										}
									]}
									layout={{
										title: "Unbooked time (minutes) by date",
										width: 800,
										height: 400
									}}
								/>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		</div>
	)
}

export default ReportContainerDisplay