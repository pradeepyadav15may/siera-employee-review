import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Employee.css';
const rootClass = "employee";

// sample employe ids taken to show the data.
const sampleEmployeeIds = [
	"5f00e86f27f4db520a632d50",
	"5f00ea7527f4db520a632d53",
	"5f0101de27f4db520a632d56",
	"5f0101f027f4db520a632d57"
];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export class Employee extends React.PureComponent {
	static initialState = {
		employeesList: [],
		empData: []
	};

	constructor(props) {
		super(props);
		this.state = Employee.initialState;
	}

	componentDidMount() {
		this.loadEmployees();
		this.loadEmployeeData();
	}

	loadEmployees = () => {
		axios.get('http://localhost:5000/employees/', null)
				.then(res => {
					this.setState({
						employeesList: res.data,
					});
				})
	}

	loadEmployeeData = () => {
		const randomIndex = getRandomInt(0, 3);
		const randomEmployeeID = sampleEmployeeIds[randomIndex];

		axios.get(`http://localhost:5000/employees/${randomEmployeeID}`, null)
				.then(res => {
					this.setState({
						empData: res.data,
					});
				});
	}

	renderTable() {
		const { empData, employeesList } = this.state;

		const listNodes = empData.assignedEmp.map((emp, index) => {
			const toUpdateEmployee = {
				pathname: "/update",
				employeesList,
			};
			return (
				<tr key={index}>
					<td>
						<Link to={toUpdateEmployee} className="btn btn-primary">{emp}</Link>
					</td>
				</tr>
			);
		});

		return (
			<table>
				<thead>
					<tr>
						<td><b>Employee Name </b></td>
					</tr>
				</thead>
				<tbody>
					{listNodes}
				</tbody>
			</table>
		);
	}

	render() {
		const { empData } = this.state;
		return (
			<div className={rootClass}>
				<h4>Hi {empData.empName}, You need to give feedback for employees mentioned below.</h4>
				{empData.assignedEmp &&
					this.renderTable()
				}
			</div>
			);
	};
}

export default withRouter(Employee);
