import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

export function UpdateForm({ location }) {
	let history = useHistory();
	const [employee, setEmployee] = useState({
		empName: '',
		empId: '',
		empType: '',
		empPerformance: '',
		assignedEmp: []
	});
	const employeeId = location.param1;
	const { employeesList } = location;

	useEffect(() => {
		function fetchEmployee() {
			const emp = employeesList.filter((tmpEmployee) => {
				return tmpEmployee._id === employeeId;
			});
			console.log(emp[0]);
			setEmployee({ ...emp[0] })
		};

		fetchEmployee();
	}, [employeeId]);

	const formik = useFormik({
		initialValues: employee,
		enableReinitialize: true,
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
					value={formik.values.empId}
					disabled={true}
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
					disabled={true}
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
					multiple={true}
				>
					{
						employeesList.filter((emp1) => emp1._id != employeeId).map((emp, index) => <option key={index} value={emp.empName}>{emp.empName}</option>)
					}
				</select>
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
};

UpdateForm.defaultProps = {
	location: {},
};

export default UpdateForm;
