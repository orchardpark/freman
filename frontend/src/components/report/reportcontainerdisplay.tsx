import Logged from "../logged/logged"
import Task from "../tasks/task"

type Props = {
	logged: Logged[]
	tasks: Task[]
}
function ReportContainerDisplay({ logged, tasks }: Props) {
	return (
		<div className="container">
			<div>
				<h1>Reports</h1>
			</div>
		</div>
	)
}

export default ReportContainerDisplay