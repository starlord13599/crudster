import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default class TopNavbar extends Component {
	render() {
		return (
			<div>
				<Navbar bg="dark" variant="dark" expand="lg">
					<Container fluid>
						<Navbar.Brand href="/">CRUDster</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="mr-auto">
								<Nav.Link href="/add-hero">Add Hero</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}
