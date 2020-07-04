const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// employee
const employeeSchema = new Schema({
	empName: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
	},
	empId: {
		type: String,
		required: true,
		unique: true,
	},
	empType: {
		type: String,
		required: true
	},
	empPerformance: String,
	assignedEmp: { type : Array , "default" : [] }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
