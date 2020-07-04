import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';
const rootClass = "admin";

export class Admin extends React.PureComponent {
	static initialState = {
		employeesList: [],
	};

	constructor(props) {
		super(props);
		this.state = Admin.initialState;
		this.handleRemove = this.handleRemove.bind(this);
	}

	componentDidMount() {
		this.loadEmployees();
	}

	handleRemove(e) {
		const target = e.currentTarget;
		const documentId = target.getAttribute('data-documentid');
		console.log(e);
		axios.get(`http://localhost:5000/employees/delete/${documentId}`, null)
				.then(this.loadEmployees())
	}

	loadEmployees = () => {
		axios.get('http://localhost:5000/employees/', null)
				.then(res => {
					this.setState({
						employeesList: res.data,
					});
					console.log(res.data)
				})
	}

	renderAllEmployees = () => {
		const { employeesList } = this.state;
		const employeeNodes = employeesList.map((emp, index) => {
			const toUpdateEmployee = {
				pathname: "/update",
				param1: emp._id,
				employeesList,
			};

			return (
				<tr key={emp._id}>
					<td><span className="emp-details">{emp.empId}</span></td>
					<td><span className="emp-details">{emp.empName}</span></td>
					<td><span className="emp-details">{emp.empType}</span></td>
					<td><span className="emp-details">{emp.empPerformance}</span></td>
					<td><span className="emp-details">{emp.assignedEmp.join(',')}</span></td>
					<td><Link className="emp-details" to={toUpdateEmployee}>Update</Link></td>
					<td><button className="emp-details" onClick={this.handleRemove} data-documentid={emp._id}>Delete</button></td>
				</tr>
			);
		});

		return (
			<table>
				<thead>
					<tr>
						<th>Employee ID</th>
						<th>Employee Name</th>
						<th>Employee Type</th>
						<th>Employee Performance</th>
						<th>Assigned Employees</th>
						<th>Update Employee</th>
					</tr>
				</thead>
				<tbody>
					{employeeNodes}
				</tbody>
			</table>
		);
	}

	render() {
		return (
			<div className={rootClass}>
				<Link to="/create" className="btn btn-primary">Add New Employee</Link>
				<div className="employees-list">
					{this.renderAllEmployees()}
				</div>
			</div>
		);
	}
}

export default withRouter(Admin);
