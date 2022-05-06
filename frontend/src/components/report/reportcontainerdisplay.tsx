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
	const data = [
		{
			x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			mode: "lines",
		},
	];
	const layout = { title: "Chart Title" };
	return (
		<div className="container">
			<div>
				<h1>Reports</h1>
				<div>
				</div>
				<div>
					<Plot data={data} layout={layout}/>
				</div>
			</div>
		</div>
	)
}

export default ReportContainerDisplay