const router = require('express').Router();
let Employee = require('../models/employee.model');

router.route('/').get((req, res) => {
	Employee.find()
	.then(employees => res.json(employees))
	.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
	const {
		empId,
		empName,
		empType,
		empPerformance,
		assignedEmp
	} = req.body;

	const newEmployee = new Employee({
		empId,
		empName,
		empType,
		empPerformance,
		assignedEmp,
	});

	newEmployee.save()
	.then(() => res.json('Employee Added Successfully !!!!'))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	Employee.findById(req.params.id)
		.then((employee) => res.json(employee))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').get((req, res) => {
	Employee.findByIdAndRemove(req.params.id)
		.then(() => res.json('Employee Deleted Successfully !!!!'))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		const empFromDB = Employee.findById(req.params.id);

	empFromDB.then((employee) => {
			employee.empId = req.body.empId;
			employee.empName = req.body.empName;
			employee.empType = req.body.empType;
			employee.empPerformance = req.body.empPerformance;
			employee.assignedEmp = req.body.assignedEmp;

			employee.save()
				.then(() => res.json('Employee Updated Successfully !!!!'))
				.catch(err => res.status(400).json('Error: ' + err));
		}).catch(err => res.status(400).json('Error: ' + err));
	} else {
		res.status(400).json('Employee ID is not valid !!');
	}
});


module.exports = router;
