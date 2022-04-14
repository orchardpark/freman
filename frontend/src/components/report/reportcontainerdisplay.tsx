import Logged from "../logged/logged"
import Task from "../tasks/task"
import Booked from "./booked"

type Props = {
	logged: Logged[]
	tasks: Task[],
	booked: Booked[]
}
function ReportContainerDisplay({ logged, tasks, booked }: Props) {
	const totalLogged = logged.reduce((total, currentValue)=>total=total+currentValue.logged_time_seconds, 0);
	return (
		<div className="container">
			<div>
				<h1>Reports</h1>
				<div>
					Stats: Total logged time = {totalLogged}
				</div>
			</div>
		</div>
	)
}

export default ReportContainerDisplay