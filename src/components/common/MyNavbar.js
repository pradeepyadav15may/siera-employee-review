import React from 'react';
// import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import './MyNavbar.css';

export class MyNavbar extends React.Component {
	render() {
		return (
			<Navbar bg="light" expand="lg">
				<Navbar.Brand href="/">Dashboard</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
			</Navbar>
		);
	}
}

export default MyNavbar;
