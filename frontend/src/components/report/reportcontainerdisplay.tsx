import Logged from "../logged/logged"
import Task from "../tasks/task"
import Booked from "./booked"
import React from "react";
import Plot from 'react-plotly.js'

type Props = {
	logged: Logged[]
	tasks: Task[],
	booked: Booked[]
}
function ReportContainerDisplay({ logged, tasks, booked }: Props) {
	const totalLogged = logged.reduce((total, currentValue) => total = total + currentValue.logged_time_seconds, 0);
	const openTasks = tasks.filter(task => !task.is_finished)
	const numOnTimeTasks = tasks.filter(
		task=>
		(!task.is_finished && new Date(task.deadline)>=new Date()) ||
		(task.is_finished && new Date(task.deadline) >= new Date(task.updated_at))
		).length
	
	return (
		<div className="container">
			<div>
				<h1>Reports</h1>
				<div>
				</div>
				<div>
					<Plot 
					data={[
						{
							domain: { x: [0, 1], y: [0, 1] },
							value: openTasks.length ,
							title: { text: "Open Tasks" },
							type: "indicator",
							mode: "number"
						}
					]} 
					layout={
						{
							}
						} />

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
							}
						} />
				</div>
			</div>
		</div>
	)
}

export default ReportContainerDisplay