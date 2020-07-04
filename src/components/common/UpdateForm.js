import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Field, useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

export function UpdateForm({ location, employeesList }) {
	let history = useHistory();
	const [employee, setEmployee] = useState({
		empName: '',
		empId: '',
		empType: '',
		empPerformance: '',
		assignedEmp: []
	});
	const employeeId = location.param1;

	useEffect(() => {
		async function fetchEmployee() {
			await axios.get(`http://localhost:5000/employees/${employeeId}`, null)
			.then(res => setEmployee(res.data))
		};

		fetchEmployee();
	}, [employeeId]);

	const formik = useFormik({
		initialValues: employee,
		onSubmit: values => {
			axios.post(`http://localhost:5000/employees/update/${employeeId}`, values)
				.then(() => history.push('/'))
		},
	});

	return (
		<React.Fragment>
		<form onSubmit={formik.handleSubmit}>
			<div className="form-field">
				<label htmlFor="empId">Employee ID</label>
				<input
					id="empId"
					name="empId"
					type="text"
					onChange={formik.handleChange}
					placeholder="Enter Unique ID"
					value={formik.values.empId}
				/>
			</div>

			<div className="form-field">
				<label htmlFor="empName">Employee Name</label>
				<input
					id="empName"
					name="empName"
					type="text"
					onChange={formik.handleChange}
					value={formik.values.empName}
				/>
			</div>

			<div className="form-field">
				<label htmlFor="empPerformance">Employee Performance</label>
				<textarea
					id="empPerformance"
					name="empPerformance"
					onChange={formik.handleChange}
					value={formik.values.empPerformance}
				/>
			</div>

			<div className="form-field">
				<label htmlFor="empType">Employee Type</label>
				<input
					id="empType"
					name="empType"
					type="option"
					onChange={formik.handleChange}
					value={formik.values.empType}
				/>
			</div>

			<div className="form-field">
				<label htmlFor="assignedEmp">Assign Employees for Review</label>
				<select
					name="assignedEmp"
					value={formik.values.assignedEmp}
					onChange={formik.handleChange}
				>
					{
						employeesList.map((emp, index) => <option key={index} value={emp.empName}>emp.empName</option>)
					}
				</select>
				<Field as="select" name="assignedEmp">
					{
						employeesList.map((emp, index) => <option key={index} value={emp._id}>emp.empName</option>)
					}
				</Field>
			</div>

			<div className="form-field submit">
				<button type="submit" className="btn btn-primary">Submit</button>
			</div>
		</form>
		</React.Fragment>
	);
}

UpdateForm.propTypes = {
	location: PropTypes.object,
	employeesList: PropTypes.array,
};

UpdateForm.defaultProps = {
	location: {},
	employeesList: [],
};

export default UpdateForm;
