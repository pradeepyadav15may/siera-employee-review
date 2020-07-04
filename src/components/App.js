import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Admin } from './admin/Admin';
import { Form } from './common/Form.js';
import { UpdateForm } from './common/UpdateForm.js';
import { MyNavbar } from './common/MyNavbar.js';
import { Employee } from './employee/Employee.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<div className="container">
		<Router>
			<MyNavbar />
			<Route path="/admin" exact component={Admin} />
			<Route path="/create" component={Form} />
			<Route path="/employee" component={Employee} />
			<Route path="/update" component={UpdateForm} />
		</Router>
		</div>
	);
}

export default App;
