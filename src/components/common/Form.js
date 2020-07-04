import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Form() {
	let history = useHistory();
	const initialState = {
		empName: '',
		empId: '',
		empType: 'non-admin',
		empPerformance: 'Good',
		assignedEmp: []
	};

	const formik = useFormik({
		initialValues: initialState,
		onSubmit: values => {
			axios.post('http://localhost:5000/employees/add', values)
				.then(res => history.push('/'))
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

			<div className="form-field submit">
				<button type="submit" className="btn btn-primary">Submit</button>
			</div>
		</form>
		</React.Fragment>
	);
}

Form.propTypes = {
	location: PropTypes.object,
};

Form.defaultProps = {
	location: {},
};

export default Form;
